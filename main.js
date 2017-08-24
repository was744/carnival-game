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

  //***SART CLICKED****///
  $('.start img').on('click', function() {
    console.log('start clicked');
    $('html').css('background-image', `url(${background})`);
    $('.welcome').hide();
    createGame();
  })

  function createGame() {
    clock();
    //Builds targets
    for (var i = 0; i < 3; i++) {
      $('.container').append(`
        <div class = 'target'>
        <img id = 't${i}' src=${bullseye}>
        </div>`);
      //Lvl-1 animation//
      $(`#t${i}`).css({
        'position': 'relative',
        'animation-name': 'leftRight',
        'animation-duration': `${speed}`,
        'animation-iteration-count': 'infinite'
      })
    }

    // HIT CHECKER
    //If click is on target img -> add points
    //If not, checks if pause menu is open
    //If !hit on target && pause menu !open -> record miss
    $('html').on('click', function(e) {
      var $target = $(e.target);
      $('#fire').get(0).play(); //Fire sound

      if ($target.is('img')) {
        score = score + 250;
        console.log('HIT');
        $target.attr('src', 'assets/hit.png');
        $target.delay(300).fadeOut();

        setTimeout(() => {
          $target.attr('src', `${bullseye}`);
          $target.show(0);
        }, 2500)
      } else if ($('.pause').is(':visible')) {
        console.log('Game is paused');
      } else {
        //Lose points
        score = score - miss;
        console.log('MISS');
      }

      scoreKeeper();
    }); // End Click
  } //END createGame()


  //Creates all levels > lvl-1 as defined by score. Called every click().
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
        break;
      case (score >= 2000 && score < 3000):
        console.log('lvl-4: ducks');
        background = 'assets/duckhunt.png';
        bullseye = 'assets/duck.png';
        $('img').css('max-height', '5em');
        speed = '5s';
        miss = 800;
        break;
      case (score >= 3000 && score < 4000):
        console.log('lvl-5 hypnosis');
        background = 'assets/hypnosis.gif';
        speed = '5s';
        bullseye = 'assets/Hypnosis-Circle.png';
        $('#t0').css('animation-name', 'lvl-5');
        $('#t2').css('animation-name', 'rotation');
        $('.container').css('color', 'white');
        break;
      case (score >= 4000 && score < 5000):
        console.log('lvl-6');
        bullseye = 'assets/portal.png';
        background = 'assets/rm.jpg';
        $('img').css('max-height', '7em');
        $('#t0').css('animation-name', 'rightLeft');
        $('#t1').css('animation-name', 'faded');
        break;
      case (score >= 5000 && score < 6000):
        console.log('lvl-7');
        background = 'assets/bikini-bottom.jpg';
        bullseye = 'assets/jelly.png';
        speed = '3s';
        break;
      case (score >= 6000):
        console.log('lvl-8');
        background = 'assets/ocean.jpg';
        bullseye = 'assets/shark.png';
        break;
      default:
        //Should only run on game build and while paused
    }
    updateGame();
  }; //End scoreKeeper

  //Changes target img , speed & background-image.
  //Values set and function called in scoreKeeper();
  function updateGame() {
    for (var i = 0; i < 3; i++) {
      //target img
      $(`t${i}`).attr('src', `${bullseye}`);
      //speed
      $(`#t${i}`).css('animation-duration', `${speed}`);
      //background
      $('html').css('background-image', `url('${background}')`);
    }
  }; //end updateGame

  //**********/PAUSE MENU//////////////////
  //p = pause  anyother = resume
  //Add condition to be sure not in start menu
  //else if resolves issue when clock accelerated on multiple keypress
  $(document).on('keypress', function(e) {
    if (e.which == 112) {
      console.log('Pause');
      clearInterval(timer);
      $('.container').hide();
      $('.pause').show();
    } else if ($('.pause').is(':visible')) {
      $('.pause').hide();
      clock();
      $('.container').show();
    } else {
      console.log('nothing happens');
    }
  }); //End Pause

  //*****GAME TIMER*****///////
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
