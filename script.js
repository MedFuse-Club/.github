document.addEventListener('DOMContentLoaded', () => {
    // --- Share Menu Logic ---
    const shareContainer = document.querySelector('.share-container');
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkButton = document.querySelector('.copy-link');

    if (shareContainer && shareButton && shareMenu) {
        // Toggle menu visibility
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });

        // Close menu logic
        function toggleMenu(show) {
            shareButton.setAttribute('aria-expanded', show);
            shareMenu.setAttribute('aria-hidden', !show);
        }

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!shareContainer.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleMenu(false);
                shareButton.focus(); // Return focus to button
            }
        });

        // Dynamic Social Links
        const currentUrl = encodeURIComponent(window.location.href);
        const currentTitle = encodeURIComponent(document.title);

        const twitterLink = document.querySelector('.share-twitter');
        if (twitterLink) {
            twitterLink.href = `https://twitter.com/intent/tweet?text=${currentUrl}`;
        }

        const facebookLink = document.querySelector('.share-facebook');
        if (facebookLink) {
            facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        }

        const linkedinLink = document.querySelector('.share-linkedin');
        if (linkedinLink) {
            linkedinLink.href = `https://www.linkedin.com/shareArticle?url=${currentUrl}&mini=true`;
        }

        const emailLink = document.querySelector('.share-email');
        if (emailLink) {
            emailLink.href = `mailto:?subject=${currentTitle}&body=Check%20out%20${currentUrl}`;
        }

        // Copy Link Functionality
        if (copyLinkButton) {
            copyLinkButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    // Optional: Visual feedback (e.g., change text briefly)
                    const originalText = copyLinkButton.innerText;
                    copyLinkButton.innerText = 'Copied!';
                    setTimeout(() => {
                        copyLinkButton.innerText = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            });
        }
    }
});


// --- Carousel Logic (Global Scope) ---
let slideIndex = 1;
// Initialize slides if they exist (need to wait for DOM or call it inside DOMContentLoaded but plusSlides is global)
// We'll call showSlides initially inside DOMContentLoaded as well to be safe, but also allow global access.

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return; // Guard clause

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" active", "");
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className += " active";
}

// Expose to window for inline onclick handlers (if any remain) or external calls
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
});
