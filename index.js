(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _internalModule = _interopRequireDefault(require("./modules/internalModule"));
var _tutorialNavSlider = _interopRequireDefault(require("./modules/tutorialNavSlider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(function () {
  (0, _internalModule["default"])();
  (0, _tutorialNavSlider["default"])();
})();

},{"./modules/internalModule":2,"./modules/tutorialNavSlider":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var internalModule = function internalModule() {
  console.log('Hola internal Module');
};
var _default = exports["default"] = internalModule;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var tutorialNavSlider = function tutorialNavSlider() {
  document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar los elementos de ambos sliders
    var singleSliderElement = document.querySelector('.tutorial-single-slider');
    var thumbsSliderElement = document.querySelector('.tutorial-thumbs-slider');

    // Validar que ambos sliders existan
    if (!singleSliderElement || !thumbsSliderElement) return;

    // Inicializar el slider de thumbnails
    var tutorialThumbsSlider = new Swiper('.tutorial-thumbs-slider', {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 7,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      a11y: {
        enabled: true,
        slideLabelMessage: "Slide {{index}} of {{slidesLength}}",
        slideRole: null // Custom role for slide
      }
    });

    // Inicializar el slider principal sin permitir swipe manual
    var tutorialSingleSlider = new Swiper('.tutorial-single-slider', {
      effect: 'fade',
      speed: 800,
      autoHeight: true,
      fadeEffect: {
        crossFade: true
      },
      watchOverflow: true,
      allowTouchMove: false,
      // Desactiva swipe manual
      thumbs: {
        swiper: tutorialThumbsSlider // Conectar ambos sliders
      },
      a11y: {
        enabled: true,
        slideLabelMessage: "Slide {{index}} of {{slidesLength}}",
        slideRole: null
      }
    });

    // Agregar funcionalidad de selección a los thumbnails
    var thumbsSlides = document.querySelectorAll('.tutorial-thumbs-slider__item');
    thumbsSlides.forEach(function (slide) {
      slide.addEventListener('click', function () {
        // Remover la clase 'selected' de todos los items
        thumbsSlides.forEach(function (s) {
          return s.classList.remove('selected');
        });

        // Agregar la clase 'selected' al item clicado
        this.classList.add('selected');
      });
    });
  });
};
var _default = exports["default"] = tutorialNavSlider;

},{}]},{},[1]);

//# sourceMappingURL=index.js.map
