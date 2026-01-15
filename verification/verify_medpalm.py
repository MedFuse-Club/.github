import os
import sys
from playwright.sync_api import sync_playwright

def run():
    print("Starting verification...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load local index.html
        file_path = os.path.abspath("index.html")
        if not os.path.exists(file_path):
            print(f"❌ File not found: {file_path}")
            sys.exit(1)

        page.goto(f"file://{file_path}")

        failures = []

        # 1. Semantic HTML Check
        for tag in ["header", "main", "footer", "section"]:
            if page.locator(tag).count() == 0:
                failures.append(f"❌ Semantic tag <{tag}> not found")
            else:
                print(f"✅ Semantic tag <{tag}> found")

        # 2. Skip to main content link
        skip_link = page.locator("a.skip-link")
        if skip_link.count() == 0:
            failures.append("❌ Skip link (.skip-link) not found")
        else:
            print("✅ Skip link found")

            # Check href
            href = skip_link.get_attribute("href")
            if href == "#main-content":
                print("✅ Skip link points to #main-content")
            else:
                failures.append(f"❌ Skip link points to '{href}', expected '#main-content'")

            # Check initial visual state (visually hidden)
            # We assume it uses the .visually-hidden class or equivalent styles
            clip = skip_link.evaluate("el => getComputedStyle(el).clip")
            # clip can be 'rect(0px, 0px, 0px, 0px)' or 'rect(0px 0px 0px 0px)' or similar
            if "rect(0" in clip:
                 print(f"✅ Skip link is visually hidden initially (clip: {clip})")
            else:
                 failures.append(f"❌ Skip link is not visually hidden initially. clip: {clip}")

            # Check focus state
            skip_link.focus()
            clip_focused = skip_link.evaluate("el => getComputedStyle(el).clip")
            if clip_focused == "auto":
                 print("✅ Skip link is visible on focus (clip: auto)")
                 page.screenshot(path="verification/focus_state.png")
                 print("📸 Screenshot saved to verification/focus_state.png")
            else:
                 failures.append(f"❌ Skip link is not visible on focus. clip: {clip_focused}")

        # 3. Main content ID
        main_content = page.locator("#main-content")
        if main_content.count() == 0:
            failures.append("❌ Element with id='main-content' not found (required for skip link)")
        else:
            if main_content.evaluate("el => el.tagName.toLowerCase()") == "main":
                 print("✅ id='main-content' is on <main> tag")
            else:
                 failures.append("❌ id='main-content' is not on <main> tag")

        # 4. Carousel Functionality & Event Listeners
        prev_btn = page.locator(".prev")
        next_btn = page.locator(".next")

        if prev_btn.count() > 0 and next_btn.count() > 0:
            print("✅ Carousel buttons found")

            # Check for inline onclick handlers (should NOT be there)
            prev_onclick = prev_btn.get_attribute("onclick")
            next_onclick = next_btn.get_attribute("onclick")

            if prev_onclick or next_onclick:
                failures.append(f"❌ Inline onclick handlers found on carousel buttons (prev: {prev_onclick}, next: {next_onclick}). Should use addEventListener.")
            else:
                print("✅ No inline onclick handlers on carousel buttons")

            # Functional test
            slides = page.locator(".carousel-slide")
            # Check initial state (assuming slideIndex 1 => index 0 is active)
            # Wait a moment for JS to run if needed
            page.wait_for_timeout(100)

            # Since script is deferred/async, we might need to wait for it to initialize
            # But here we are just checking if the class has 'active'.
            # If the script hasn't run, it might still display block via CSS if hardcoded, but 'active' class is added by JS in current implementation?
            # Actually current JS implementation adds 'active' class.

            # Let's see if we can wait for the active class on the first slide
            try:
                slides.nth(0).wait_for(state="visible", timeout=2000)
                if "active" in slides.nth(0).get_attribute("class"):
                    print("✅ First slide is initially active")
                else:
                    failures.append("❌ First slide is not initially active")
            except:
                 failures.append("❌ First slide did not become visible/active")

            # Click next
            next_btn.click()
            page.wait_for_timeout(500) # Wait for potential transition

            if "active" in slides.nth(1).get_attribute("class"):
                print("✅ Next button works (slide 2 active)")
            else:
                failures.append("❌ Next button did not switch to slide 2")

            # Click prev
            prev_btn.click()
            page.wait_for_timeout(500)

            if "active" in slides.nth(0).get_attribute("class"):
                 print("✅ Prev button works (back to slide 1)")
            else:
                 failures.append("❌ Prev button did not switch back to slide 1")

        else:
            failures.append("❌ Carousel buttons not found")

        browser.close()

        if failures:
            print("\nVerification Failed with the following errors:")
            for f in failures:
                print(f)
            sys.exit(1)
        else:
            print("\nVerification Passed!")

if __name__ == "__main__":
    run()
