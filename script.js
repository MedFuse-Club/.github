document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    showSlides(slideIndex);

    // Carousel buttons
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
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].classList.add("active");
    }

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkBtn = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const willExpand = shareMenu.hidden;
            shareMenu.hidden = !willExpand;
            shareButton.setAttribute('aria-expanded', willExpand);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareButton.contains(e.target) && !shareMenu.contains(e.target)) {
                shareMenu.hidden = true;
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !shareMenu.hidden) {
                shareMenu.hidden = true;
                shareButton.setAttribute('aria-expanded', 'false');
                shareButton.focus();
            }
        });

        // Dynamic Social Links
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        document.querySelectorAll('.share-link').forEach(link => {
            const type = link.getAttribute('data-type');
            let href = '#';
            if (type === 'twitter') {
                href = `https://twitter.com/intent/tweet?text=${pageUrl}`;
            } else if (type === 'facebook') {
                href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            } else if (type === 'linkedin') {
                href = `https://www.linkedin.com/shareArticle?url=${pageUrl}&mini=true`;
            } else if (type === 'email') {
                href = `mailto:?subject=${pageTitle}&body=${pageUrl}`;
            }
            link.href = href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        });

        // Copy Link
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Feedback logic could go here
                    const originalText = copyLinkBtn.innerText;
                    copyLinkBtn.innerText = 'Link copied!';
                    setTimeout(() => {
                        copyLinkBtn.innerText = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }
});
