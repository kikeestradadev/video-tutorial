const tutorialCategorySlider = () => {
	document.addEventListener("DOMContentLoaded", function() {
		let tutorialCategorySliderItem = document.querySelector('.tutorial-category-slider'); 
		if (tutorialCategorySliderItem) {
			const tutorialCategorySlider = new Swiper('.tutorial-category-slider', {
				// Optional parameters
				direction: 'horizontal',
				loop: false,
				allowThresholdMove: true,
				slidesPerView: 'auto',
				spaceBetween: 0,
				spaceBetween: 7,
				a11y: {
                    enabled: true,
					slideLabelMessage:"Slide {{index}} of {{slidesLength}}",
                    slideRole: null, // Custom role for slide
                },			
				
			});
		}
	});
}
export default tutorialCategorySlider
