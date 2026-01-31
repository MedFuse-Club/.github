document.addEventListener('DOMContentLoaded', () => {
    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyButton = document.querySelector('.copy-link-button');
    const shareOptions = document.querySelector('.share-options');

    if (shareButton && shareMenu) {
        // Generate Social Links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const socialLinks = [
            { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${url}` },
            { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
            { name: 'Email', href: `mailto:?subject=${title}&body=${url}` }
        ];

        if (shareOptions) {
            shareOptions.innerHTML = socialLinks.map(link =>
                `<li><a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.name}</a></li>`
            ).join('');
        }

        // Toggle Menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        function openMenu() {
            shareButton.setAttribute('aria-expanded', 'true');
            shareMenu.setAttribute('aria-hidden', 'false');
        }

        function closeMenu() {
            shareButton.setAttribute('aria-expanded', 'false');
            shareMenu.setAttribute('aria-hidden', 'true');
        }

        // Close on Outside Click
        document.addEventListener('click', (e) => {
            if (shareButton.getAttribute('aria-expanded') === 'true' &&
                !shareMenu.contains(e.target) &&
                !shareButton.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && shareButton.getAttribute('aria-expanded') === 'true') {
                closeMenu();
                shareButton.focus();
            }
        });

        // Copy Link
        if (copyButton) {
            copyButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    const originalText = copyButton.innerText;
                    copyButton.innerText = 'Link copied';
                    setTimeout(() => {
                         copyButton.innerText = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            });
        }
    }

    // Initialize Carousel
    showSlides(slideIndex);
});

// Carousel Logic
let slideIndex = 1;

// Expose to global scope for inline onclick handlers
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    // Safety check if slides exist
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
