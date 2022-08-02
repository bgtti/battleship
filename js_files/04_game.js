import { PositioningShips } from "./03_dragShips.js";
import { CreatePlayer } from "./01_factory.js";
const Game = (function () {
    //check if all ships are positioned to allow the game to start

    //check factory.js: checkIfAllShipsPositioned (Boards) CURRENTLY NOT USING
    function checkIfGamePossible(gameType) {//game type: "HC" or "HH"
        let p1coords = PositioningShips.p1shipPosition;
        let p2coords; // ******************repetition of setShipPosition
        if (gameType === "HH") {
            p2coords = PositioningShips.p2shipPosition;
        } else {
            player2.playersBoard.positionComputerShips();
        }

        if ((p1coords.length === 4) && (p2coords === 4)) {
            return true
        }
    }

    //initiation
    let player1;
    let player2;

    function initiateGame(player1Type, player2Type) { //player types: "Human" or "Computer"
        player1 = CreatePlayer(player1Type);
        player2 = CreatePlayer(player2Type);
    };

    // sorting coordinates by ship number (helper function)
    function sortShips(arrayOfShips) {
        return arrayOfShips.sort((a, b) => { return a[0] - b[0] })
    };

    //setting ship position
    function setShipPosition(gameType) { //game type: "HC" or "HH"
        let p1ShipCoords = sortShips(PositioningShips.p1shipPosition);
        let p2ShipCoords;
        if (gameType === "HH") {
            p2ShipCoords = sortShips(PositioningShips.p2shipPosition);
        } else {
            player2.playersBoard.positionComputerShips();
        }

        function putPositionInShip(player, coords) { //args: (player1, p1ShipCoords) or (player2, p2ShipCoords)
            player.playersBoard.ships[(parseInt(coords[0][0]) - 1)].setPosition(coords[0][1]);//2
            player.playersBoard.ships[(parseInt(coords[1][0]) - 1)].setPosition(coords[1][1]);//3
            player.playersBoard.ships[(parseInt(coords[2][0]) - 1)].setPosition(coords[2][1]);//4
            player.playersBoard.ships[(parseInt(coords[3][0]) - 1)].setPosition(coords[3][1]);//4
        };
        putPositionInShip(player1, p1ShipCoords);
        if (gameType === "HH") {
            putPositionInShip(player2, p2ShipCoords);
        }
    }

    // starting the game
    function startGame() {
        let gameStartBtn = document.querySelector(".startGameBtn");
        if (!gameStartBtn.classList.contains('start-game-btn-not-ready')) {
            setShipPosition("HC") //// **** only working for HC
        }
        //player1's turn.... **************************
    }

    //getting all coors from board
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

    return {
        initiateGame,
        checkIfGamePossible,
        startGame,

        //for testing only:
        player1,
        player2,
        sortShips,
        setShipPosition,
    }
})()

export { Game }