# battleship

How the game is structured:
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

Step-by-step:
Game type: Human vs Computer ("HC"), default

1. index.js will use the function gameIsHC() to call htmlDisplay.js to create 2 boards, and dragShips.js to enable ship drag and drop. It also calls game.js' initiateGame function which calls factory.js to create the player objects.

2. When Human positions all his/her ships, dragShips.js will enable the 'start game' button to be clicked using checkIfAllShipsPositioned, which is called at every ship drop on the board. dragShips.js stores ships by number (1-4), and the dropped coordinate of each.

3. When the 'Start Game' button is clicked, game.js will: A)pull the positioned ships's coordinates and store them in the player's board's ship object. B)position the computer's ships. C) allow the Human to shoot at a coordinate of the Computer's board.
