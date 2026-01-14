let slideIndex = 1;

// Use defer in HTML so this runs after parsing
// But to be safe and standard, we can use an init function or just run it if defer is guaranteed.
// Given the memory "External JavaScript files are linked in the <head> using the defer attribute ... removing the need for DOMContentLoaded listeners", I will run it directly.

// Initial display
// We need to wait for the elements to be available if script is not deferred properly,
// but since I will add defer, it should be fine.
// However, to strictly follow "removing the need for DOMContentLoaded listeners", I'll assume defer is working.

// We need to attach listeners.
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (prevButton) {
    prevButton.addEventListener('click', () => plusSlides(-1));
}

if (nextButton) {
    nextButton.addEventListener('click', () => plusSlides(1));
}

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (!slides || slides.length === 0) return;

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].classList.add("active");
}
