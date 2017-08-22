(function() {
  console.log('Ready to play');
  var score = 0;
  var speed = '8s';
  var bullseye = 'assets/target.png';


  $('.start img').on('click', function() {
    console.log('start clicked');
    $('html').css('background-image', `url('assets/game.jpg')`);
    $('.welcome').hide();
    createGame();
  })

  function createGame() {
    clock();
    scoreKeeper();

    //Build game
    for (var i = 0; i < 3; i++) {
      $('.container').append(`
        <div class = 'target'>
        <img id = 't${i}' src=${bullseye}>
        </div>`);
      //Start animation
      $(`#t${i}`).css({
        'position': 'relative',
        'animation-name': 'leftRight',
        'animation-duration': `${speed}`,
        'animation-iteration-count': 'infinite'
      })
    }

    // HIT-event -
    //----must be in createGame() -> scope issue?
    $('html').on('click', function(e) {
      var $target = $(e.target);
      if ($target.is('img')) {
        score = score + 250;
        console.log('target hit');
        $target.attr('src', 'assets/hit.png');
        $target.delay(750).fadeOut();

        setTimeout(() => {
          $target.attr('src', `${bullseye}`);
          $target.show(0);
        }, 2500)
      } else {
        score = score - 100;
        console.log('not a target');
      }

      scoreKeeper();
    }); // End Click
  } //END createGame()


  function scoreKeeper() {
    $('#score span').text(score);
    //Not intended purpose for switch, possibly change to if else statements???
    switch (true) {
      case (score < 0):
        console.log('LOSER');
        $('.container').hide();
        alert(`YOU LOSE

          Click to play again`);
        location.reload();
        break;
      case (score >= 500 && score < 1000):
        console.log('Level 2');
        $('#t1').css('position', 'absolute');
        $('#t1').css('animation-name', 'lvl_2');
        break;
      case (score >= 1000):
        console.log('level 3');
        $('#t0').css('position', 'absolute');
        $('#t0').css('animation-name', 'faded');
        $('#t2').css('position', 'absolute');
        $('#t2').css('animation-name', 'lvl_3');
        speed = '5s';
        updateTarget();
        break;
      default:
    }
  }; //End scoreKeeper

  //Changes target img and speed according according to lvl
  function updateTarget() {
    console.log(speed);
    for (var i = 0; i < 3; i++) {
      //target img
      $(`t${i}`).attr('src', `${bullseye}`);
      //speed
      $(`#t${i}`).css('animation-duration', `${speed}`);
    }
  }; //end updateTarget

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
