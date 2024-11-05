const tutorialCategorySliderApi = async () => {
    const baseUrl = 'https://strapi.5050.ag';
    const query = 'api/tutorials?populate=*&filters[top]=false';

    try {
        const response = await fetch(`${baseUrl}/${query}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const tutorials = data.data;

        const categorySliderContainer = document.querySelector('.tutorial-category-slider .swiper-wrapper');
        categorySliderContainer.innerHTML = '';

        tutorials.forEach(tutorial => {
            const attributes = tutorial.attributes;
            const thumbImgUrl = `${baseUrl}${attributes.thumbimage.data[0].attributes.url}`;
            const videoUrl = attributes.ctaurl || '';

            const categorySlide = document.createElement('div');
            categorySlide.className = 'swiper-slide tutorial-category-slider__item';
            categorySlide.setAttribute('data-bs-toggle', 'modal');
            categorySlide.setAttribute('data-bs-target', '#exampleModalToggle1');
            categorySlide.setAttribute('data-video-url', videoUrl);

            categorySlide.innerHTML = `
                <div class="tutorial-category-slider__image-container" style="background-image: url('${thumbImgUrl}')"></div>
                <div class="tutorial-category-slider__text-container">
                    <span class="tutorial-category-slider__item-title">${attributes.category}</span>
                    <span class="tutorial-category-slider__item-date">${attributes.title}</span>
                </div>
            `;

            categorySliderContainer.appendChild(categorySlide);
        });

        // Inicializar el slider de categoría
        new Swiper('.tutorial-category-slider', {
            slidesPerView: 'auto',
            spaceBetween: 15,
            loop: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        // Agregar evento para abrir la modal con el video correspondiente
        document.addEventListener('click', function (event) {
            if (event.target.closest('.tutorial-category-slider__item')) {
                const item = event.target.closest('.tutorial-category-slider__item');
                const videoUrl = item.getAttribute('data-video-url');
                const videoElement = document.getElementById('videoElement');
                const videoSource = document.getElementById('videoSource');

                // Establecer la URL del video seleccionado en el elemento source
                videoSource.src = videoUrl;
                videoElement.load(); // Recargar el video con la nueva URL
                videoElement.play(); // Reproducir el video automáticamente
            }
        });

        // Detener el video y resetear el src cuando se cierre la modal
        const modal = document.getElementById('exampleModalToggle1');
        modal.addEventListener('hidden.bs.modal', () => {
            const videoElement = document.getElementById('videoElement');
            videoElement.pause();
            videoElement.currentTime = 0; // Reiniciar el video al inicio
            videoElement.querySelector('source').src = ''; // Limpiar la URL para evitar que el video siga cargando
        });

    } catch (error) {
        console.error('Failed to fetch tutorials:', error);
    }
};

export default tutorialCategorySliderApi;
