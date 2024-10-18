const internalModalCategory = () => {
    const player = videojs('videoElement', { controls: true, autoplay: false, loop: true, muted: false });

    const categorySliderItems = document.querySelectorAll('.tutorial-category-slider__item');
    const modal = document.getElementById('exampleModalToggle1');

    categorySliderItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.getAttribute('data-video-url');
            if (videoUrl) {
                player.src({ src: videoUrl, type: 'video/mp4' });
                player.muted(false);
                player.volume(1.0);
                player.play().catch(error => {
                    console.warn('Autoplay con sonido bloqueado:', error);
                });
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

export default internalModalCategory;
