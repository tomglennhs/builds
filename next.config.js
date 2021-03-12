module.exports = {
	async rewrites() {
		return [
			// TODO: Eventually I'll want to make an API method that use fetch() to get the file and returns it, since the download attribute only lets me specify a custom filename on same origin urls.
			{
				source: '/download/:url*',
				destination: 'https://github.com/:url*',
			},
		]
	},
}
