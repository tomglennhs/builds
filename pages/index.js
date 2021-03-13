import Head from 'next/head'
import { Octokit } from '@octokit/rest'
import { IconButton, Flex, Text, Button, Icon, Tooltip, Badge } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { GoMarkGithub } from 'react-icons/go'
import {
	AiOutlineMessage,
	AiOutlineFieldTime,
	AiOutlineGithub,
	AiFillContacts,
} from 'react-icons/ai'

import { DiGitCompare, DiCodeBadge } from 'react-icons/di'

const accent = process.env.NEXT_PUBLIC_ACCENT
const colorScheme = process.env.NEXT_PUBLIC_COLOR_SCHEME

const dsDlOld = `${
	process.env.upstreamRepo
}/releases/download/v${6.1}/FtcDriverStation-release.apk`
// const dsDl = `/download?url=${encodeURIComponent(dsDlOld)}`
const dsDl = `/download/${dsDlOld}`

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

	// TODO: make this not so hacky
	const compareUrl = latestRun.head_repository.compare_url
		.replace('{base}', oldHash)
		.replace('{head}', hash)
		.replace('api.', '')
		.replace('/repos', '')

	return {
		props: {
			sdkVer: '6.2',
			commitHash: hash.substring(0, 6),
			githubUrl: `${latestRun.head_repository.html_url}/tree/${hash}`,
			buildDate: latestRun.created_at,
			commitMsg: latestRun.head_commit.message,
			author: latestRun.head_commit.author.name,
			teamRepo: tr,
			compareUrl,
			branch
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
		teamRepo, branch
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
				<Card {...props} />

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

function SDK(props) {
	const { sdkVer } = props
	return (
		<Flex maxW="min" direction="column" align="center" justify="center">
			<Flex justify="center" borderTopRadius="xl" w="full" bg={accent} m={0}>
				<Text fontSize="xl" fontWeight="bold" color="white">
					SDK
				</Text>
			</Flex>
			<Flex
				justify="center"
				borderTopColor="none"
				border="1px"
				borderTopRadius="none"
				borderBottomRadius="xl"
				borderColor={accent}
				w="full"
				p="3"
				bg="white">
				<Text fontSize="4xl">v{sdkVer}</Text>
			</Flex>
		</Flex>
	)
}

function Card(props) {
	const {
		sdkVer,
		buildDate,
		commitHash,
		commitMsg,
		teamRepo,
		githubUrl,
		compareUrl,
		branch
	} = props
	return (
		<Flex
			maxW="xl"
			minW="xs"
			justify="center"
			align="center"
			boxShadow="2xl"
			p="3"
			bg="white"
			borderRadius="2xl"
			mb="6"
			direction="column">
			<Text color="gray.500" fontWeight="bold" fontSize="2xl" >
				LATEST RC BUILD
			</Text>
			<a pb={2} href={`https://github.com/${teamRepo}`}>
			<Badge m={1} colorScheme={colorScheme} variant="solid">{teamRepo}</Badge>
			<Badge m={1} variant="outline">{branch}</Badge>
			</a>
			
			<FullBuildInfo {...props} />
			<Flex>
				<a
					href="#"
					download={`GBRobotControllerApp_SDK${sdkVer}_${buildDate.replace(
						/\W+/g,
						'-'
					)}_${commitHash}.apk`}>
					<Button
						m="1"
						leftIcon={<DownloadIcon />}
						colorScheme={colorScheme}
						variant="solid">
						Download RC
					</Button>
				</a>
				<a href={dsDl} download={`GBDriverStationApp_SDK${sdkVer}.apk`} target="_blank">
					<Button
						m="1"
						leftIcon={<DownloadIcon />}
						colorScheme={colorScheme}
						variant="solid">
						Download DS
					</Button>
				</a>
			</Flex>
			<Flex>
				<a href={`${githubUrl}`} target="_blank">
					<Button
						m="1"
						leftIcon={<DiCodeBadge />}
						colorScheme={colorScheme}
						variant="outline">
						View Source
					</Button>
				</a>
				<a href={`${compareUrl}`} target="_blank">
					<Button
						m="1"
						leftIcon={<DiGitCompare />}
						colorScheme={colorScheme}
						variant="outline">
						Compare Commits
					</Button>
				</a>
			</Flex>
			<Text pt={2} color="gray.500" fontSize="xs">
				Currently WIP but mostly functional.
			</Text>
		</Flex>
	)
}

function FullBuildInfo(props) {
	const { buildDate, commitMsg, commitHash, sdkVer } = props
	return (
		<Flex bg="white" borderRadius="2xl" p="3" justify="center" align="center">
			<SDK {...props} />
			<BuildDetails {...props} />
		</Flex>
	)
}

function BuildDetails(props) {
	const { commitHash, buildDate, commitMsg, author } = props
	return (
		<Flex direction="column" p={3}>
			<Flex>
				<Icon m={1} as={AiOutlineGithub} />
				<Text>{commitHash}</Text>
			</Flex>
			<Tooltip
				hasArrow
				label={buildDate + ' UTC'}
				aria-label="Commit date in UTC">
				<Flex>
					<Icon m={1} as={AiOutlineFieldTime} />
					<Text>{new Date(buildDate).toString()}</Text>
				</Flex>
			</Tooltip>
			<Flex>
				<Icon m={1} as={AiOutlineMessage} />
				<Text>{commitMsg}</Text>
			</Flex>
			<Flex>
				<Icon m={1} as={AiFillContacts} />
				<Text>{author}</Text>
			</Flex>
		</Flex>
	)
}
