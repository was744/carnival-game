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
    totalScore();

    //Populate targets
    for (var i = 0; i < 3; i++) {
      $('.container').append(`<img class ='target' id = '${i}' src='assets/target.png'>`);
    }

    // HIT-event -
    //----must be in createGame() -> scope issue?
    $('.target').on('click', function() {
      console.log('target hit');
      score = score + 250;
      totalScore();
    });


  } //END createGame()


  function totalScore() {
    $('#score span').text(score);
  };


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
  }; //end clock function

})();
