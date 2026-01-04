
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the local index.html file
        # ensure absolute path is used
        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}")

        # Wait for network idle to ensure images load
        page.wait_for_load_state("networkidle")

        # Take a full page screenshot
        screenshot_path = os.path.abspath("verification/current_state.png")
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
