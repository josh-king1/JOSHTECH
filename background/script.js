let slides = document.querySelectorAll(".slide");
let thumbs = document.querySelectorAll(".thumb");
let index = 0;

function showSlide(i) {
    slides.forEach((slide, idx) => {
        slide.classList.remove("active");
        thumbs[idx].classList.remove("active");
    });

    slides[i].classList.add("active");
    thumbs[i].classList.add("active");

    document.querySelector(".slides").style.transform =
        `translateX(-${i * 100}%)`;
}

document.getElementById("next").onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
};

document.getElementById("prev").onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
};

thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
        index = i;
        showSlide(index);
    });
});

/* Auto Slide */
setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 5000);