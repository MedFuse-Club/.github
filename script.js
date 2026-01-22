document.addEventListener('DOMContentLoaded', () => {
    // Carousel
    let slideIndex = 1;
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (slides.length > 0) {
        showSlides(slideIndex);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => plusSlides(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => plusSlides(1));
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
            slides[i].classList.remove("active");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].classList.add("active");
    }

    // Share Menu
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareLinks = document.querySelectorAll('.share-link:not(.copy-link)');
    const copyLinkBtn = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !expanded);
            shareMenu.classList.toggle('active');
            shareMenu.setAttribute('aria-hidden', expanded);
        });

        document.addEventListener('click', (e) => {
            if (!shareMenu.contains(e.target) && e.target !== shareButton) {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.classList.remove('active');
                shareMenu.setAttribute('aria-hidden', 'true');
            }
        });

        // Generate Social Links
        const currentUrl = window.location.href;
        const currentTitle = document.title;

        shareLinks.forEach(link => {
            const platform = link.getAttribute('data-platform');
            let shareUrl = '#';

            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}&mini=true`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(currentTitle)}&body=${encodeURIComponent(currentUrl)}`;
                    break;
            }
            link.href = shareUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        });

        // Copy Link
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(currentUrl);
                    const originalText = copyLinkBtn.textContent;
                    copyLinkBtn.textContent = 'Copied!';
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
