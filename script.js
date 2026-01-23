
let slideIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic
    showSlides(slideIndex);

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const copyLinkButton = document.querySelector('.copy-link');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = shareMenu.hidden;
            shareMenu.hidden = !isHidden;
            shareButton.setAttribute('aria-expanded', !isHidden);
        });

        document.addEventListener('click', (e) => {
            if (!shareMenu.contains(e.target) && e.target !== shareButton) {
                shareMenu.hidden = true;
                shareButton.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
             if (e.key === 'Escape' && !shareMenu.hidden) {
                shareMenu.hidden = true;
                shareButton.setAttribute('aria-expanded', 'false');
                shareButton.focus();
             }
        });

        // Generate Social Links
        // Note: In local verification with file://, window.location.href might be a file path.
        // It's acceptable.
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const socialLinks = [
            { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${url}` },
            { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${url}&mini=true` },
            { name: 'Email', href: `mailto:?subject=${title}&body=${url}` }
        ];

        // Insert in reverse order to maintain order when using insertBefore(..., firstChild)
        // copy-link is the only child currently.
        // We want social links BEFORE copy-link?
        // Text output: Share -> + + + + + (Social) -> Copy Link.
        // So Social links first, then Copy Link.
        // Current HTML: <div class="share-menu"><button class="copy-link"></div>
        // insertBefore(a, firstChild) will push copy-link down.
        socialLinks.slice().reverse().forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.target = '_blank';
            a.textContent = link.name;
            shareMenu.insertBefore(a, shareMenu.firstChild);
        });

        if (copyLinkButton) {
            copyLinkButton.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalText = copyLinkButton.textContent;
                    copyLinkButton.textContent = 'Link copied!';
                    setTimeout(() => {
                        copyLinkButton.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
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
        slides[i].className = slides[i].className.replace(" active", "");
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className += " active";
}
