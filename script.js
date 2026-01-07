let slideIndex = 1;

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    if (!slides.length) return; // Guard clause if no slides exist

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" active", "");
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className += " active";
}

// Make functions available globally for onclick handlers in HTML
window.plusSlides = plusSlides;
