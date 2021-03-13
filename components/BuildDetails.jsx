import { Flex, Text, Icon, Tooltip } from '@chakra-ui/react'

import {
	AiOutlineMessage,
	AiOutlineFieldTime,
	AiOutlineGithub,
	AiFillContacts,
} from 'react-icons/ai'

export function BuildDetails(props) {
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
