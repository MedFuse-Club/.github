from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(f"file://{os.getcwd()}/index.html")

        # Verify stats video is present
        video = page.locator(".stats video")
        if video.count() > 0:
            print("Success: Stats video found")
        else:
            print("Error: Stats video not found")

        # Verify share button works
        share_btn = page.locator(".share-button")
        share_btn.click()
        share_menu = page.locator("#share-menu")
        if share_menu.is_visible():
            print("Success: Share menu visible after click")
        else:
            print("Error: Share menu NOT visible after click")

        page.screenshot(path="verification/medpalm_share.png")

        # Verify multimodal video
        multi_video = page.locator(".image-content video")
        if multi_video.count() > 0:
            print("Success: Multimodal video found")
        else:
            print("Error: Multimodal video not found")

        browser.close()

if __name__ == "__main__":
    run()
