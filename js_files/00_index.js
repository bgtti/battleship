import { DisplayBoard, DisplayOthers } from "./02_htmlDisplay.js";
import { PositioningShips } from "./03_dragShips.js"
import { Game } from "./04_game.js"

//IN THIS FILE: change of game type (Human vs Computer or Human vs Human)

//game type buttons:
const gameTypeHCBtn = document.querySelector('.gameTypeHC');
const gameTypeHHBtn = document.querySelector('.gameTypeHH');
const playAgainBtn = document.querySelector(".playAgainBtn");

//Type of game functions: set up game according to player type
function allGameTypes() {
    Game.resettingHTMLElements();
    PositioningShips.activatingDragDropELs()
    playAgainBtn.classList.add("hide");
}
function gameIsHC() {
    gameTypeHHBtn.classList.remove('game-type-btn-clicked');
    gameTypeHCBtn.classList.add('game-type-btn-clicked');
    playAgainBtn.classList.add("playAgainHC");
    playAgainBtn.classList.remove("playAgainHH");
    DisplayBoard.createBoard("p1", "Human");
    DisplayBoard.createBoard("p2", "Computer");
    DisplayOthers.clearPositionBtns();
    Game.initiateGame("Human", "Computer");
    allGameTypes();
};
function gameIsHH() {
    gameTypeHCBtn.classList.remove('game-type-btn-clicked');
    gameTypeHHBtn.classList.add('game-type-btn-clicked');
    playAgainBtn.classList.remove("playAgainHC");
    playAgainBtn.classList.add("playAgainHH");
    DisplayBoard.createBoard("p1", "Player 1");
    DisplayBoard.createBoard("p2", "Player 2");
    DisplayOthers.switchPlayerModal();
    DisplayOthers.positionShipBtns();
    Game.initiateGame("Human", "Human");
    allGameTypes();
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

function playAgain() {
    DisplayBoard.resetBoard()
    if (playAgainBtn.classList.contains("playAgainHC")) {
        gameIsHC();
    } else if (playAgainBtn.classList.contains("playAgainHH")) {
        gameIsHH();
    }
}
playAgainBtn.addEventListener('click', () => { playAgain() });