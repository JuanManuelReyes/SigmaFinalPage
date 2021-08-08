// Smooth
(function () {
  var parallax = document.querySelectorAll("body"),
    speed = 0.2;

  window.onscroll = function () {
    [].slice.call(parallax).forEach(function (el, i) {
      var windowYOffset = window.pageYOffset,
        elBackgrounPos = "50% " + windowYOffset * speed + "px";

      el.style.backgroundPosition = elBackgrounPos;
    });
  };
})();

// Carrusel
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplaySpeed: 3000,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});
