// Carousel Logic
let slideIndex = 1;

// Run initially to show the first slide
showSlides(slideIndex);

// Expose function to global scope for HTML onclick handlers
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
        slides[i].style.display = "none";
        slides[i].className = slides[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className += " active";
}

// Share Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');
    const copyLinkBtn = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        // Toggle menu on button click
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });

        // Close when clicking outside
        document.addEventListener('click', (event) => {
            if (shareContainer && !shareContainer.contains(event.target)) {
                toggleMenu(false);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                toggleMenu(false);
                shareButton.focus();
            }
        });

        function toggleMenu(show) {
            shareButton.setAttribute('aria-expanded', show);
            shareMenu.setAttribute('aria-hidden', !show);
        }

        // Generate social links based on current URL
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const twitterLink = document.querySelector('.share-item.twitter');
        if (twitterLink) twitterLink.href = `https://twitter.com/intent/tweet?text=${url}`;

        const facebookLink = document.querySelector('.share-item.facebook');
        if (facebookLink) facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

        const linkedinLink = document.querySelector('.share-item.linkedin');
        if (linkedinLink) linkedinLink.href = `https://www.linkedin.com/shareArticle?url=${url}&mini=true`;

        const emailLink = document.querySelector('.share-item.email');
        if (emailLink) emailLink.href = `mailto:?subject=${title}&body=Check out ${url}`;

        // Copy Link functionality
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalText = copyLinkBtn.innerText;
                    copyLinkBtn.innerText = 'Copied!';
                    setTimeout(() => {
                        copyLinkBtn.innerText = originalText;
                        toggleMenu(false);
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }
});
