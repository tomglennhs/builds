import { NextApiRequest, NextApiResponse } from 'next'
export default async function dsDl(req: NextApiRequest, res: NextApiResponse) {
    const { sdkVer: string } = req.query
    const repo = process.env.upstreamRepo as string

    const dl = await fetch(
        `https://github.com/${repo}/releases/download/v${sdkVer}/FtcDriverStation-release.apk`
    )
    res.statusCode = 200

    res.end(Buffer.from(await dl.arrayBuffer()))
}
