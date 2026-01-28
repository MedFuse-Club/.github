// Carousel Logic
let slideIndex = 1;

// Wait for DOM to be ready before running
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Carousel
    if (document.getElementsByClassName("carousel-slide").length > 0) {
        showSlides(slideIndex);
    }

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareLinksContainer = document.querySelector('.share-links');
    const copyLinkButton = document.querySelector('.copy-link-button');

    if (shareButton && shareMenu) {
        // Toggle Menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !expanded);
            shareMenu.setAttribute('aria-hidden', expanded); // If expanded was true, hidden becomes true (hidden)
        });

        // Close on click outside
        document.addEventListener('click', (event) => {
            if (!shareButton.contains(event.target) && !shareMenu.contains(event.target)) {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
                shareButton.focus();
            }
        });

        // Generate Social Links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const socialLinks = [
            { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${title}&url=${url}` },
            { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}` },
            { name: 'Email', url: `mailto:?subject=${title}&body=${url}` }
        ];

        if (shareLinksContainer) {
            shareLinksContainer.innerHTML = socialLinks.map(link =>
                `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="share-item">${link.name}</a></li>`
            ).join('');
        }

        // Copy Link
        if (copyLinkButton) {
            copyLinkButton.addEventListener('click', () => {
                 navigator.clipboard.writeText(window.location.href).then(() => {
                     const originalText = copyLinkButton.textContent;
                     copyLinkButton.textContent = 'Link copied';
                     setTimeout(() => {
                         copyLinkButton.textContent = originalText;
                     }, 2000);
                 }).catch(err => {
                     console.error('Failed to copy: ', err);
                 });
            });
        }
    }
});

// Expose to global scope for HTML onclick
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (!slides.length) return;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" active", "");
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className += " active";
}
