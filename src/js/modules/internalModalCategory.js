const internalModalCategory = () => {
    // Selecciona todos los ítems del slider de categoría
    const categorySliderItems = document.querySelectorAll('.tutorial-category-slider__item');

    // Selecciona los elementos del modal que cambiarán
    const videoElement = document.getElementById('videoElement');
    const videoSource = document.getElementById('videoSource');

    // Añade un event listener a cada ítem del slider de categoría
    categorySliderItems.forEach(item => {
        item.addEventListener('click', () => {
            // Obtén la URL del video desde el atributo data-video-url
            const videoUrl = item.getAttribute('data-video-url');

            if (videoUrl) {
                // Actualiza la fuente del video en el modal
                videoSource.src = videoUrl;

                // Recarga el video y lo reproduce automáticamente con sonido
                videoElement.load();
                videoElement.muted = false; // Asegúrate de que el audio esté activado
                videoElement.volume = 1.0; // Volumen al máximo
                videoElement.play().catch(error => {
                    console.warn('Autoplay con sonido bloqueado:', error);
                });
            }
        });
    });

    // Limpia el video cuando se cierra el modal
    const modal = document.getElementById('exampleModalToggle1');
    modal.addEventListener('hidden.bs.modal', () => {
        videoElement.pause(); // Pausa el video
        videoElement.currentTime = 0; // Reinicia el tiempo del video
        videoSource.src = ''; // Limpia la fuente del video
    });
};

// Exportar la función para usarla en tu proyecto
export default internalModalCategory;
