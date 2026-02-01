let slideIndex = 1;
showSlides(slideIndex);

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkButton = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        // Toggle menu
        shareButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const expanded = shareButton.getAttribute('aria-expanded') === 'true' || false;
            shareButton.setAttribute('aria-expanded', !expanded);
            shareMenu.setAttribute('aria-hidden', expanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!shareMenu.contains(e.target) && !shareButton.contains(e.target)) {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                shareButton.setAttribute('aria-expanded', 'false');
                shareMenu.setAttribute('aria-hidden', 'true');
                shareButton.focus();
            }
        });
    }

    // Populate share links
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(document.title);

    const twitterLink = document.querySelector('.share-twitter');
    if (twitterLink) twitterLink.href = `https://twitter.com/intent/tweet?text=${currentUrl}`;

    const facebookLink = document.querySelector('.share-facebook');
    if (facebookLink) facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

    const linkedinLink = document.querySelector('.share-linkedin');
    if (linkedinLink) linkedinLink.href = `https://www.linkedin.com/shareArticle?url=${currentUrl}&mini=true`;

    const emailLink = document.querySelector('.share-email');
    if (emailLink) emailLink.href = `mailto:?subject=${currentTitle}&body=Check%20out%20${currentUrl}`;

    // Copy link functionality
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(function() {
                // Optional: Provide feedback
                const originalText = copyLinkButton.innerText;
                copyLinkButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyLinkButton.innerText = originalText;
                }, 2000);
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        });
    }
});
