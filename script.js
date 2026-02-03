document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    let slideIndex = 1;
    showSlides(slideIndex);

    // Expose plusSlides to global scope because HTML uses onclick="plusSlides(n)"
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
    setupShareMenu();
});

function setupShareMenu() {
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');

    if (!shareButton || !shareMenu) return;

    // Generate Share Links
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const links = [
        { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${url}` },
        { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
        { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
        { name: 'Email', href: `mailto:?subject=${title}&body=Check%20out%20${url}` }
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.name;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        shareMenu.appendChild(a);
    });

    // Copy Link Button
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy link';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            console.log('Link copied!');
            closeMenu();
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };
    shareMenu.appendChild(copyBtn);

    // Toggle Menu
    shareButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = shareButton.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    function openMenu() {
        shareButton.setAttribute('aria-expanded', 'true');
        shareMenu.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
        shareButton.setAttribute('aria-expanded', 'false');
        shareMenu.setAttribute('aria-hidden', 'true');
    }

    // Close on click outside
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
}
