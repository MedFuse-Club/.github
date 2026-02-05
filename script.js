document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");

    // Initialize
    if (slides.length > 0) {
        showSlides(slideIndex);
    }

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton) {
        prevButton.addEventListener('click', () => plusSlides(-1));
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => plusSlides(1));
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].style.display = "none";
        }

        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].classList.add("active");
    }

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareLinksContainer = document.querySelector('.share-links');
    const shareUrlInput = document.querySelector('.share-url-input');
    const copyLinkButton = document.querySelector('.copy-link-button');

    if (shareButton && shareMenu) {
        // Toggle menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = shareMenu.hasAttribute('hidden');
            if (isHidden) {
                shareMenu.removeAttribute('hidden');
                shareButton.setAttribute('aria-expanded', 'true');
                generateShareLinks();
                shareUrlInput.value = window.location.href;
            } else {
                closeShareMenu();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!shareMenu.contains(e.target) && e.target !== shareButton) {
                closeShareMenu();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !shareMenu.hasAttribute('hidden')) {
                closeShareMenu();
                shareButton.focus();
            }
        });

        // Copy link
        if (copyLinkButton && shareUrlInput) {
            copyLinkButton.addEventListener('click', () => {
                shareUrlInput.select();
                navigator.clipboard.writeText(shareUrlInput.value).then(() => {
                    const originalText = copyLinkButton.textContent;
                    copyLinkButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyLinkButton.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }

    function closeShareMenu() {
        if (shareMenu) {
            shareMenu.setAttribute('hidden', '');
            if (shareButton) shareButton.setAttribute('aria-expanded', 'false');
        }
    }

    function generateShareLinks() {
        if (!shareLinksContainer || shareLinksContainer.children.length > 0) return;

        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const socialLinks = [
            { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${url}`, icon: '🐦' },
            { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: '📘' },
            { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?url=${url}&mini=true`, icon: '💼' },
            { name: 'Email', url: `mailto:?subject=${title}&body=${url}`, icon: '✉️' }
        ];

        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.ariaLabel = `Share on ${link.name}`;
            a.textContent = link.icon;
            shareLinksContainer.appendChild(a);
        });
    }
});
