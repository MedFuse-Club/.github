document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    let slideIndex = 1;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (slides.length > 0) {
        showSlides(slideIndex);

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                plusSlides(-1);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                plusSlides(1);
            });
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].classList.add('active');
    }

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');
    const copyLinkButton = document.querySelector('.copy-link');

    if (shareButton && shareMenu && shareContainer) {
        shareButton.addEventListener('click', () => {
            const isHidden = shareMenu.hasAttribute('hidden');
            if (isHidden) {
                shareMenu.removeAttribute('hidden');
                shareButton.setAttribute('aria-expanded', 'true');
            } else {
                shareMenu.setAttribute('hidden', '');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('click', (event) => {
            if (!shareContainer.contains(event.target)) {
                shareMenu.setAttribute('hidden', '');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                shareMenu.setAttribute('hidden', '');
                shareButton.setAttribute('aria-expanded', 'false');
                shareButton.focus(); // Return focus to button
            }
        });

        // Populate Social Links
        const currentUrl = encodeURIComponent(window.location.href);
        const currentTitle = encodeURIComponent(document.title);

        const twitterLink = document.querySelector('.share-twitter');
        if (twitterLink) twitterLink.href = `https://twitter.com/intent/tweet?text=${currentUrl}`;

        const facebookLink = document.querySelector('.share-facebook');
        if (facebookLink) facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

        const linkedinLink = document.querySelector('.share-linkedin');
        if (linkedinLink) linkedinLink.href = `https://www.linkedin.com/shareArticle?url=${currentUrl}&mini=true`;

        const emailLink = document.querySelector('.share-email');
        if (emailLink) emailLink.href = `mailto:?subject=${currentTitle}&body=Check%20out%20${currentUrl}`;

        // Copy Link
        if (copyLinkButton) {
            copyLinkButton.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Optional: Show feedback
                    console.log('Link copied');
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }
});
