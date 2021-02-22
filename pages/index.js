import Head from 'next/head'
import { IconButton, Flex, Text, Button, Icon, Box } from '@chakra-ui/react'
import { DownloadIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { GoMarkGithub } from 'react-icons/go'
import {
	AiOutlineMessage,
	AiOutlineFieldTime,
	AiOutlineGithub,
} from 'react-icons/ai'

const accent = '#ef4b24'
const colorScheme = 'orange'
const githubUrl = 'https://github.com/grizzlybots11918/ultimategoal'
const commitHash = 'ae6d9fa'
const sdkVer = '6.1'
const buildDt = '02/21/2021'
const commitMsg = 'feat(hdrive): commandsssssssss'
const dsDl = `https://github.com/FIRST-Tech-Challenge/FtcRobotController/releases/download/v${sdkVer}/FtcDriverStation-release.apk`

export default function Home() {
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
				<Card
					sdkVer={sdkVer}
					githubUrl={githubUrl}
					commitHash={commitHash}
					buildDate={buildDt}
					commitMsg={commitMsg}
				/>

				<a href="https://github.com/grizzlybots11918/builds">
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
	const { version } = props
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
				<Text fontSize="4xl">v{version}</Text>
			</Flex>
		</Flex>
	)
}

function Card(props) {
	const { sdkVer, buildDate, commitHash, commitMsg } = props
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
			<Text color="gray.500" fontWeight="bold" fontSize="2xl" pb={2}>
				LATEST RC BUILD
			</Text>
			<Text>This is currently WIP and for now this is all dummy data.</Text>
			<FullBuildInfo
				sdkVer={sdkVer}
				buildDate={buildDate}
				commitMsg={commitMsg}
				commitHash={commitHash}
			/>
			<Flex>
				<Button
					m="1"
					leftIcon={<DownloadIcon />}
					colorScheme={colorScheme}
					variant="solid">
					<a href="#">Download RC</a>
				</Button>{' '}
				<a href={dsDl}>
					<Button
						m="1"
						leftIcon={<DownloadIcon />}
						colorScheme={colorScheme}
						variant="solid">
						Download DS
					</Button>
				</a>
			</Flex>
			<a href={`${githubUrl}/tree/${commitHash}`}>
				<Button
					m="1"
					leftIcon={<ArrowRightIcon />}
					colorScheme={colorScheme}
					variant="outline">
					View Source
				</Button>
			</a>
		</Flex>
	)
}

function FullBuildInfo(props) {
	const { buildDate, commitMsg, commitHash, sdkVer } = props
	return (
		<Flex bg="white" borderRadius="2xl" p="3" justify="center" align="center">
			<SDK version={sdkVer} />
			<BuildDetails
				buildDate={buildDate}
				commitMsg={commitMsg}
				commitHash={commitHash}
			/>
		</Flex>
	)
}

function BuildDetails(props) {
	const { commitHash, buildDate, commitMsg } = props
	return (
		<Flex direction="column" p={3}>
			<Flex>
				<Icon m={1} as={AiOutlineGithub} />
				<Text>{commitHash}</Text>
			</Flex>
			<Flex>
				<Icon m={1} as={AiOutlineFieldTime} />
				<Text>{buildDate}</Text>
			</Flex>
			<Flex>
				<Icon m={1} as={AiOutlineMessage} />
				<Text>{commitMsg}</Text>
			</Flex>
		</Flex>
	)
}
