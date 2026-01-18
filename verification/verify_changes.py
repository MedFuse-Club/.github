
import os
from playwright.sync_api import sync_playwright, expect

def verify_changes(page):
    # Load the local HTML file
    page.goto(f"file://{os.getcwd()}/index.html")

    # 1. Verify Skip Link
    skip_link = page.locator('.skip-link')
    expect(skip_link).to_have_text('Skip to main content')

    # Check if it's hidden initially (by transform)
    # Since we can't easily check CSS transform values directly with expect(), we check if it's visible in the viewport.
    # Actually, transform moves it out of viewport, so it should be "visible" to playwright but not in viewport.
    # However, let's focus on the behavior: when focused, it should be in view.

    # Focus the skip link
    skip_link.focus()

    # Take a screenshot of the header area to verify the skip link is visible
    page.screenshot(path="verification/skip_link_visible.png", clip={"x": 0, "y": 0, "width": 800, "height": 100})

    # 2. Verify Carousel
    # Scroll to carousel
    carousel = page.locator('.carousel-container')
    carousel.scroll_into_view_if_needed()

    # Check initial slide is visible
    slide1 = page.locator('.carousel-slide').nth(0)
    expect(slide1).to_be_visible()

    # Click next button
    next_btn = page.locator('.next')
    next_btn.click()

    # Check second slide is visible
    slide2 = page.locator('.carousel-slide').nth(1)
    # Wait for animation/transition if any, expect handles retries
    expect(slide2).to_be_visible()
    expect(slide1).not_to_be_visible()

    # Take screenshot of carousel
    page.screenshot(path="verification/carousel_slide2.png", clip={"x": 0, "y": 0, "width": 800, "height": 600})

    # 3. Verify Focus State
    # Focus a link
    first_link = page.locator('.hero a').first
    first_link.focus()

    # Take screenshot of focused link
    page.screenshot(path="verification/focus_state.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            verify_changes(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
