// Responsive Button
$(".menu-btn").click(function () {
  $(this).toggleClass("fa-times");
  $(".headerNav-ul").toggleClass("active");
});

$(".boton-off").click(function () {
  $(this).toggleClass("boton");
});
