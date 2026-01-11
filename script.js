window.plusSlides = plusSlides;
window.showSlides = showSlides;

let slideIndex = 1;
// Ensure DOM is loaded before running initial showSlides if script is deferred
// Actually, since it's defer, it runs after parsing, but before DOMContentLoaded.
// The elements should be there.
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
