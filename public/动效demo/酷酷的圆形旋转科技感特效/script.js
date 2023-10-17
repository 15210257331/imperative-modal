$('.movement a').on('click', function() {
  var type = $(this).data('type');
  $('#hud').removeClass().addClass(type);
  
  return false;
});