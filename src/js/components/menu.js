import $ from 'jquery';

const menu = () => {
  $('.burger').on('click', function () {
    $('.header').toggleClass('open-menu');
    $('.body').css('overflow', function (_, value) {
      return value === 'hidden' ? 'initial' : 'hidden';
    });
    imgsrc('.header__logo img');
  });

  $('.nav__item').on('click', function () {
    $('.body').css('overflow', 'initial');
    $('.header').removeClass('open-menu');
    imgsrc('.header__logo img');
  });
};

function imgsrc(img) {
  if ($(img).attr('src') == './img/logo.svg')
    $(img).attr('src', './img/logo-dark.svg');
  else $(img).attr('src', './img/logo.svg');
}

export default menu;
