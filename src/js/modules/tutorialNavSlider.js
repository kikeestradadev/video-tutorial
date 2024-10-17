const tutorialNavSlider = () => {
    document.addEventListener("DOMContentLoaded", function () {
        // Seleccionar los elementos de ambos sliders
        const singleSliderElement = document.querySelector('.tutorial-single-slider');
        const thumbsSliderElement = document.querySelector('.tutorial-thumbs-slider');

        // Validar que ambos sliders existan
        if (!singleSliderElement || !thumbsSliderElement) return;

        // Inicializar el slider de thumbnails
        const tutorialThumbsSlider = new Swiper('.tutorial-thumbs-slider', {
            direction: 'horizontal',
            loop: false,
            slidesPerView: 'auto',
            spaceBetween: 15,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            a11y: {
                enabled: true,
                slideLabelMessage: "Slide {{index}} of {{slidesLength}}",
                slideRole: null, // Custom role for slide
            },
        });

        // Inicializar el slider principal sin permitir swipe manual
        const tutorialSingleSlider = new Swiper('.tutorial-single-slider', {
            effect: 'fade',
            speed: 800,
            autoHeight: true,
            fadeEffect: {
                crossFade: true,
            },
            watchOverflow: true,
            allowTouchMove: false, // Desactiva swipe manual
            thumbs: {
                swiper: tutorialThumbsSlider, // Conectar ambos sliders
            },
            a11y: {
                enabled: true,
                slideLabelMessage: "Slide {{index}} of {{slidesLength}}",
                slideRole: null,
            },
        });
    });
};

export default tutorialNavSlider;
