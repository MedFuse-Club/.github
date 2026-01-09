let slideIndex = 1;

// Expose function to window so it can be called from HTML onclick attributes
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
});

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");

    if (slides.length === 0) return;

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        // Ensure inline display style doesn't override class
        slides[i].style.display = "";
    }

    slides[slideIndex-1].classList.add("active");
}
