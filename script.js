document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    showSlides(slideIndex);

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton) {
        prevButton.addEventListener('click', () => plusSlides(-1));
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => plusSlides(1));
    }

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

    // Share Menu Logic
    const shareButton = document.querySelector('.share-button');
    const shareMenu = document.querySelector('.share-menu');
    const shareList = document.querySelector('.share-list');
    const copyButton = document.querySelector('.copy-button');
    const urlInput = document.querySelector('.share-url-input');

    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = shareButton.getAttribute('aria-expanded') === 'true';
            shareButton.setAttribute('aria-expanded', !expanded);
            shareMenu.setAttribute('aria-hidden', expanded);

            if (!expanded) {
                // Populate menu if opening
                populateShareLinks();
                if (urlInput) urlInput.value = window.location.href;
            }
        });

        document.addEventListener('click', (e) => {
            if (!shareMenu.contains(e.target) && !shareButton.contains(e.target)) {
                 shareButton.setAttribute('aria-expanded', 'false');
                 shareMenu.setAttribute('aria-hidden', 'true');
            }
        });

        // Handle Esc key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && shareButton.getAttribute('aria-expanded') === 'true') {
                 shareButton.setAttribute('aria-expanded', 'false');
                 shareMenu.setAttribute('aria-hidden', 'true');
                 shareButton.focus();
            }
        });
    }

    if (copyButton && urlInput) {
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(urlInput.value).then(() => {
                const originalText = copyButton.innerText;
                copyButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyButton.innerText = originalText;
                }, 2000);
            });
        });
    }

    function populateShareLinks() {
        if (!shareList || shareList.children.length > 0) return;

        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const links = [
            { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${title}&url=${url}` },
            { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
            { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}` },
            { name: 'Email', href: `mailto:?subject=${title}&body=${url}` }
        ];

        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href;
            a.innerText = link.name;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            li.appendChild(a);
            shareList.appendChild(li);
        });
    }
});
