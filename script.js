document.addEventListener('DOMContentLoaded', () => {
    // Carousel logic
    let slideIndex = 1;
    showSlides(slideIndex);

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => plusSlides(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => plusSlides(1));
    }

    function plusSlides(n) {
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

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');

    if (shareButton && shareMenu && shareContainer) {
        // Toggle menu
        shareButton.addEventListener('click', (e) => {
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !isExpanded);
            shareMenu.classList.toggle('hidden');
            e.stopPropagation();
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareContainer.contains(e.target)) {
                shareMenu.classList.add('hidden');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Populate Social Links
        const currentUrl = encodeURIComponent(window.location.href);
        const currentTitle = encodeURIComponent(document.title);

        const twitterLink = document.querySelector('.share-link.twitter');
        if (twitterLink) {
            twitterLink.href = `https://twitter.com/intent/tweet?text=${currentUrl}`;
        }

        const facebookLink = document.querySelector('.share-link.facebook');
        if (facebookLink) {
            facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        }

        const linkedinLink = document.querySelector('.share-link.linkedin');
        if (linkedinLink) {
            linkedinLink.href = `https://www.linkedin.com/shareArticle?url=${currentUrl}&mini=true`;
        }

        const emailLink = document.querySelector('.share-link.email');
        if (emailLink) {
             emailLink.href = `mailto:?subject=${currentTitle}&body=Check out ${currentUrl}`;
        }

        // Copy Link
        const copyBtn = document.querySelector('.copy-link-button');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Optional: Provide feedback like "Copied!"
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }
});
