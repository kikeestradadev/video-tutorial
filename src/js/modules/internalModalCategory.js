const internalModalCategory = () => {
    // Selecciona todos los ítems del slider de categoría
    const categorySliderItems = document.querySelectorAll('.tutorial-category-slider__item');

    // Selecciona los elementos del modal y del video
    const videoElement = document.getElementById('videoElement');
    const videoSource = document.getElementById('videoSource');
    const modal = document.getElementById('exampleModalToggle1');

    // Añade un event listener a cada ítem del slider de categoría
    categorySliderItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.getAttribute('data-video-url');

            if (videoUrl) {
                videoSource.src = videoUrl; // Actualiza la fuente del video
                videoElement.load(); // Recarga el video
                videoElement.muted = false; // Habilita el sonido
                videoElement.volume = 1.0; // Volumen máximo

                // Intenta reproducir el video y maneja posibles errores de autoplay
                videoElement.play().catch(error => {
                    console.warn('Autoplay con sonido bloqueado:', error);
                });
            }
        });
    });

    // Evento al cerrar el modal manualmente
    modal.addEventListener('hidden.bs.modal', () => {
        resetVideo(); // Limpia y reinicia el video
    });

    // Evento para detectar si el video sale de pantalla completa
    document.addEventListener('fullscreenchange', () => {
        const isFullScreen = document.fullscreenElement === videoElement;

        if (!isFullScreen) {
            resetVideo(); // Limpia y reinicia el video
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide(); // Cierra la modal
        }
    });

    // Función para limpiar y reiniciar el video
    const resetVideo = () => {
        videoElement.pause(); // Pausa el video
        videoElement.currentTime = 0; // Reinicia el tiempo del video
        videoSource.src = ''; // Limpia la fuente del video
    };
};

// Exportar la función para usarla en tu proyecto
export default internalModalCategory;
