import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Validate mobile responsiveness fixes and navigation improvements visually and functionally
        await page.mouse.wheel(0, window.innerHeight)
        

        # Assertions for metric cards based on mocked data
        total_revenue_text = await page.locator('data-test-id=metric-total_revenue').inner_text()
        assert '$45,670' in total_revenue_text, f"Expected total revenue value '$45,670' in '{total_revenue_text}'"
        assert '+12.5%' in total_revenue_text, f"Expected total revenue percentage change '+12.5%' in '{total_revenue_text}'"
        total_revenue_trend_icon = await page.locator('data-test-id=metric-total_revenue trend-icon').get_attribute('data-trend')
        assert total_revenue_trend_icon == 'positive', f"Expected total revenue trend icon to be 'positive', got '{total_revenue_trend_icon}'"
        active_users_text = await page.locator('data-test-id=metric-active_users').inner_text()
        assert '12.4K' in active_users_text, f"Expected active users value '12.4K' in '{active_users_text}'"
        assert '+2.3%' in active_users_text, f"Expected active users percentage change '+2.3%' in '{active_users_text}'"
        active_users_trend_icon = await page.locator('data-test-id=metric-active_users trend-icon').get_attribute('data-trend')
        assert active_users_trend_icon == 'positive', f"Expected active users trend icon to be 'positive', got '{active_users_trend_icon}'"
        conversions_text = await page.locator('data-test-id=metric-conversions').inner_text()
        assert '1.2K' in conversions_text, f"Expected conversions value '1.2K' in '{conversions_text}'"
        assert '+8.7%' in conversions_text, f"Expected conversions percentage change '+8.7%' in '{conversions_text}'"
        conversions_trend_icon = await page.locator('data-test-id=metric-conversions trend-icon').get_attribute('data-trend')
        assert conversions_trend_icon == 'positive', f"Expected conversions trend icon to be 'positive', got '{conversions_trend_icon}'"
        growth_rate_text = await page.locator('data-test-id=metric-growth_rate').inner_text()
        assert '15.8%' in growth_rate_text, f"Expected growth rate value '15.8%' in '{growth_rate_text}'"
        assert '+3.2%' in growth_rate_text, f"Expected growth rate percentage change '+3.2%' in '{growth_rate_text}'"
        growth_rate_trend_icon = await page.locator('data-test-id=metric-growth_rate trend-icon').get_attribute('data-trend')
        assert growth_rate_trend_icon == 'positive', f"Expected growth rate trend icon to be 'positive', got '{growth_rate_trend_icon}'"
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    