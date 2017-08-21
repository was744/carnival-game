(function() {
  console.log('Ready to play');
  var score = 100;


  $('.start img').on('click', function() {
    console.log('start clicked');
    $('html').css('background-image', `url('assets/game.jpg')`);
    $('.welcome').hide();
    createGame();
  })

  function createGame() {
    clock();
    $('#score span').text(score);

    for (var i = 0; i < 3; i++) {
      $('.container').append(`<img id ='target', '${i}' src='assets/target.png'>`);
    }
  } //END play()

  $('#target').on('click', function() {
    console.log('target hit');
  });



  //Playtime
  function clock() {
    var secs = 0;
    var mins = 0;

    timer = setInterval(function() {
      secs++
      if (secs < 10) {
        secs = "0" + secs
      } else if (secs == 60) {
        secs = "00"
        mins++
        if (mins < 10) {
          mins = "0" + mins
        }
      }
      $('#timer').text(mins + ":" + secs)
    }, 1000);
  };
  //end playtime

})();
