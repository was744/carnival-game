(function() {
  console.log('Ready to play');
  $("#hello").get(0).play();

  var score = 0;
  var miss = 200;
  var speed = '8s';
  var bullseye = 'assets/target.png';
  var background = 'assets/game.jpg';
  var timer;
  var secs = 60;


  $('.start img').on('click', function() {
    console.log('start clicked');
    $('html').css('background-image', `url(${background})`);
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
      $('#fire').get(0).play();
      if ($target.is('img')) {
        score = score + 250;
        console.log('target hit');
        $target.attr('src', 'assets/hit.png');
        $target.delay(300).fadeOut();

        setTimeout(() => {
          $target.attr('src', `${bullseye}`);
          $target.show(0);
        }, 2500)
      } else {
        score = score - miss;
        console.log('not a target');
      }

      scoreKeeper();
    }); // End Click
  } //END createGame()


  function scoreKeeper() {
    $('#score span').text('Score: ' + score);
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
      case (score >= 1000 && score < 2000):
        console.log('level 3');
        $('#t0').css('position', 'absolute');
        $('#t0').css('animation-name', 'faded');
        $('#t2').css('position', 'absolute');
        $('#t2').css('animation-name', 'lvl_3');
        miss = 400;
        updateGame();
        break;
      case (score >= 2000 && score <= 3000):
        console.log('lvl-4: Nelly');
        background = 'assets/duckhunt.png';
        bullseye = 'assets/duck.png';
        $('img').css('max-height', '5em');
        speed = '5s';
        miss = 800;
        updateGame();
        break;
      default:
    }
  }; //End scoreKeeper

  //Changes target img and speed according according to lvl
  function updateGame() {
    console.log(speed);
    for (var i = 0; i < 3; i++) {
      //target img
      $(`t${i}`).attr('src', `${bullseye}`);
      //speed
      $(`#t${i}`).css('animation-duration', `${speed}`);
      //background
      $('html').css('background-image', `url('${background}')`);
    }
  }; //end updateGame

  //Pause function.   p = pause  anyother = resume
  //Add condition to be sure not in start menu
  $(document).on('keypress', function(e) {
    if (e.which == 112) {
      console.log('Pause');
      clearInterval(timer);
      $('.container').hide();
      $('.pause').show();
    } else {
      $('.pause').hide();
      clock();
      $('.container').show();
    }
  });//End Pause

  //Playtime
  function clock() {

    timer = setInterval(function() {
      secs--
      if (secs == 00) {
        clearInterval(timer);
        alert(`Time Up!

            Your Score = ${score}

            Click to play again`)
        location.reload();
      } else if (secs < 10) {
        secs = "0" + secs;
      }
      $('#timer').text(`Time: ` + secs)
    }, 1000)
  }; //end clock function

})();
