$(document).ready(function () {
  var clock;
  var targetTimestamp = new Date('2026-12-19T12:00:00+05:30').getTime();
  var diff = Math.floor((targetTimestamp - Date.now()) / 1000);

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
  }
});
