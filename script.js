let slideIndex = 1;
// Ensure DOM is fully loaded before running script if it wasn't deferred (though defer handles this)
// But since we use defer, it runs after parsing.

// Expose functions to window
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

window.showSlides = showSlides;

// Initialize slideshow
showSlides(slideIndex);

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
