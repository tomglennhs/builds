import { NextApiRequest, NextApiResponse } from 'next'
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getStdinLine(): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            rl.on('line', (input) => {
                rl.close()
                resolve(input)
            });
        } catch (e) {
            reject(e)
            rl.close()
        }
    })

}

export default async function replDeployRefresh(req: NextApiRequest, res: NextApiResponse) {
     console.log("repl.deploy" + req.body + req.headers.get("Signature"))

    const result: {
        body: string
        status: number
    } = JSON.parse((await getStdinLine())!)

    res.statusCode = result.status
    res.end(result.body)
    console.log("repl.deploy-success")
}