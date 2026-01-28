let slideIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    initShareMenu();
});

// Make plusSlides global so onclick works
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return; // Guard clause

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" active", "");
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className += " active";
}

function initShareMenu() {
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    if (!shareButton || !shareMenu) return;

    // Toggle menu
    shareButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = shareButton.getAttribute('aria-expanded') === 'true';
        shareButton.setAttribute('aria-expanded', !expanded);
        shareMenu.setAttribute('aria-hidden', expanded);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!shareMenu.contains(e.target) && !shareButton.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            shareButton.focus();
        }
    });

    function closeMenu() {
        shareButton.setAttribute('aria-expanded', 'false');
        shareMenu.setAttribute('aria-hidden', 'true');
    }

    // Generate Links
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const links = [
        { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${url}` },
        { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
        { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
        { name: 'Email', href: `mailto:?subject=${title}&body=${url}` }
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.name;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        shareMenu.appendChild(a);
    });

    // Copy Link
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy link';
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = originalText, 2000);
            closeMenu();
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
    shareMenu.appendChild(copyBtn);
}
