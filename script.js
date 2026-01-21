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
            slides[i].className = slides[i].className.replace(" active", "");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].className += " active";
    }

    // Share Button Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkButton = document.querySelector('.copy-link-button');

    if (shareButton && shareMenu) {
        // Toggle menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = shareMenu.classList.contains('visually-hidden');
            if (isHidden) {
                shareMenu.classList.remove('visually-hidden');
                shareButton.setAttribute('aria-expanded', 'true');
                generateShareLinks();
            } else {
                shareMenu.classList.add('visually-hidden');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareMenu.contains(e.target) && e.target !== shareButton) {
                shareMenu.classList.add('visually-hidden');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !shareMenu.classList.contains('visually-hidden')) {
                shareMenu.classList.add('visually-hidden');
                shareButton.setAttribute('aria-expanded', 'false');
                shareButton.focus();
            }
        });
    }

    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                // Optional: Provide feedback (e.g., change text to "Copied!")
                const originalText = copyLinkButton.innerText;
                copyLinkButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyLinkButton.innerText = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }

    function generateShareLinks() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        // Remove existing dynamic links to avoid duplicates if called multiple times
        const existingLinks = shareMenu.querySelectorAll('.dynamic-share-link');
        existingLinks.forEach(link => link.remove());

        const links = [
            { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${url}` },
            { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
            { name: 'Email', href: `mailto:?subject=${title}&body=Check%20out%20${url}` }
        ];

        // Insert links before the copy link button
        links.reverse().forEach(linkData => {
            const link = document.createElement('a');
            link.href = linkData.href;
            link.textContent = linkData.name;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'dynamic-share-link';
            shareMenu.insertBefore(link, shareMenu.firstChild);
        });
    }
});
