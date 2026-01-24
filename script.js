document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        if (!slides.length) return;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].classList.add("active");
    }

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => plusSlides(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => plusSlides(1));
    }

    // Share functionality
    const shareContainer = document.querySelector('.share-container');
    const shareBtn = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkBtn = document.querySelector('.copy-link');

    if (shareBtn && shareMenu) {
        // Generate social links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const socials = [
            { name: 'Twitter', href: `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
            { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
            { name: 'Email', href: `mailto:?subject=${title}&body=${url}` }
        ];

        // Insert before copy link button
        socials.forEach(social => {
            const link = document.createElement('a');
            link.href = social.href;
            link.textContent = social.name;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            shareMenu.insertBefore(link, copyLinkBtn);
        });

        // Toggle menu
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = shareBtn.getAttribute('aria-expanded') === 'true';
            shareBtn.setAttribute('aria-expanded', !isExpanded);
            shareMenu.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!shareContainer.contains(e.target)) {
                shareBtn.setAttribute('aria-expanded', 'false');
                shareMenu.classList.remove('open');
            }
        });

        // Copy link
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Optional: Provide feedback
                    const originalText = copyLinkBtn.textContent;
                    copyLinkBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyLinkBtn.textContent = originalText;
                    }, 2000);
                });
                // Close menu
                 shareBtn.setAttribute('aria-expanded', 'false');
                 shareMenu.classList.remove('open');
            });
        }
    }
});
