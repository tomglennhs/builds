import { Flex } from '@chakra-ui/react'
import { SDK } from './SDK'
import { BuildDetails } from './BuildDetails'

export function FullBuildInfo(props) {
	const { buildDate, commitMsg, commitHash, sdkVer } = props
	return (
		<Flex bg="white" borderRadius="2xl" p="3" justify="center" align="center">
			<SDK {...props} />
			<BuildDetails {...props} />
		</Flex>
	)
}
