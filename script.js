document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");

    // Only run carousel logic if slides exist
    if (slides.length > 0) {
        showSlides(slideIndex);

        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');

        if (prevButton) prevButton.addEventListener('click', () => plusSlides(-1));
        if (nextButton) nextButton.addEventListener('click', () => plusSlides(1));
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].classList.add("active");
    }

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', () => {
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            toggleShareMenu(!isExpanded);
        });

        document.addEventListener('click', (event) => {
            if (!shareContainer.contains(event.target)) {
                toggleShareMenu(false);
            }
        });

        function toggleShareMenu(show) {
            shareButton.setAttribute('aria-expanded', show);
            shareMenu.setAttribute('aria-hidden', !show);
        }

        // Generate Social Links
        const currentUrl = encodeURIComponent(window.location.href);
        const currentTitle = encodeURIComponent(document.title);

        const twitterLink = document.querySelector('.share-link.twitter');
        if (twitterLink) twitterLink.href = `https://twitter.com/intent/tweet?text=${currentUrl}`;

        const facebookLink = document.querySelector('.share-link.facebook');
        if (facebookLink) facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

        const linkedinLink = document.querySelector('.share-link.linkedin');
        if (linkedinLink) linkedinLink.href = `https://www.linkedin.com/shareArticle?url=${currentUrl}&mini=true`;

        const emailLink = document.querySelector('.share-link.email');
        if (emailLink) emailLink.href = `mailto:?subject=${currentTitle}&body=${currentUrl}`;

        // Copy Link
        const copyButton = document.querySelector('.copy-link');
        if (copyButton) {
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Optional: Show feedback
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }
});
