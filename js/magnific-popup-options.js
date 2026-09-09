$(document).ready(function () {
  $('.popup-vimeo').magnificPopup({
    type: 'inline',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true,
    callbacks: {
      open: function () {
        var video = $('#wedding-video-modal video')[0];
        if (video) {
          video.currentTime = 0;
          video.play().catch(function () {});
        }
      },
      close: function () {
        var video = $('#wedding-video-modal video')[0];
        if (video) video.pause();
      }
    }
  });
});