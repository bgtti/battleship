import { createBoard } from "./02_htmlDisplay.js";
import { CreatePlayer } from "./01_factory.js";

//drawing boards
createBoard("p1", "Human");
createBoard("p2", "Computer");

//creating players
let player1 = CreatePlayer("Human");
let player2 = CreatePlayer("Computer");

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

export {
    boardClick
}


//drag and drop items: https://www.youtube.com/watch?v=jfYWwQrtzzY&t=91s

