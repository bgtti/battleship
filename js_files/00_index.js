import { DisplayBoard, DisplayOthers } from "./02_htmlDisplay.js";
import { CreatePlayer } from "./01_factory.js";
import { PositioningShips } from "./03_dragShips.js"
import { Game } from "./04_game.js"

//hiding other player's coordinates:
// function hidingCoords(player) { //accepts "p1" or "p2"
//     let playerCoords = document.querySelectorAll(`[data-${player}]`);
//     playerCoords.forEach(coord => coord.classList.add("hidden-coord"));
//     // playerCoords.classList.add("hidden-coord");
//     // console.log(playerCoords);
// }
//game type buttons:
let gameTypeHCBtn = document.querySelector('.gameTypeHC');
let gameTypeHHBtn = document.querySelector('.gameTypeHH');

//Type of game functions: set up game according to player type
function gameIsHC() {
    gameTypeHHBtn.classList.remove('game-type-btn-clicked');
    gameTypeHCBtn.classList.add('game-type-btn-clicked');
    DisplayBoard.createBoard("p1", "Human");
    DisplayBoard.createBoard("p2", "Computer");
    DisplayOthers.clearPositionBtns();
    Game.initiateGame("Human", "Computer");
    Game.resettingHTMLElements();
    // hidingCoords("p2");
    PositioningShips.activatingDragDropELs()
};
function gameIsHH() {
    gameTypeHCBtn.classList.remove('game-type-btn-clicked');
    gameTypeHHBtn.classList.add('game-type-btn-clicked');
    DisplayBoard.createBoard("p1", "Player 1");
    DisplayBoard.createBoard("p2", "Player 2");
    DisplayOthers.switchPlayerModal();
    DisplayOthers.positionShipBtns();
    Game.initiateGame("Human", "Human");
    Game.resettingHTMLElements();
    PositioningShips.activatingDragDropELs()
}

//Upon load: H vs C as default game:
gameIsHC();

//event listener that checks type of game (human vs computer or human vs human):

function changeGameType(btn) {
    DisplayBoard.resetBoard();
    if (btn === gameTypeHCBtn) {
        gameIsHC();
    } else if (btn === gameTypeHHBtn) {
        gameIsHH();
    }
}
gameTypeHCBtn.addEventListener('click', () => { changeGameType(gameTypeHCBtn) });
gameTypeHHBtn.addEventListener('click', () => { changeGameType(gameTypeHHBtn) });

//game started:

//Human vs Computer:
let gameStartBtn = document.querySelector(".startGameBtn");
// gameStartBtn.addEventListener('click', () => {
//     if (Game.checkIfGamePossible() === true) {
//         Game.startGame("HC") //get this information from the button
//         Game.setShipPosition("HC") //get this information from the button
//     }
// })
gameStartBtn.addEventListener('click', () => {
    Game.startGame();
})