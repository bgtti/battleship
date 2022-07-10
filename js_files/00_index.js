import { DisplayBoard } from "./02_htmlDisplay.js";
import { CreatePlayer } from "./01_factory.js";

//Pre-game start settings: 

//drawing boards
DisplayBoard.createBoard("p1", "Human");
DisplayBoard.createBoard("p2", "Computer");

//creating players
let player1 = CreatePlayer("Human");
let player2 = CreatePlayer("Computer");

//event listener that checks type of player
let gameTypeHCBtn = document.querySelector('.gameTypeHC');
let gameTypeHHBtn = document.querySelector('.gameTypeHH');

function changeGameType(btn) {
    DisplayBoard.resetBoard();
    console.log("here");
    console.log(btn);
    if (btn === gameTypeHCBtn) {
        gameTypeHHBtn.classList.remove('game-type-btn-clicked');
        gameTypeHCBtn.classList.add('game-type-btn-clicked');
        DisplayBoard.createBoard("p1", "Human");
        DisplayBoard.createBoard("p2", "Computer");
        player1 = CreatePlayer("Human");
        player2 = CreatePlayer("Computer");
    } else if (btn === gameTypeHHBtn) {
        gameTypeHCBtn.classList.remove('game-type-btn-clicked');
        gameTypeHHBtn.classList.add('game-type-btn-clicked');
        DisplayBoard.createBoard("p1", "Player 1");
        DisplayBoard.createBoard("p2", "Player 2");
        player1 = CreatePlayer("Human");
        player2 = CreatePlayer("Human");
    }
}
gameTypeHCBtn.addEventListener('click', () => { changeGameType(gameTypeHCBtn) });
gameTypeHHBtn.addEventListener('click', () => { changeGameType(gameTypeHHBtn) });

//game started
//if game started, ships are no longer draggable
let gameStarted = false;

//draggable items (ships)
let p1Ships = document.querySelectorAll('.p1Ship');
let p2Ships = document.querySelectorAll('.p2Ship'); //length of 0 means nothing


//board coords which may have elements dragged into:
let p1Coords = document.querySelectorAll('.p1DropContainer');
let p2Coords = document.querySelectorAll('.p1DropContainer');

function checkIfDropContainerHasChild() {

}





//setting ship position
player1.playersBoard.ships[0].setPosition(["1", "2", "3"]);
player1.playersBoard.ships[1].setPosition(["9", "10"]);

player2.playersBoard.ships[0].setPosition(["4", "5", "6"]);
player2.playersBoard.ships[1].setPosition(["9", "10"]);

//event listener for boards
const player1Coords = document.querySelectorAll('[data-p1]');
const player2Coords = document.querySelectorAll('[data-p2]');
//Visual hit on board
function visualCoordHit(e, hitSuccess) {
    let hitSpotIcon = document.createElement('ion-icon');
    hitSpotIcon.setAttribute("name", "close");
    let hitAttribute;
    hitSuccess === true ? hitAttribute = "spot-hit-green" : hitAttribute = "spot-hit-red"
    hitSpotIcon.setAttribute("class", `${hitAttribute}`);

    e.currentTarget.append(hitSpotIcon);
}
//Shooting a coord (on board click):
function boardClick(playerAttacking, playerAttacked, e) {
    if (playerAttacking.checkIfMoveLegal(e.currentTarget.dataset) === true) {
        let hitSuccess;
        if (playerAttacking === player1) {
            hitSuccess = playerAttacked.playersBoard.receiveAttack(e.currentTarget.dataset.p2);
        } else {
            hitSuccess = playerAttacked.playersBoard.receiveAttack(e.currentTarget.dataset.p1);
        }

        visualCoordHit(e, hitSuccess);

        if (playerAttacked.playersBoard.allShipsSunken() === true) {
            //game over
            return ":-("
        }
    };
}
//P1 shoots P2's Board:
for (let coord of player2Coords) {
    coord.addEventListener('click', (e) => { boardClick(player1, player2, e) });
}

//Game over
function checkIfGameOver(playerAttacked) {
    let gameOver = false;
    playerAttacked.playersBoard.allShipsSunken() === true ? gameOver === true : gameOver === false;
    return gameOver;
}

//What to do when game is over
function gameOver() {
    //display gameOver message
}




export {
    boardClick
}


