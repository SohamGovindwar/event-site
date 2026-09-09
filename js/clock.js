$(document).ready(function () {
  var clock;
  var currentDate = new Date();
  var targetDate = moment.tz('2026-12-19 12:00', 'Asia/Kolkata');
  var diff = targetDate / 1000 - currentDate.getTime() / 1000;

  if (diff <= 0) {
    clock = $('.clock').FlipClock(0, {
      clockFace: 'DailyCounter',
      countdown: true,
      autostart: false
    });
  } else {
    clock = $('.clock').FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true
    });

    function checktime() {
      if (clock.getTime() <= 0) {
        clock.setTime(0);
      }
      setTimeout(checktime, 1000);
    }
    setTimeout(checktime, 1000);
  }
});
