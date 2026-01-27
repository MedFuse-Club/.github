document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    function showSlides(n) {
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].className = slides[i].className.replace(" active", "");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].className += " active";
    }

    // Initial show
    if (slides.length > 0) {
        showSlides(slideIndex);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlides(slideIndex -= 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlides(slideIndex += 1));
    }


    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');
    const copyLinkBtn = document.querySelector('.copy-link');

    // Social Links
    // Using hardcoded URL as per likely requirement to match the reference site behavior or just current page
    const shareUrl = "https://sites.research.google/gr/med-palm/";
    const shareTitle = document.title;

    const socialLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&mini=true`,
        email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=Check out ${encodeURIComponent(shareUrl)}`
    };

    const twitterBtn = document.querySelector('.share-item.twitter');
    if (twitterBtn) twitterBtn.href = socialLinks.twitter;

    const facebookBtn = document.querySelector('.share-item.facebook');
    if (facebookBtn) facebookBtn.href = socialLinks.facebook;

    const linkedinBtn = document.querySelector('.share-item.linkedin');
    if (linkedinBtn) linkedinBtn.href = socialLinks.linkedin;

    const emailBtn = document.querySelector('.share-item.email');
    if (emailBtn) emailBtn.href = socialLinks.email;


    if (shareButton && shareMenu) {
        function openMenu() {
            shareButton.setAttribute('aria-expanded', 'true');
            shareMenu.setAttribute('aria-hidden', 'false');
        }

        function closeMenu() {
            shareButton.setAttribute('aria-expanded', 'false');
            shareMenu.setAttribute('aria-hidden', 'true');
        }

        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (shareContainer && !shareContainer.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
                shareButton.focus();
            }
        });

        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    const originalText = copyLinkBtn.textContent;
                    copyLinkBtn.textContent = "Copied!";
                    setTimeout(() => {
                        copyLinkBtn.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
                closeMenu();
            });
        }
    }
});
