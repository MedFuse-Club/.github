document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    if (slides.length > 0) {
        showSlides(slideIndex);
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => plusSlides(-1));
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => plusSlides(1));
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].classList.add("active");
    }
});
