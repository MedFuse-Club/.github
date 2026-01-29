document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel Logic ---
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

    // --- Share Menu Logic ---
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');

    if (shareButton && shareMenu) {
        // Toggle menu
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = shareButton.getAttribute('aria-expanded') === 'true';
            toggleMenu(!expanded);
        });

        // Close on click outside
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
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const twitter = document.querySelector('.share-option.twitter');
        if (twitter) twitter.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

        const facebook = document.querySelector('.share-option.facebook');
        if (facebook) facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

        const linkedin = document.querySelector('.share-option.linkedin');
        if (linkedin) linkedin.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;

        const email = document.querySelector('.share-option.email');
        if (email) email.href = `mailto:?subject=${title}&body=${url}`;

        // Copy Link
        const copyBtn = document.querySelector('.share-option.copy-link');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        toggleMenu(false);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                    });
                } else {
                     console.warn('Clipboard API not available');
                }
            });
        }
    }
});
