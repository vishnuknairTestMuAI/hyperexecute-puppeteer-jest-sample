// the tests hit live third-party sites, first loads on a fresh browser can be flaky
jest.retryTimes(2);

describe('Search Duckduckgo', () => {
	beforeEach(async () => {
		// on the Windows VM the tab opens in the background and typed text is dropped
		await page.bringToFront();
		await page.goto('https://www.bing.com');
	});

	it('should be titled "Lambdatest"', async () => {
		let text = 'LambdaTest';
		await page.goto('https://www.duckduckgo.com', { waitUntil: 'networkidle2' });
		var element = await page.$('[name="q"]');
		await element.click();
		await element.type(text);
		await Promise.all([
			page.keyboard.press('Enter'),
			page.waitForNavigation()
		]);
		var title = await page.title();
		try {
			expect(title).toEqual(text + ' at DuckDuckGo', 'Expected page title is incorrect!');
			await page.evaluate(
				(_) => {},
				`lambdatest_action: ${JSON.stringify({
					action    : 'setTestStatus',
					arguments : { status: 'passed', remark: 'assertion passed' }
				})}`
			);
		} catch (e) {
			await page.evaluate(
				(_) => {},
				`lambdatest_action: ${JSON.stringify({
					action    : 'setTestStatus',
					arguments : { status: 'failed', remark: e.name }
				})}`
			);
		}
	});
});