let slideIndex = 1;

// Global function to match current expectation if any, but we are moving to event listeners.
// However, since we removed onclick from HTML, we don't strictly need this global,
// but it's good practice to encapsulate it or keep it if other things rely on it.
// We will keep the functions but call them from event listeners.

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (!slides.length) return; // Guard against missing slides
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].classList.add("active");
}

document.addEventListener('DOMContentLoaded', () => {
    // Carousel Init
    showSlides(slideIndex);

    // Carousel Buttons
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = shareMenu.hasAttribute('hidden');
            if (isHidden) {
                shareMenu.removeAttribute('hidden');
                shareButton.setAttribute('aria-expanded', 'true');
            } else {
                shareMenu.setAttribute('hidden', '');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (shareContainer && !shareContainer.contains(e.target)) {
                shareMenu.setAttribute('hidden', '');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                shareMenu.setAttribute('hidden', '');
                shareButton.setAttribute('aria-expanded', 'false');
                shareButton.focus();
            }
        });
    }

    // Social Links
    const currentUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    const links = {
        twitter: `https://twitter.com/intent/tweet?text=${currentUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}&mini=true`,
        email: `mailto:?subject=${pageTitle}&body=${currentUrl}`
    };

    document.querySelectorAll('.share-link').forEach(link => {
        const platform = link.getAttribute('data-platform');
        if (links[platform]) {
            link.href = links[platform];
            // Open in new tab/window for social links (except email)
            if (platform !== 'email') {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        }
    });

    // Copy Link
    const copyBtn = document.querySelector('.copy-link-button');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Link copied!';
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }
});
