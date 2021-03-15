import { Flex, Badge, Button, Text, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { DownloadIcon } from '@chakra-ui/icons'
import { DiGitCompare, DiCodeBadge } from 'react-icons/di'
import { FullBuildInfo } from './FullBuildInfo'
export function Card(props) {
    const router = useRouter()
    const {
        sdkVer,
        buildDate,
        commitHash,
        commitMsg,
        teamRepo,
        githubUrl,
        branchList,
        colorScheme,
        compareUrl,
        branch,
        dsDl,
        rcDl,
        defaultBranch
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
            <Text color="gray.500" fontWeight="bold" fontSize="2xl">
                LATEST RC BUILD
            </Text>
            <a pb={2} href={`https://github.com/${teamRepo}`}>
                <Badge m={1} colorScheme={colorScheme} variant="solid">
                    {teamRepo}
                </Badge>
                <Badge m={1} variant="outline">
                    {branch}
                </Badge>
            </a>

            <FullBuildInfo {...props} />
            <Flex>
                <a
                    href={rcDl}
                    download={`GBRobotControllerApp_SDK${sdkVer}_${buildDate.replace(
                        /\W+/g,
                        '-'
                    )}_${commitHash}.zip`}>
                    <Button
                        m="1"
                        leftIcon={<DownloadIcon />}
                        colorScheme={colorScheme}
                        variant="solid">
                        Download RC (ZIP)
                    </Button>
                </a>
                <a
                    href={dsDl}
                    download={`GBDriverStationApp_SDK${sdkVer}.apk`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button
                        m="1"
                        leftIcon={<DownloadIcon />}
                        colorScheme={colorScheme}
                        variant="solid">
                        Download DS (APK)
                    </Button>
                </a>
            </Flex>
            <Flex>
                <a href={`${githubUrl}`} rel="noopener noreferrer" target="_blank">
                    <Button
                        m="1"
                        leftIcon={<DiCodeBadge />}
                        colorScheme={colorScheme}
                        variant="outline">
                        View Source
                    </Button>
                </a>
                <a href={`${compareUrl}`} rel="noopener noreferrer" target="_blank">
                    <Button
                        m="1"
                        leftIcon={<DiGitCompare />}
                        colorScheme={colorScheme}
                        variant="outline">
                        Compare Commits
                    </Button>
                </a>
            </Flex>
            <Select
                p={1}
                onChange={(evt) => {
                    const val = evt.target.value
                    if (val && val !== branch) {
                        router.push(val)
                    }
                }}
                placeholder="Select branch...">
                {branchList.map((branch) => (
                    <option key={branch} value={branch}>
                        {branch} {branch === defaultBranch ? '(default)' : ''}
                    </option>
                ))}
            </Select>
            <Text pt={2} color="gray.500" fontSize="xs">
                Currently WIP but mostly functional.
            </Text>
        </Flex>
    )
}
