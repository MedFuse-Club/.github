document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    showSlides(slideIndex);

    // Expose plusSlides to global scope for inline onclick handlers
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

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkButton = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        // Toggle menu
        shareButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });

        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!shareButton.contains(e.target) && !shareMenu.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close on Escape
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

        // Populate Social Links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const socialLinks = [
            { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${url}` },
            { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
            { name: 'Email', url: `mailto:?subject=${title}&body=${url}` }
        ];

        // Insert before the copy link button
        const fragment = document.createDocumentFragment();
        socialLinks.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            li.appendChild(a);
            fragment.appendChild(li);
        });

        shareMenu.insertBefore(fragment, copyLinkButton.parentElement);

        // Copy Link
        if (copyLinkButton) {
            copyLinkButton.addEventListener('click', async function() {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    const originalText = copyLinkButton.textContent;
                    copyLinkButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyLinkButton.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            });
        }
    }
});
