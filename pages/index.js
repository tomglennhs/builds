import Head from 'next/head'
import { Octokit } from '@octokit/rest'
import { IconButton, Flex } from '@chakra-ui/react'
import { GoMarkGithub } from 'react-icons/go'
import { Card } from '../components/Card'

const accent = process.env.NEXT_PUBLIC_ACCENT
const colorScheme = process.env.NEXT_PUBLIC_COLOR_SCHEME

export async function getServerSideProps() {
	// TODO: Clean this function up in general and abstract stuff out where possible
	const tr = process.env.teamRepo
	const octokit = new Octokit({ auth: process.env.GITHUB_PAT })
	const teamRepo = tr.split('/')
	if (teamRepo.length != 2) {
		return {
			isFound: false,
		}
	}
	const owner = teamRepo[0]
	const repo = teamRepo[1]
	const buildWorkflow = process.env.teamBuildWorkflow
	const branch = process.env.teamDefaultBranch
	const res = await octokit.actions.listWorkflowRunsForRepo({
		owner,
		repo,
		branch,
		status: 'success',
	})
	const runs = res.data.workflow_runs.filter((run) => {
		return run.name == buildWorkflow
	})

	// TODO: definitely sort the array after filtering
	const latestRun = runs[0]
	const previousRun = runs[1]
	const hash = latestRun.head_sha
	const oldHash = previousRun.head_sha

	console.log(latestRun)
	const sdkVer = '6.2'
	// TODO: make this not so hacky
	const compareUrl = latestRun.head_repository.compare_url
		.replace('{base}', oldHash)
		.replace('{head}', hash)
		.replace('api.', '')
		.replace('/repos', '')

	const dsDl = `/download/${process.env.upstreamRepo}/releases/download/v${sdkVer}/FtcDriverStation-release.apk`

	return {
		props: {
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
			colorScheme,
			branch,
		},
	}
}

export default function Home(props) {
	const {
		sdkVer,
		githubUrl,
		commitMsg,
		commitHash,
		buildDate,
		author,
		compareUrl,
		teamRepo,
		branch,
	} = props
	console.log(props)
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
				<Card colorScheme={colorScheme} {...props} />

				<a href="https://github.com/grizzlybots11918/builds" target="_blank">
					<IconButton
						aria-label="View source on GitHub"
						icon={<GoMarkGithub />}
					/>
				</a>
			</Flex>
		</div>
	)
}
