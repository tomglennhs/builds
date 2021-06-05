import Link from 'next/link'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Code,
    Button
} from '@chakra-ui/react'

export function Err(props: { err: string | any; verboseErr?: string | any }) {
    const { err, verboseErr } = props
    return (
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
    )
}
