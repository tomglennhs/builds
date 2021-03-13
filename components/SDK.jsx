import { Flex, Text } from '@chakra-ui/react'

export function SDK(props) {
    const { sdkVer, accent } = props
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
