import '../scss/main.scss';
import '../index.html';
import '../../node_modules/focus-visible/dist/focus-visible';
import '../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css';
import '../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css';
import menu from './components/menu';
import 'owl.carousel';

$(function () {
  menu();

  $(document).ready(function () {
    $('.owl-carousel').owlCarousel({
      // center: true,
      loop: true,
      responsiveClass: true,
      dots: true,
      dotsEach: true,
      responsive: {
        0: {
          margin: 16,
          items: 1,
          autoHeight: true,
        },
        768: {
          items: 2,
          margin: 24,
        },
        1280: {
          items: 3,
          nav: true,
          margin: 32,
          controlsClass: true,
        },
      },
    });
  });
});
