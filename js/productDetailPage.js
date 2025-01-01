function productSlider() {
    let smallImages = document.querySelectorAll(".thumb-box img");
    let fullImage = document.querySelector("#full-image");

    smallImages.forEach(function (item) {
        item.addEventListener("mouseenter", function () {
            fullImage.src = item.src;
        });
    });
}
productSlider();