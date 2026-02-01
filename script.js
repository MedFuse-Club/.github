let slideIndex = 1;
showSlides(slideIndex);

// Expose to global scope for inline onclick handlers
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

/* Share Menu Logic */
document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');

    if (!shareButton || !shareMenu) return;

    // Toggle menu
    shareButton.addEventListener('click', () => {
        const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
        shareButton.setAttribute('aria-expanded', !isExpanded);
        shareMenu.setAttribute('aria-hidden', isExpanded);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!shareContainer.contains(e.target)) {
            closeShareMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeShareMenu();
            shareButton.focus(); // Return focus to button
        }
    });

    function closeShareMenu() {
        shareButton.setAttribute('aria-expanded', 'false');
        shareMenu.setAttribute('aria-hidden', 'true');
    }

    // Dynamic Links
    const currentUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    document.querySelector('.share-link-twitter').href = `https://twitter.com/intent/tweet?text=${currentUrl}`;
    document.querySelector('.share-link-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    document.querySelector('.share-link-linkedin').href = `https://www.linkedin.com/shareArticle?url=${currentUrl}&mini=true`;
    document.querySelector('.share-link-email').href = `mailto:?subject=${pageTitle}&body=${currentUrl}`;

    // Copy Link
    const copyButton = document.querySelector('.copy-link-button');
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                // Optional: Provide visual feedback
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    closeShareMenu();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }
});
