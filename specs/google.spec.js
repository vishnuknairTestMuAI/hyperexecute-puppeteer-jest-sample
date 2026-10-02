// the tests hit live third-party sites, first loads on a fresh browser can be flaky
jest.retryTimes(2);

describe('Search Duckduckgo', () => {
	beforeEach(async () => {
		// on the Windows VM the tab opens in the background and typed text is dropped
		await page.bringToFront();
		await page.goto('https://www.bing.com');
	});

	it('should be titled "Google"', async () => {
		//Google search
		await page.goto('https://www.duckduckgo.com', { waitUntil: 'networkidle2' });
		var element = await page.$('[name="q"]');
		await element.click();
		await element.type('Google');
		await Promise.all([
			page.keyboard.press('Enter'),
			page.waitForNavigation()
		]);
		var title = await page.title();
		expect(title).toEqual('Google at DuckDuckGo', 'Expected page title is incorrect!');
		const firstResult = await page.$('#r1-0 h2')
		await firstResult.click();
		await page.waitForFunction(() => document.title === 'Google');
		var googleTitle = await page.title();
		expect(googleTitle).toEqual('Google', 'Google -Expected page title is incorrect!');
		//TodoMVC sample app test (old sample-todo-app URL is 404)
		await page.goto('https://todomvc.com/examples/react/dist/');
		await page.waitForSelector('.new-todo');
		await page.type('.new-todo', 'Hypertest LambdaTest');
		await page.keyboard.press('Enter');
		await page.waitForSelector('.todo-list li');
		var todoText = await page.$eval('.todo-list li', (el) => el.textContent);
		expect(todoText).toContain('Hypertest LambdaTest');
	});
});
