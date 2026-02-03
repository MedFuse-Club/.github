let slideIndex = 1;
// Ensure we don't run this if elements don't exist, though for this site they do.
// Wrapping in DOMContentLoaded is safer for the carousel too if it wasn't inline.
document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    // Check if carousel exists
    if (document.querySelector('.carousel-slide')) {
        showSlides(slideIndex);

        // Expose plusSlides to global scope because onclick attributes need it
        window.plusSlides = function(n) {
            showSlides(slideIndex += n);
        }
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        if (slides.length === 0) return;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].className = slides[i].className.replace(" active", "");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].className += " active";
    }

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkBtn = document.querySelector('.copy-link');
    const shareContainer = document.querySelector('.share-container');

    if (shareButton && shareMenu && shareContainer) {
        // Generate Share URLs
        const currentUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        const twitterLink = document.querySelector('.share-twitter');
        if (twitterLink) twitterLink.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${pageTitle}`;

        const facebookLink = document.querySelector('.share-facebook');
        if (facebookLink) facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

        const linkedinLink = document.querySelector('.share-linkedin');
        if (linkedinLink) linkedinLink.href = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${pageTitle}`;

        const emailLink = document.querySelector('.share-email');
        if (emailLink) emailLink.href = `mailto:?subject=${pageTitle}&body=${currentUrl}`;

        // Toggle Menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !expanded);
            shareMenu.setAttribute('aria-hidden', expanded); // If expanded was true, hidden becomes true (hidden)
        });

        // Close on Click Outside
        document.addEventListener('click', (e) => {
            if (!shareContainer.contains(e.target)) {
                closeShareMenu();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeShareMenu();
                shareButton.focus();
            }
        });

        function closeShareMenu() {
            shareButton.setAttribute('aria-expanded', 'false');
            shareMenu.setAttribute('aria-hidden', 'true');
        }

        // Copy Link
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    const originalText = copyLinkBtn.textContent;
                    copyLinkBtn.textContent = 'Link copied!';
                    setTimeout(() => {
                        copyLinkBtn.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            });
        }
    }
});
