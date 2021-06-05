import { NextApiRequest, NextApiResponse } from 'next'
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function getStdinLine(): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            rl.on('line', (input) => {
                rl.close()
                resolve(input)
            })
        } catch (e) {
            reject(e)
            rl.close()
        }
    })
}

async function timeout(ms: number | string) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                reject()
            }, ms)
        } catch (e) {
            reject(e)
        }
    })
}

export default async function replDeployRefresh(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== 'POST') {
            res.statusCode = 400
            return res.send(
                'Only POST requests from repl.deploy are allowed to this endpoint. See https://github.com/KhushrajRathod/repl.deploy for more info'
            )
        }
        console.log(`repl.deploy${req.body}${req.headers.Signature}`)
        const line: any = await Promise.race([getStdinLine, timeout(10000)])
        const result: {
            body: string
            status: number
        } = JSON.parse(line)

        res.statusCode = result.status
        res.end(result.body)
        console.log('repl.deploy-success')
    } catch (e) {
        res.statusCode = 500
        res.send(`Server Error: ${e}`)
        
    }
}
