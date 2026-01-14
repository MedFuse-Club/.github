document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (slides.length > 0) {
        showSlides(slideIndex);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => plusSlides(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => plusSlides(1));
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].className = slides[i].className.replace(" active", "");
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        slides[slideIndex-1].className += " active";
    }
});
