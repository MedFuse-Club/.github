from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Load the index.html directly from the file system
        page.goto(f"file://{os.getcwd()}/index.html")

        # Take a screenshot of the top of the page
        page.screenshot(path="verification/medpalm_home.png")

        # Scroll to carousel and take screenshot
        carousel = page.locator(".carousel-container")
        carousel.scroll_into_view_if_needed()
        page.screenshot(path="verification/medpalm_carousel.png")

        # Test carousel interaction
        # Initial slide should be visible
        first_slide = page.locator(".carousel-slide").first
        if not first_slide.is_visible():
            print("Error: First slide is not visible")

        # Click next button
        page.click(".next")
        page.wait_for_timeout(500) # Wait for fade animation

        # Second slide should be visible now
        second_slide = page.locator(".carousel-slide").nth(1)
        if second_slide.is_visible():
            print("Success: Second slide is visible after clicking next")
        else:
            print("Error: Second slide is NOT visible after clicking next")

        page.screenshot(path="verification/medpalm_carousel_next.png")

        browser.close()

if __name__ == "__main__":
    run()
