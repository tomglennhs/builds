module.exports = {
    target: 'serverless',
    env: {
        teamRepo: 'grizzlybots11918/ultimategoal',
        teamDefaultBranch: 'master',
        teamBuildWorkflow: '.github/workflows/build.yml',
        upstreamRepo: 'FIRST-Tech-Challenge/FtcRobotController',
        NEXT_PUBLIC_ACCENT: '#ef4b24',
        // color scheme must be one of "orange" | "whiteAlpha" | "blackAlpha" | "gray" | "red" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram"
        NEXT_PUBLIC_COLOR_SCHEME: 'orange',
        REVAL_SECS: 10,
        REPL_DEPLOY_TIMEOUT: 15000
    },
    async headers() {
        return [
            {
                source: '/api/downloadDs',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/vnd.android.package-archive'
                    }
                ]
            }
        ]
    }
}
