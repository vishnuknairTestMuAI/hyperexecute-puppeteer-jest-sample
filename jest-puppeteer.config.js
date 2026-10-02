const caps = {
	browserName    : 'Chrome',
	// Chrome 136+ ignores --remote-debugging-port on the default profile, which the
	// HyperExecute VM relies on, so the CDP connection never opens with 'latest'
	browserVersion : '135',
	'LT:Options'   : {
		platform   : process.env.HYPEREXECUTE_PLATFORM,
		build      : 'Sample Puppeteer-Jest',
		name       : 'Puppeteer-jest test on Chrome',
		user       : process.env.LT_USERNAME,
		accessKey  : process.env.LT_ACCESS_KEY,
		network    : true,
		visual	   : true,
		console    : true
	}
};

module.exports = {
	exitOnPageError : false,
	connect : {
		browserWSEndpoint : `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(
			JSON.stringify(caps)
		)}`,
		ignoreHTTPSErrors: true,
		// Chrome's privacy sandbox dialog shows up as a page that never attaches
		targetFilter: (target) => !String(typeof target.url === 'function' ? target.url() : target.url).startsWith('chrome://privacy-sandbox-dialog')
	}
};