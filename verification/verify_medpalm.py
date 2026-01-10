import os
from playwright.sync_api import sync_playwright

def test_medpalm_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Load the local index.html file
        page.goto(f"file://{os.getcwd()}/index.html")

        # Verify Title
        assert page.title() == "Med-PaLM"

        # Verify Skip Link
        skip_link = page.locator('a[href="#main-content"]')
        assert skip_link.count() > 0, "Skip to main content link not found"

        # Verify Main Content ID
        main_content = page.locator('#main-content')
        assert main_content.count() > 0, "Main content ID not found"

        # Verify Carousel
        # Check if carousel exists
        carousel = page.locator('.carousel-container')
        assert carousel.count() > 0

        # Check if active slide exists and is visible
        active_slide = page.locator('.carousel-slide.active')
        assert active_slide.count() == 1, "Should have exactly one active slide"
        assert active_slide.is_visible(), "Active slide should be visible"

        # Verify Video
        video = page.locator('video')
        assert video.count() > 0, "Video tag not found"
        assert video.get_attribute("autoplay") is not None
        assert video.get_attribute("loop") is not None
        assert video.get_attribute("muted") is not None
        assert video.get_attribute("playsinline") is not None

        # Take a screenshot
        page.screenshot(path="verification/verification.png", full_page=True)
        print("Screenshot saved to verification/verification.png")

        browser.close()

if __name__ == "__main__":
    try:
        test_medpalm_page()
        print("Verification passed!")
    except Exception as e:
        print(f"Verification failed: {e}")
        exit(1)
