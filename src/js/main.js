import $ from 'jquery';
import '../scss/main.scss';
import '../index.html';
import '../../node_modules/focus-visible/dist/focus-visible';
import menu from './components/menu';
import 'owl.carousel';

$(function () {
  menu();

  $(document).ready(function () {
    $('.owl-carousel').owlCarousel({
      // center: true,
      margin: 10,
      loop: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        600: {
          items: 2,
          nav: true,
        },
        1000: {
          items: 3,
          nav: true,
          loop: false,
        },
      },
    });
  });
});
