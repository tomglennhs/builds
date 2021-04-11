import { Octokit } from '@octokit/rest'
const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

export default async function rcDl(req, res) {
    const { artifactId } = req.query
    const artifact_id = parseInt(artifactId)
    const tr = process.env.teamRepo.split('/')
    const dl = await octokit.actions.downloadArtifact({
        owner: tr[0],
        repo: tr[1],
        artifact_id,
        archive_format: 'zip'
    })

    res.statusCode = 200

    res.end(Buffer.from(dl.data as any))
}
