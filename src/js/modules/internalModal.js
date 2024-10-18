const internalModal = () => {
    // Selecciona todos los botones de play que abren el modal
    const playButtons = document.querySelectorAll('.tutorial-single-slider__play');

    // Selecciona los elementos del modal que cambiarán
    const videoElement = document.getElementById('videoElement');
    const videoSource = document.getElementById('videoSource');

    // Añade un event listener a cada botón de play
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtén la URL del video desde el atributo data-video-url
            const videoUrl = button.getAttribute('data-video-url');

            // Actualiza la fuente del video en el modal
            videoSource.src = videoUrl;

            // Espera a que la fuente se cargue y reproduce con sonido
            videoElement.load();
            videoElement.muted = false; // Asegúrate de desactivar el mute
            videoElement.volume = 1.0;  // Volumen al máximo

            // Intentar reproducir el video automáticamente con sonido
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Autoplay con sonido bloqueado por el navegador:', error);
                    videoElement.muted = true; // Activa mute si hay error
                });
            }
        });
    });

    // Limpia y reinicia el video cuando se cierra el modal
    const modal = document.getElementById('exampleModalToggle1');
    modal.addEventListener('hidden.bs.modal', () => {
        videoElement.pause(); // Pausa el video
        videoElement.currentTime = 0; // Reinicia el tiempo del video
        videoSource.src = ''; // Limpia la fuente del video
    });
};

// Exportar la función
export default internalModal;
