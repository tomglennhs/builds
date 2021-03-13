module.exports = {
	target: "serverless",
	async rewrites() {
		return [
			// TODO: Eventually I'll want to make an API method that use fetch() to get the file and returns it, since the download attribute only lets me specify a custom filename on same origin urls.
			{
				source: '/download/:url*',
				destination: 'https://github.com/:url*',
			},
		]
	},
	env: {
		teamRepo: 'grizzlybots11918/ultimategoal',
		teamDefaultBranch: "master",
		teamBuildWorkflow: '.github/workflows/format.yml',
		upstreamRepo: 'FIRST-Tech-Challenge/FtcRobotController',
		NEXT_PUBLIC_ACCENT: '#ef4b24',
		// color scheme can be any of "orange" | "whiteAlpha" | "blackAlpha" | "gray" | "red" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram"
		NEXT_PUBLIC_COLOR_SCHEME: "orange",

	  },
}
