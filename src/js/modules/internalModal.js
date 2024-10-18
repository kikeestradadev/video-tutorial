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

            // Recarga el video y lo reproduce automáticamente al abrir el modal
            videoElement.load();
            videoElement.play();
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
