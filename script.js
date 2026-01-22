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
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].className = slides[i].className.replace(" active", "");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].className += " active";
    }

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');

    if (shareButton && shareMenu) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        // Dynamic Social Links
        const socialLinks = [
            { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
            { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}` },
            { name: 'Email', url: `mailto:?subject=${title}&body=${url}` }
        ];

        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            shareMenu.appendChild(a);
        });

        // Copy Link Button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-link-btn';
        copyButton.textContent = 'Copy link';
        copyButton.onclick = () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                // Ideally show a toast, but alert is simple for now or just close
                // alert('Link copied to clipboard!');
                closeMenu();
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        };
        shareMenu.appendChild(copyButton);

        // Toggle Menu
        function toggleMenu() {
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !isExpanded);
            shareMenu.classList.toggle('visible');
        }

        function closeMenu() {
            shareButton.setAttribute('aria-expanded', 'false');
            shareMenu.classList.remove('visible');
        }

        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            // shareMenu is not the container, share-container is.
            // But here we check if click is inside shareMenu or on shareButton.
            if (!shareMenu.contains(e.target) && e.target !== shareButton) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
                shareButton.focus();
            }
        });
    }
});
