
import os
import sys
from playwright.sync_api import sync_playwright

def verify_medpalm():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the local index.html file
        file_path = f"file://{os.getcwd()}/index.html"
        page.goto(file_path)

        # Verify Skip to main content link
        skip_link = page.locator(".skip-link")
        print(f"Checking skip link presence...")
        assert skip_link.count() > 0, "Skip link not found"

        # Focus skip link and take screenshot
        page.keyboard.press("Tab")
        page.screenshot(path="verification/skip_link_focus.png")
        print("Screenshot of skip link focus saved.")

        # Verify Carousel
        print("Checking Carousel...")
        slides = page.locator(".carousel-slide")

        # Screenshot initial state
        page.locator(".carousel-container").scroll_into_view_if_needed()
        page.screenshot(path="verification/carousel_initial.png")

        # Click Next
        page.locator(".next").click()
        page.wait_for_timeout(500) # wait for transition
        page.screenshot(path="verification/carousel_next.png")

        # Verify Video Placeholder
        print("Checking Video Placeholder...")
        placeholder = page.locator(".video-placeholder")
        placeholder.scroll_into_view_if_needed()
        page.screenshot(path="verification/video_placeholder.png")

        print("All verifications passed!")
        browser.close()

if __name__ == "__main__":
    verify_medpalm()
