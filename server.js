// doing this because next.js doesn't run on $PORT like most frameworks :(

const cli = require('next/dist/cli/next-start')
cli.nextStart(['-p', process.env.PORT || 3000])
