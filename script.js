let slideIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    setupShareMenu();
});

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

function setupShareMenu() {
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkBtn = document.querySelector('.copy-link-btn');

    if (!shareButton || !shareMenu) return;

    // Toggle menu
    shareButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = shareMenu.getAttribute('aria-hidden') === 'true';
        shareMenu.setAttribute('aria-hidden', !isHidden);
        shareButton.setAttribute('aria-expanded', isHidden);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!shareMenu.contains(e.target) && !shareButton.contains(e.target)) {
            shareMenu.setAttribute('aria-hidden', 'true');
            shareButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            shareMenu.setAttribute('aria-hidden', 'true');
            shareButton.setAttribute('aria-expanded', 'false');
            shareButton.focus();
        }
    });

    // Copy Link
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
             navigator.clipboard.writeText(window.location.href).then(() => {
                 const originalText = copyLinkBtn.textContent;
                 copyLinkBtn.textContent = "Link copied";
                 setTimeout(() => {
                     copyLinkBtn.textContent = originalText;
                 }, 2000);
             }).catch(err => {
                 console.error('Failed to copy: ', err);
             });
        });
    }

    // Generate Social Links
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const socialLinks = [
        { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${url}` },
        { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
        { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
        { name: 'Email', href: `mailto:?subject=${title}&body=${url}` }
    ];

    socialLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.name;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        li.appendChild(a);
        shareMenu.appendChild(li);
    });
}
