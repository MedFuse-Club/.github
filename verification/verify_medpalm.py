from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to index.html
        cwd = os.getcwd()
        file_path = f"file://{cwd}/index.html"

        print(f"Navigating to {file_path}")
        page.goto(file_path)

        # Check title
        print(f"Page title: {page.title()}")

        # Check carousel
        print("Checking carousel...")
        slides = page.locator(".carousel-slide")
        count = slides.count()
        print(f"Found {count} slides.")

        if count == 0:
            print("No slides found!")
            exit(1)

        # Check visibility of first slide
        first_slide = slides.nth(0)
        expect(first_slide).to_be_visible()
        print("First slide is visible.")

        # Check that other slides are HIDDEN
        for i in range(1, count):
            other_slide = slides.nth(i)
            expect(other_slide).not_to_be_visible()
            print(f"Slide {i+1} is hidden.")

        # Take initial screenshot
        page.screenshot(path="verification/current_state.png", full_page=True)
        print("Screenshot saved to verification/current_state.png")

        # Interact with carousel
        next_button = page.locator(".next")
        if next_button.is_visible():
            print("Clicking next button...")
            next_button.click()
            page.wait_for_timeout(1000) # Wait for animation

            # Check if second slide is visible (slideIndex 2)
            second_slide = slides.nth(1)
            expect(second_slide).to_be_visible()
            print("Second slide is visible after click.")

            # Check that first slide is now hidden
            expect(first_slide).not_to_be_visible()
            print("First slide is now hidden.")

            # Check that third slide is hidden
            if count > 2:
                third_slide = slides.nth(2)
                expect(third_slide).not_to_be_visible()
                print("Third slide is hidden.")

            page.screenshot(path="verification/after_click.png")
        else:
            print("Next button not found.")

        browser.close()

if __name__ == "__main__":
    run()
