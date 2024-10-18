(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _internalModule = _interopRequireDefault(require("./modules/internalModule"));
var _tutorialNavSlider = _interopRequireDefault(require("./modules/tutorialNavSlider"));
var _tutorialCategorySlider = _interopRequireDefault(require("./modules/tutorialCategorySlider"));
var _internalModal = _interopRequireDefault(require("./modules/internalModal"));
var _internalModalCategory = _interopRequireDefault(require("./modules/internalModalCategory"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(function () {
  (0, _internalModule["default"])();
  (0, _tutorialNavSlider["default"])();
  (0, _tutorialCategorySlider["default"])();
  (0, _internalModal["default"])();
  (0, _internalModalCategory["default"])();
})();

},{"./modules/internalModal":2,"./modules/internalModalCategory":3,"./modules/internalModule":4,"./modules/tutorialCategorySlider":5,"./modules/tutorialNavSlider":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var internalModal = function internalModal() {
  // Inicializa el reproductor con video.js
  var player = videojs('videoElement', {
    controls: false,
    autoplay: true,
    loop: true,
    muted: false
  });
  var playButtons = document.querySelectorAll('.tutorial-single-slider__play');
  var modal = document.getElementById('exampleModalToggle1');
  playButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var videoUrl = button.getAttribute('data-video-url');
      if (videoUrl) {
        player.src({
          src: videoUrl,
          type: 'video/mp4'
        });
        player.play();
      }
    });
  });
  modal.addEventListener('hidden.bs.modal', function () {
    resetVideo();
  });
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      resetVideo();
      bootstrap.Modal.getInstance(modal).hide();
    }
  });
  var resetVideo = function resetVideo() {
    player.pause();
    player.currentTime(0);
    player.src('');
    player.controls(false); // Oculta los controles
  };
};
var _default = exports["default"] = internalModal;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var internalModalCategory = function internalModalCategory() {
  var player = videojs('videoElement', {
    controls: true,
    autoplay: false,
    loop: true,
    muted: false
  });
  var categorySliderItems = document.querySelectorAll('.tutorial-category-slider__item');
  var modal = document.getElementById('exampleModalToggle1');
  categorySliderItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var videoUrl = item.getAttribute('data-video-url');
      if (videoUrl) {
        player.src({
          src: videoUrl,
          type: 'video/mp4'
        });
        player.muted(false);
        player.volume(1.0);
        player.play()["catch"](function (error) {
          console.warn('Autoplay con sonido bloqueado:', error);
        });
      }
    });
  });
  modal.addEventListener('hidden.bs.modal', function () {
    resetVideo();
  });
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      resetVideo();
      bootstrap.Modal.getInstance(modal).hide();
    }
  });
  var resetVideo = function resetVideo() {
    player.pause();
    player.currentTime(0);
    player.src('');
    player.controls(false); // Oculta los controles
  };
};
var _default = exports["default"] = internalModalCategory;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var internalModule = function internalModule() {
  console.log('Hola internal Module');
};
var _default = exports["default"] = internalModule;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var tutorialCategorySlider = function tutorialCategorySlider() {
  document.addEventListener("DOMContentLoaded", function () {
    var tutorialCategorySliderItem = document.querySelector('.tutorial-category-slider');
    if (tutorialCategorySliderItem) {
      var _tutorialCategorySlider = new Swiper('.tutorial-category-slider', _defineProperty(_defineProperty({
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        allowThresholdMove: true,
        slidesPerView: 'auto',
        spaceBetween: 0
      }, "spaceBetween", 7), "a11y", {
        enabled: true,
        slideLabelMessage: "Slide {{index}} of {{slidesLength}}",
        slideRole: null // Custom role for slide
      }));
    }
  });
};
var _default = exports["default"] = tutorialCategorySlider;

},{}],6:[function(require,module,exports){
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
      spaceBetween: 15,
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
  });
};
var _default = exports["default"] = tutorialNavSlider;

},{}]},{},[1]);

//# sourceMappingURL=index.js.map
