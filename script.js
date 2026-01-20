document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");

    if (slides.length > 0) {
        showSlides(slideIndex);

        window.plusSlides = function(n) {
            showSlides(slideIndex += n);
        }

        function showSlides(n) {
            let i;
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].className = slides[i].className.replace(" active", "");
                slides[i].style.display = "none";
            }
            slides[slideIndex-1].style.display = "block";
            slides[slideIndex-1].className += " active";
        }
    }

    // Share Button Logic
    const shareButton = document.getElementById('shareButton');
    const shareMenu = document.getElementById('shareMenu');
    const copyLinkBtn = document.getElementById('copyLink');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !isExpanded);
            shareMenu.classList.toggle('show');
            shareMenu.setAttribute('aria-hidden', isExpanded);
        });

        document.addEventListener('click', (e) => {
            if (!shareMenu.contains(e.target) && e.target !== shareButton) {
                shareMenu.classList.remove('show');
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
            }
        });

        document.addEventListener('keydown', (e) => {
             if (e.key === 'Escape') {
                shareMenu.classList.remove('show');
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
                shareButton.focus();
             }
        });
    }

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalText = copyLinkBtn.textContent;
                copyLinkBtn.textContent = 'Link copied!';
                setTimeout(() => {
                    copyLinkBtn.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // Set share links dynamically
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const shareLinks = {
        'Twitter': `https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`,
        'Facebook': `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        'LinkedIn': `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
        'Email': `mailto:?subject=${title}&body=Check out this site: ${currentUrl}`
    };

    document.querySelectorAll('.share-item').forEach(item => {
        const platform = item.textContent.trim();
        if (shareLinks[platform]) {
            item.href = shareLinks[platform];
        }
    });
});
