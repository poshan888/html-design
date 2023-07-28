$(document).ready(function() {
  AOS.init();
  $(".navbar-toggler").on('click', function() {
    $("#asidePanel").toggleClass('remove-panel');
  });
});