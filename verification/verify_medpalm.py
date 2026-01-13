
import os
import sys
from playwright.sync_api import sync_playwright

def verify_medpalm():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the local index.html file
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Verify title
        assert page.title() == "Med-PaLM"
        print("Title verified")

        # Verify Skip Link
        skip_link = page.locator("a.skip-link")

        page.keyboard.press("Tab")
        # Check if the skip link is focused using evaluate
        is_focused = page.evaluate("document.activeElement === document.querySelector('a.skip-link')")
        assert is_focused
        print("Skip link focus verified")

        # Verify Carousel
        # Check initial state: slide 1 visible, others hidden
        slides = page.locator(".carousel-slide")
        assert slides.count() == 3

        # Helper to check visibility based on display style or class
        def check_slide_visible(index):
            # We can check the 'active' class
            return "active" in slides.nth(index).get_attribute("class")

        assert check_slide_visible(0)
        assert not check_slide_visible(1)
        assert not check_slide_visible(2)
        print("Initial carousel state verified")

        # Click next
        page.click("button.next")

        # Check state: slide 2 visible
        assert not check_slide_visible(0)
        assert check_slide_visible(1)
        assert not check_slide_visible(2)
        print("Carousel next verified")

        # Take screenshot
        screenshot_path = os.path.join(cwd, "verification/medpalm_verification.png")
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        # Click prev (back to 1)
        page.click("button.prev")
        assert check_slide_visible(0)
        assert not check_slide_visible(1)
        print("Carousel prev verified")

        browser.close()

if __name__ == "__main__":
    verify_medpalm()
