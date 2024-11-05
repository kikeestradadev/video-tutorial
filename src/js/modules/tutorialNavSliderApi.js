

const tutorialNavSliderApi = async () => {
	const baseUrl = 'https://strapi.5050.ag'; // URL base de Strapi
    const query = 'api/tutorials?populate=*&filters[top]=true'; // Filtrar por 'top' igual a true

    try {
        // Realizar la petición al API de Strapi con el filtro aplicado
        const response = await fetch(`${baseUrl}/${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const tutorials = data.data;

        // Selección de los contenedores de los sliders
        const mainSliderContainer = document.querySelector('.tutorial-single-slider .swiper-wrapper');
        const thumbSliderContainer = document.querySelector('.tutorial-thumbs-slider .swiper-wrapper');

        // Limpiar los contenedores para evitar duplicados
        mainSliderContainer.innerHTML = '';
        thumbSliderContainer.innerHTML = '';

        // Iterar sobre los datos y crear los elementos HTML para los sliders
        tutorials.forEach(tutorial => {
            const attributes = tutorial.attributes;
            const mainImgUrl = `${baseUrl}${attributes.mainimg.data[0].attributes.url}`;
            const thumbImgUrl = `${baseUrl}${attributes.thumbimage.data[0].attributes.url}`; // Asegurar que esta es la imagen de thumbnail
			const videoUrl = attributes.video && attributes.video.data.length > 0 ? `${baseUrl}${attributes.video.data[0].attributes.url}` : '';

            // Crear el slide principal
            const mainSlide = document.createElement('div');
            mainSlide.className = 'swiper-slide tutorial-single-slider__item';
            mainSlide.innerHTML = `
                <div class="tutorial-single-slider__container">
                    <img src="${mainImgUrl}" class="tutorial-single-slider__bg-img" alt="">
                    <div class="tutorial-single-slider__text-container">
                        <span class="tutorial-single-slider__category">${attributes.category}</span>
                        <span class="tutorial-single-slider__title">${attributes.title}</span>
                        <span class="tutorial-single-slider__description from-lg">${attributes.description}</span>
                        <span class="tutorial-single-slider__play" data-bs-toggle="modal" data-bs-target="#exampleModalToggle1" data-video-url="${videoUrl}">
							<img src="images/play_arrow.svg" alt=""> WATCH NOW
						</span>
                    </div>
                </div>
            `;

            // Crear el slide thumbnail
            const thumbSlide = document.createElement('div');
            thumbSlide.className = 'swiper-slide tutorial-thumbs-slider__item';
            thumbSlide.innerHTML = `
                <img src="${thumbImgUrl}" alt="${attributes.title}">
                <div class="tutorial-thumbs-slider__text-container">
                    <span class="tutorial-thumbs-slider__item-title">${attributes.category}</span>
                    <span class="tutorial-thumbs-slider__item-description">${attributes.title}</span>
                </div>
            `;

            // Agregar los slides a sus respectivos contenedores
            mainSliderContainer.appendChild(mainSlide);
            thumbSliderContainer.appendChild(thumbSlide);
        });

        // Inicializar los sliders después de que todos los elementos se han añadido al DOM
        tutorialNavSlider();

    } catch (error) {
        console.error('Failed to fetch tutorials:', error);
    }
    
    // Inicialización de los sliders
    const tutorialThumbsSlider = new Swiper('.tutorial-thumbs-slider', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 15,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    
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
            swiper: tutorialThumbsSlider
        }
    });

    // Event listener para cargar el video en la modal al hacer clic en "WATCH NOW"
    document.addEventListener('click', function (event) {
        if (event.target.closest('.tutorial-single-slider__play')) {
            const button = event.target.closest('.tutorial-single-slider__play');
            const videoUrl = button.getAttribute('data-video-url');
            const videoElement = document.getElementById('videoElement');
            const videoSource = document.getElementById('videoSource');
            
            // Establecer el URL del video seleccionado en el elemento source
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
    });
};

export default tutorialNavSliderApi;
