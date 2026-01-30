document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    let slideIndex = 1;
    showSlides(slideIndex);

    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        if (slides.length === 0) return;

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
    const copyLinkButton = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!shareMenu.contains(e.target) && !shareButton.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleMenu(false);
                shareButton.focus();
            }
        });

        function toggleMenu(show) {
            shareButton.setAttribute('aria-expanded', show);
            shareMenu.setAttribute('aria-hidden', !show);
        }

        // Generate Social Links
        const currentUrl = encodeURIComponent(window.location.href);
        const currentTitle = encodeURIComponent(document.title);

        const twitterLink = document.querySelector('.share-twitter');
        if (twitterLink) {
            twitterLink.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;
            twitterLink.target = "_blank";
            twitterLink.rel = "noopener noreferrer";
        }

        const facebookLink = document.querySelector('.share-facebook');
        if (facebookLink) {
            facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            facebookLink.target = "_blank";
            facebookLink.rel = "noopener noreferrer";
        }

        const linkedinLink = document.querySelector('.share-linkedin');
        if (linkedinLink) {
            linkedinLink.href = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${currentTitle}`;
            linkedinLink.target = "_blank";
            linkedinLink.rel = "noopener noreferrer";
        }

        const emailLink = document.querySelector('.share-email');
        if (emailLink) {
            emailLink.href = `mailto:?subject=${currentTitle}&body=Check out this link: ${window.location.href}`;
        }
    }

    // Copy Link Logic
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const originalText = copyLinkButton.textContent;
                copyLinkButton.textContent = "Copied!";
                setTimeout(() => {
                    copyLinkButton.textContent = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }
});
