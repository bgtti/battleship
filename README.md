# battleship

Live preview: https://bgtti.github.io/battleship/

This is a battleship game the user can play against a computer or another human.
It was written in HTML, CSS, and vanilla JavaScript, and uses Jest for testing.

![BattleShipPreview](/images/BattleShip_Preview.png)

File structure:

00_index.js:
contains event listener for the type of game buttons, and allows for the change of game type.
The game can be of type Human vs Human ("HH") or Human vs Computer ("HC").
Upon load, it will start a HC game by default.

01_factory.js:
contains the factory function CreatePlayer, which creates the player's board, which in turn creates the player's ships. 4 ships of different lengths are created per player.

02_htmlDisplay.js:
displays the player's boards on the screen.

03_dragShips.js:
responsible for the drag and drop logic (ship positioning of players of type 'human').
the information about ship positioning is then sent to game.js.
note this project uses Bernardo-Castilho's dragdroptouch polyfill to handle mobile drag and drop.

04_game.js:
responsible for the game loop. Uses values from the objects in factory.js and their methods.
takes the ship position from dragShips and creates players, board, and ships using factory.js.

05_explosionAnimation.js:
adds a short explosion animation to hit coordinates, and an X to indicate the coordinate was hit. Ships are displayed when sunk.

06_displayMessages.js:
contains the statements displayed as paragraphs in the game loop.

index.css:
media queries for 2 screen sizes: 350px and 600px;

Step-by-step:
Game type: Human vs Computer ("HC") - the default game

1. index.js will use the function gameIsHC() to call htmlDisplay.js to create 2 boards, and dragShips.js to enable ship drag and drop. It also calls game.js' initiateGame function which calls factory.js to create the player objects.

2. When Human positions all his/her ships, dragShips.js will enable the 'start game' button to be clicked using checkIfAllShipsPositioned, which is called at every ship drop on the board. dragShips.js stores ships by number (1-4), and the dropped coordinate of each.

3. When the 'Start Game' button is clicked, game.js will: A)pull the positioned ships's coordinates and store them in the player's board's ship object. B)position the computer's ships. C) allow the Human to shoot at a coordinate of the Computer's board.

The game will then enter a loop until gameOver is declared.

About:
This project was created as part of The Odin Project.
More information about the project assignment: https://www.theodinproject.com/lessons/node-path-javascript-battleship

How to improve this game:
the drag and drop could be optimized: A) positioning the drag object relative to the cursor (so the ship's edge is at the cursor's position independent of where it was picked up); B) the coloring on the divs on dragover account for the presence of the already positioned ships.
