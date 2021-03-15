export default async function dsDl(req, res) {
    const { sdkVer } = req.query
    const repo = process.env.upstreamRepo

    const dl = await fetch(
        `https://github.com/${repo}/releases/download/v${sdkVer}/FtcDriverStation-release.apk`
    )
    res.statusCode = 200

    res.end(Buffer.from(await dl.arrayBuffer()))
}
