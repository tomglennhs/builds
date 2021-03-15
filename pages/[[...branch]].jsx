import Head from 'next/head'
import Link from 'next/link'
import { Octokit } from '@octokit/rest'
import {
    IconButton,
    Flex,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Code,
    Button
} from '@chakra-ui/react'
import { GoMarkGithub } from 'react-icons/go'
import { Card } from '../components/Card'
const parser = require('fast-xml-parser')

const accent = process.env.NEXT_PUBLIC_ACCENT
const colorScheme = process.env.NEXT_PUBLIC_COLOR_SCHEME

export async function getServerSideProps(ctx) {
    try {
        if (!accent) {
            return {
                props: {
                    err:
                        'There is no accent color set. Please check your next.config.js or environment variables to confirm that the `NEXT_PUBLIC_ACCENT` variable is set.'
                }
            }
        }

        if (!colorScheme) {
            return {
                props: {
                    err:
                        'There is no colorScheme set. Please check your next.config.js or environment variables to confirm that the `NEXT_PUBLIC_COLOR_SCHEME` variable is set.'
                }
            }
        }

        const tr = process.env.teamRepo

        if (!tr) {
            return {
                props: {
                    err:
                        'There is no team repository set. Please check your next.config.js or environment variables to confirm that the `teamRepo` variable is set.'
                }
            }
        }

        if (!process.env.GITHUB_PAT) {
            return {
                props: {
                    err:
                        'There is no GitHub access token set. Please check your .env.local or environment variables to confirm that the `GITHUB_PAT` variable is set.'
                }
            }
        }

        const octokit = new Octokit({ auth: process.env.GITHUB_PAT })
        const teamRepo = tr.split('/')
        if (teamRepo.length !== 2) {
            return {
                props: {
                    error:
                        'The repo was specified in an incorrect format. Please check your environment variables or next.config.js env to confirm that the `teamRepo` var is set in the format of `organization/repo`.'
                }
            }
        }

        const owner = teamRepo[0]
        const repo = teamRepo[1]
        const buildWorkflow = process.env.teamBuildWorkflow

        if (!buildWorkflow) {
            return {
                props: {
                    err:
                        'There is no teamBuildWorkflow set. Please check your next.config.js or environment variables to confirm that the `teamBuildWorkflow` variable is set to the path to your build workflow.'
                }
            }
        }
        const branch =
            Array.isArray(ctx.params.branch) && ctx.params.branch.length > 0
                ? ctx.params.branch[0]
                : process.env.teamDefaultBranch

        let res
        try {
            res = await octokit.actions.listWorkflowRunsForRepo({
                owner,
                repo,
                branch,
                status: 'success'
            })
        } catch (err) {
            return {
                props: {
                    err: `There was an error fetching runs of workflow ${buildWorkflow} for repo ${tr}.`,
                    verboseErr: err.toString()
                }
            }
        }

        const manifestUrl = `https://raw.githubusercontent.com/${tr}/${branch}/FtcRobotController/src/main/AndroidManifest.xml`
        let manifest
        try {
            manifest = await (await fetch(manifestUrl)).text()
        } catch (err) {
            return {
                props: {
                    err: `There was an error fetching the SDK version. Please confirm that ${manifestUrl} exists and returns an XML string.`,
                    verboseErr: err.toString()
                }
            }
        }

        let jsonObj
        let sdkVer
        try {
            jsonObj = parser.parse(manifest, {
                parseAttributeValue: true,
                ignoreAttributes: false,
                attrNodeName: 'attr'
            })
            sdkVer = jsonObj.manifest.attr['@_android:versionName'].toString() || '?'
        } catch (err) {
            return {
                props: {
                    err:
                        'There was an error parsing the SDK Version from XML. Please ensure that this repo contains a robot controller project.',
                    verboseErr: err.toString()
                }
            }
        }

        const runs = res.data.workflow_runs.filter((run) => run.name === buildWorkflow)
        if (runs.length <= 0) {
            return {
                props: {
                    err: `There are no workflow runs for branch ${branch} on repo ${tr}.`
                }
            }
        }

        // TODO: definitely sort the array after filtering
        const latestRun = runs[0]
        const previousRun = runs[1]
        const hash = latestRun.head_sha

        let artifacts
        let artifact
        try {
            artifacts = await octokit.actions.listWorkflowRunArtifacts({
                owner,
                repo,
                run_id: latestRun.id
            })
            // eslint-disable-next-line prefer-destructuring
            artifact = artifacts.data.artifacts[0]
        } catch (err) {
            return {
                props: {
                    err: `There was an error retrieving workflow runs for workflow ${buildWorkflow} for repo ${tr}.`,
                    verboseErr: err.toString()
                }
            }
        }

        console.dir(artifacts.data)

        const compareUrl = latestRun.head_repository.compare_url
            .replace('{base}', previousRun.head_sha)
            .replace('{head}', hash)
            .replace('api.', '')
            .replace('/repos', '')

        const dsDl = `/api/downloadDs/${sdkVer}`
        const rcDl = `/api/downloadRc/${artifact.id}`

        let branchList
        try {
            const branches = await octokit.repos.listBranches({
                owner,
                repo
            })

            branchList = branches.data.map((branch) => branch.name)
        } catch (err) {
            return {
                props: {
                    err: `There was an error retrieving branches for repo ${tr}.`,
                    verboseErr: err.toString()
                }
            }
        }

        return {
            props: {
                data: {
                    sdkVer,
                    commitHash: hash.substring(0, 6),
                    githubUrl: `${latestRun.head_repository.html_url}/tree/${hash}`,
                    buildDate: latestRun.created_at,
                    commitMsg: latestRun.head_commit.message,
                    author: latestRun.head_commit.author.name,
                    teamRepo: tr,
                    compareUrl,
                    dsDl,
                    accent,
                    branchList,
                    colorScheme,
                    rcDl,
                    branch,
                    defaultBranch: process.env.teamDefaultBranch
                }
            }
        }
    } catch (err) {
        return {
            props: {
                err: 'There was an unhandled server error.',
                verboseErr: err
            }
        }
    }
}

export default function Home(props) {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.data) {
        const {
            sdkVer,
            githubUrl,
            commitMsg,
            commitHash,
            buildDate,
            author,
            compareUrl,
            teamRepo,
            branch
        } = props.data
        return (
            <div>
                <Head>
                    <title>Builds</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Flex
                    h="100vh"
                    direction="column"
                    justify="center"
                    align="center"
                    bg={accent}>
                    <Card colorScheme={colorScheme} {...props.data} />

                    <a
                        href="https://github.com/grizzlybots11918/builds"
                        rel="noopener noreferrer"
                        target="_blank">
                        <IconButton
                            aria-label="View source on GitHub"
                            icon={<GoMarkGithub />}
                        />
                    </a>
                </Flex>
            </div>
        )
    }
    const { err, verboseErr } = props
    return (
        <>
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>There was an error.</AlertTitle>
                <AlertDescription>
                    {err ? `From the server: ${err}` : ''}
                    {verboseErr ? <Code colorScheme="yellow">{verboseErr}</Code> : ''}
                </AlertDescription>
                <Link href="/">
                    <Button m="1" variant="solid">
                        Go Home
                    </Button>
                </Link>
            </Alert>
        </>
    )
}
