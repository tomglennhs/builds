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
				<Card />

				<a href="https://github.com/grizzlybots11918/builds">
					<IconButton aria-label="View site source" icon={<GoMarkGithub />} />
				</a>
			</Flex>
		</div>
	)
}

function SDK(props) {
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
				<Text fontSize="4xl">v{props.version}</Text>
			</Flex>
		</Flex>
	)
}

function Card() {
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
			<FullBuildInfo />
			<Flex>
				<Button
					m="1"
					leftIcon={<DownloadIcon />}
					colorScheme="orange"
					variant="solid">
					<a href="#">Download RC</a>
				</Button>{' '}
				<Button
					m="1"
					leftIcon={<DownloadIcon />}
					colorScheme="orange"
					variant="solid">
					<a href="#">Download DS</a>
				</Button>
			</Flex>
			<Button
				m="1"
				leftIcon={<ArrowRightIcon />}
				colorScheme="orange"
				variant="outline">
				<a href="#">View Source</a>
			</Button>
			{/* at the bottom include 2 download buttons, one for the robot controller and one for the driver station, and add a third button underneath for viewing source code of that commit  */}
		</Flex>
	)
}

function FullBuildInfo() {
	return (
		<Flex bg="white" borderRadius="2xl" p="3" justify="center" align="center">
			<SDK version="6.1" />
			<BuildDetails />
		</Flex>
	)
}

function BuildDetails() {
	return (
		<Flex direction="column" p={3}>
			<Flex>
				<Icon m={1} as={AiOutlineGithub} />
				<Text>ae6dfa</Text>
			</Flex>
			<Flex>
				<Icon m={1} as={AiOutlineFieldTime} />
				<Text>03/02/2021</Text>
			</Flex>
			<Flex>
				<Icon m={1} as={AiOutlineMessage} />
				<Text>feat(shooter): make it work</Text>
			</Flex>
		</Flex>
	)
}
