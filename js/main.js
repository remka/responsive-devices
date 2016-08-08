var isPlaying = false;
var animeId;
var currentStep = 0;
var counterTick = 0;
var ticksPerStep = 100; // step duration
var devicesArray = [
  'desktop',
  'laptop',
  'tablet',
  'phone',
  'watch',
  'tv'
];

var switchDevice = function(deviceType) {
  $('#container').removeClass();
  $('#container').addClass(deviceType);
};

var switchNav = function(index) {
  $('#nav a').removeClass('current');
  $('#nav a:eq(' + index + ')').addClass('current');
};

var tick = function() {

  var maxLength = devicesArray.length - 1;

  if (counterTick < ticksPerStep) {
    counterTick += 1;
  } else {
    counterTick = 0;
    if (currentStep < maxLength) {
      currentStep += 1;
    } else {
      currentStep = 0;
    }
    switchDevice(devicesArray[currentStep]);
    switchNav(currentStep);
  }
  //console.log(counterTick + '|' + currentStep);
  animeId = requestAnimationFrame(tick);
};

$(function() {

  $('.switchDevice').click(function(e) {
    if (isPlaying == false) {
      var deviceType = $(this).data('device');
      switchDevice(deviceType);
      $('.switchDevice').removeClass('current');
      $(this).addClass('current');
      currentStep = $(this).index();
    }
    e.preventDefault();
  });

  $('#toggle-autoplay').click(function(e) {
    if (isPlaying) {
      isPlaying = false;
      $(this).html('<i class="material-icons md-36">play_circle_filled</i>');
      $(this).attr('title', 'Play');
      $('#nav').removeClass('inactive');
      cancelAnimationFrame(animeId);
    } else {
      isPlaying = true;
      $(this).html('<i class="material-icons md-36">pause_circle_filled</i>');
      $(this).attr('title', 'Pause');
      $('#nav').addClass('inactive');
      counterTick = 0;
      animeId = requestAnimationFrame(tick);
    }
    e.preventDefault();
  });

});
