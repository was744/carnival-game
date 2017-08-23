CARNIVAL STYLE SHOOTING GALLERY

This application is built using HTML, CSS and jquery. A Google Font is used to give a carnival feel.
Use cases, workflow and wireframes can be found on Trello @: https://trello.com/b/FekhhvdO/unit-1-project

-PROCESS--------------

The first step was to determine a style for the game. Originally, my idea was to create a duck-hunt style arcade game, but after some preliminary research I found them to be common and boring. Instead, I chose to mimic a carnival style atmosphere with increasing difficulty.

After the first 500 points, and then on every 1000, the player 'levels up', which results in the game properties changing. Common changes include target speed, target appearance, animation, and background-image. Ideally, levels become increasingly difficult.

Each level was individually built and tested. Utilizing a switch statement to handle levels based off user score makes level management fast and easy, also allowing for simple addition of new levels.

User can pause the game by pressing 'p' and resume by pressing any other. This menu was slightly more difficult to create than I thought it would be. Two of the biggest bugs I encountered resulted from the creation of the pause menu; 1) a timer issue that would accelerate the clock & 2) user clicking would record a miss (-pts) no matter what screen user was on.


-RULES---------------

You have 1 minute to score as many points as you can
Hit the targets by clicking on them
Points are awarded for each hit
Each miss deducts points
Miss too much and you lose
Targets get harder to hit the more you score.


-ISSUES--------------
1) Clock accelerates on any keypress other than 'p'


-FUTURE FEATURES---------

~HighScores board
~Allow users to define game speed
~User defined timer
