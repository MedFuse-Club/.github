// Carousel Logic
let slideIndex = 1;

// Initialize if carousel exists
// We wait for DOMContentLoaded to ensure elements exist if script is loaded in head
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.carousel-slide')) {
        showSlides(slideIndex);
    }
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return;

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].className = slides[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className += " active";
}

// Share Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareContainer = document.querySelector('.share-container');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', () => {
            const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !isExpanded);
            shareMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!shareContainer.contains(event.target)) {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.classList.remove('active');
            }
        });

        // Social Links
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const twitter = document.querySelector('.share-twitter');
        if (twitter) twitter.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

        const facebook = document.querySelector('.share-facebook');
        if (facebook) facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

        const linkedin = document.querySelector('.share-linkedin');
        if (linkedin) linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

        const email = document.querySelector('.share-email');
        if (email) email.href = `mailto:?subject=${title}&body=${url}`;

        // Copy Link
        const copyButton = document.querySelector('.copy-link-button');
        if (copyButton) {
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    // Optional: Visual feedback
                    const originalText = copyButton.innerText;
                    copyButton.innerText = "Copied!";
                    setTimeout(() => {
                        copyButton.innerText = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    }
});
