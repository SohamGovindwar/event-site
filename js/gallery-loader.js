$(document).ready(function () {
  var $carousel = $('#gallery-carousel');
  if (!$carousel.length) return;

  function initGalleryCarousel(images) {
    if (!images || !images.length) {
      images = ['RS1.jpg', 'RS2.jpg', 'RS3.jpg', 'pic1.jpg'];
    }

    var displayImages = images.slice();
    if (displayImages.length > 1 && displayImages.length < 8) {
      displayImages = displayImages.concat(images);
      if (displayImages.length < 8) {
        displayImages = displayImages.concat(images);
      }
    }

    $carousel.empty();

    displayImages.forEach(function (img) {
      var imgPath = img.startsWith('images/') ? img : 'images/gallary/' + img;
      var slideHtml =
        '<div class="item">' +
          '<a href="' + imgPath + '" class="image-popup gallery-card-item" title="">' +
            '<img src="' + imgPath + '" alt="" loading="lazy" decoding="async">' +
          '</a>' +
        '</div>';
      $carousel.append(slideHtml);
    });

    if ($carousel.hasClass('owl-loaded')) {
      $carousel.trigger('destroy.owl.carousel').removeClass('owl-loaded');
    }

    $carousel.owlCarousel({
      items: 3,
      loop: true,
      margin: 16,
      nav: false,
      dots: false,
      /* Single source of truth for auto-advance — no competing setInterval */
      autoplay: true,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,
      /* Transition fully completes before next slide starts */
      autoplaySpeed: 800,
      smartSpeed: 800,
      fluidSpeed: false,
      dragEndSpeed: 300,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      freeDrag: false,
      /* Prevent layout reflow during slide */
      lazyLoad: false,
      rewind: false,
      responsive: {
        0:    { items: 1 },
        600:  { items: 2 },
        1000: { items: 3 }
      }
    });

    /* Lightbox — initialise once after carousel is ready */
    $carousel.on('initialized.owl.carousel refreshed.owl.carousel', function () {
      $('.gallery-carousel .image-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        removalDelay: 300,
        mainClass: 'mfp-fade',
        zoom: { enabled: false }
      });
    });
  }

  fetch('images/gallary/images.json')
    .then(function (res) {
      if (!res.ok) throw new Error('JSON not available');
      return res.json();
    })
    .then(function (images) {
      initGalleryCarousel(images);
    })
    .catch(function () {
      initGalleryCarousel([
        'VVKL4040.JPG',
        'VVKL4430.JPG',
        'VVKL4526.JPG',
        'VVKL4545.JPG',
        'VVKL4558.JPG',
        'VVKL4565.JPG',
        'VVKL4621.JPG',
        'VVKL4662.JPG'
      ]);
    });
});

