import { DisplayBoard } from "./02_htmlDisplay.js";
import { CreatePlayer } from "./01_factory.js";
import { PositioningShips } from "./03_dragShips.js"
import { Game } from "./04_game.js"

//Pre-game start settings: 
//event listener that checks type of game (human vs computer or human vs human):
let gameTypeHCBtn = document.querySelector('.gameTypeHC');
let gameTypeHHBtn = document.querySelector('.gameTypeHH');

function changeGameType(btn) {
    DisplayBoard.resetBoard();
    if (btn === gameTypeHCBtn) {
        gameTypeHHBtn.classList.remove('game-type-btn-clicked');
        gameTypeHCBtn.classList.add('game-type-btn-clicked');
        DisplayBoard.createBoard("p1", "Human");
        DisplayBoard.createBoard("p2", "Computer");
        Game.startGame("Human", "Computer");
    } else if (btn === gameTypeHHBtn) {
        gameTypeHCBtn.classList.remove('game-type-btn-clicked');
        gameTypeHHBtn.classList.add('game-type-btn-clicked');
        DisplayBoard.createBoard("p1", "Player 1");
        DisplayBoard.createBoard("p2", "Player 2");
        Game.startGame("Human", "Human");
    }
    PositioningShips.activatingDragDropELs();
}
gameTypeHCBtn.addEventListener('click', () => { changeGameType(gameTypeHCBtn) });
gameTypeHHBtn.addEventListener('click', () => { changeGameType(gameTypeHHBtn) });

//game started:

//the start game button should have a dataSet indicating the type of game!!
let gameStartBtn = document.querySelector(".startGameBtn");
gameStartBtn.addEventListener('click', () => {
    if (Game.checkIfGamePossible() === true) {
        Game.startGame("HC") //get this information from the button
        Game.setShipPosition("HC") //get this information from the button
    }
})
