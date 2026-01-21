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

    // Share Button Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkButton = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        // Generate social links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const socialLinks = [
            { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${url}` },
            { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
            { name: 'Email', href: `mailto:?subject=${title}&body=Check%20out%20${url}` }
        ];

        // Insert links before the copy link button
        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = link.name;
            shareMenu.insertBefore(a, copyLinkButton);
        });

        // Toggle menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            shareMenu.classList.toggle('hidden');
            const expanded = !shareMenu.classList.contains('hidden');
            shareButton.setAttribute('aria-expanded', expanded);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareButton.contains(e.target) && !shareMenu.contains(e.target)) {
                shareMenu.classList.add('hidden');
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Copy link functionality
        if (copyLinkButton) {
            copyLinkButton.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalText = copyLinkButton.textContent;
                    copyLinkButton.textContent = 'Link copied';
                    setTimeout(() => {
                        copyLinkButton.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }
});
