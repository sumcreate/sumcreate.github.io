//preload photos
function req(src) {
  new Image().src = src
}

$.each([1, 2, 3, 4], function(i, v) {
  req('./imgs/product' + v + '.jpg')
})

var lightbox;
$('#gallery').on('click', function() {
  if (!lightbox) {
    var options = new LightboxOptions();
    options.positionFromTop = 10;

    lightbox = new Lightbox(options);
  }

  lightbox.start($($('.example-image-link').get(0)))
})
