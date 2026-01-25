document.addEventListener('DOMContentLoaded', () => {
    /* Carousel Logic */
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");

    // Initial display
    if (slides.length > 0) {
        showSlides(slideIndex);
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

    // Attach listeners to buttons
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));


    /* Share Menu Logic */
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');

    if (shareButton && shareMenu) {
        // Toggle menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                closeShareMenu();
            } else {
                openShareMenu();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareButton.contains(e.target) && !shareMenu.contains(e.target)) {
                closeShareMenu();
            }
        });

        // Populate dynamic links
        const currentUrl = encodeURIComponent(window.location.href);
        const currentTitle = encodeURIComponent(document.title);

        const links = {
            'twitter': `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`,
            'facebook': `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
            'linkedin': `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${currentTitle}`,
            'email': `mailto:?subject=${currentTitle}&body=${currentUrl}`
        };

        const shareLinks = shareMenu.querySelectorAll('a.share-link');
        shareLinks.forEach(link => {
            const type = link.getAttribute('data-type');
            if (links[type]) {
                link.href = links[type];
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });

        // Copy Link
        const copyBtn = shareMenu.querySelector('.copy-link');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Optional: Provide feedback (e.g., change text briefly)
                    const originalText = copyBtn.innerText;
                    copyBtn.innerText = 'Copied!';
                    setTimeout(() => {
                        copyBtn.innerText = originalText;
                        closeShareMenu();
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }

        function openShareMenu() {
            shareButton.setAttribute('aria-expanded', 'true');
            shareMenu.setAttribute('aria-hidden', 'false');
        }

        function closeShareMenu() {
            shareButton.setAttribute('aria-expanded', 'false');
            shareMenu.setAttribute('aria-hidden', 'true');
        }
    }
});
