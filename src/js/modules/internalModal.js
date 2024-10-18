const internalModal = () => {
    // Inicializa el reproductor con video.js
    const player = videojs('videoElement', { controls: false, autoplay: true, loop: true, muted: false });

    const playButtons = document.querySelectorAll('.tutorial-single-slider__play');
    const modal = document.getElementById('exampleModalToggle1');

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoUrl = button.getAttribute('data-video-url');
            if (videoUrl) {
                player.src({ src: videoUrl, type: 'video/mp4' });
                player.play();
            }
        });
    });

    modal.addEventListener('hidden.bs.modal', () => {
        resetVideo();
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            resetVideo();
            bootstrap.Modal.getInstance(modal).hide();
        }
    });

    const resetVideo = () => {
        player.pause();
        player.currentTime(0);
        player.src(''); 
        player.controls(false); // Oculta los controles
    };
};

export default internalModal;
