document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    showSlides(slideIndex);

    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        if (slides.length === 0) return; // Guard against no slides
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
    const copyButton = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });

        document.addEventListener('click', function(e) {
            if (!shareMenu.contains(e.target) && e.target !== shareButton) {
                toggleMenu(false);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                toggleMenu(false);
                shareButton.focus();
            }
        });

        function toggleMenu(show) {
            shareButton.setAttribute('aria-expanded', show);
            shareMenu.setAttribute('aria-hidden', !show);
        }

        // Initialize social links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const links = {
            twitter: `https://twitter.com/intent/tweet?text=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/shareArticle?url=${url}&mini=true`,
            email: `mailto:?subject=${title}&body=${url}`
        };

        for (const [key, href] of Object.entries(links)) {
            const link = shareMenu.querySelector(`.share-link.${key}`);
            if (link) link.href = href;
        }
    }

    if (copyButton) {
        copyButton.addEventListener('click', async function() {
             try {
                 await navigator.clipboard.writeText(window.location.href);
                 const originalText = copyButton.textContent;
                 copyButton.textContent = 'Link copied!';
                 setTimeout(() => copyButton.textContent = originalText, 2000);
             } catch (err) {
                 console.error('Failed to copy: ', err);
             }
        });
    }
});
