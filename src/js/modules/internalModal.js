const internalModal = () => {
    // Selecciona todos los botones de play que abren el modal
    const playButtons = document.querySelectorAll('.tutorial-single-slider__play');

    // Selecciona los elementos del modal y del video
    const videoElement = document.getElementById('videoElement');
    const videoSource = document.getElementById('videoSource');
    const modal = document.getElementById('exampleModalToggle1');

    // Añade un event listener a cada botón de play
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoUrl = button.getAttribute('data-video-url'); // Obtiene la URL del video
            videoSource.src = videoUrl; // Actualiza la fuente del video
            videoElement.load(); // Recarga el video
            videoElement.play(); // Reproduce el video automáticamente
        });
    });

    // Evento al cerrar el modal manualmente
    modal.addEventListener('hidden.bs.modal', () => {
        resetVideo(); // Limpia y reinicia el video
    });

    // Evento al salir de pantalla completa
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

// Exportar la función
export default internalModal;
