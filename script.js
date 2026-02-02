let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
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

document.addEventListener('DOMContentLoaded', () => {
    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', () => {
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !isExpanded);
            shareMenu.setAttribute('aria-hidden', isExpanded);
        });

        document.addEventListener('click', (event) => {
            if (!shareContainer.contains(event.target)) {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
                shareButton.focus();
            }
        });

        // Initialize Share Links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const links = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
            email: `mailto:?subject=${title}&body=${url}`
        };

        document.querySelectorAll('.share-link').forEach(link => {
            const type = link.getAttribute('data-type');
            if (links[type]) {
                link.href = links[type];
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });

        // Copy Link
        const copyButton = document.querySelector('.copy-link-button');
        if (copyButton) {
            copyButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            });
        }
    }
});
