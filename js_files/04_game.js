import { PositioningShips } from "./03_dragShips.js";
import { CreatePlayer } from "./01_factory.js";
import { explosionAnimation } from "./05_explosionAnimation.js";
const Game = (function () {
    //**** Getting necessary elements****
    // HTML elements:
    const messageContainerP1 = document.querySelector(".messageContainerP1");
    const messageContainerP2 = document.querySelector(".messageContainerP2");
    const gameStartBtn = document.querySelector(".startGameBtn");
    //coords from board:
    let player1Coords = document.querySelectorAll('[data-p1]');
    let player2Coords = document.querySelectorAll('[data-p2]');
    let player1Board = document.querySelector(".board-p1");
    let player2Board = document.querySelector(".board-p2");
    //function that updates elements if boards are re-loaded:
    function gettingBoardCoords() {
        player1Coords = document.querySelectorAll('[data-p1]');
        player2Coords = document.querySelectorAll('[data-p2]');
        player1Board = document.querySelector(".board-p1");
        player2Board = document.querySelector(".board-p2");
    }

    //**** Initiation: creates players & saves gameType****
    let player1;
    let player2;
    let gameType;
    let gameStarted = false; //used?
    let gameOver = false; //used?

    function initiateGame(player1Type, player2Type) { //player types: "Human" or "Computer"
        player1 = CreatePlayer(player1Type);
        player2 = CreatePlayer(player2Type);
        player2Type === "Computer" ? gameType = "HC" : gameType = "HH";
        gettingBoardCoords();
    };

    //**** Ship positioning functions ****

    // sorting coordinates by ship number (helper function)
    function sortShips(arrayOfShips) {
        return arrayOfShips.sort((a, b) => { return a[0] - b[0] })
    };

    //setting ship position
    function setShipPosition() {
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

    //**** Special target cursor for attack ****
    function settingCursorTarget(element) {
        element.classList.add("cursorTarget");
    }
    function resettingCursor(element) {
        if (element) {
            element.classList.remove("cursorTarget");
        }
    }

    //**** Function to reset modified HTML elements ****
    function resettingHTMLElements() {
        resettingCursor(player1Board);
        resettingCursor(player2Board);
        if (gameType === "HC") {
            gameStartBtn.classList.remove("hide");
            messageContainerP1.textContent = "Drag your ships into position.";
            messageContainerP2.textContent = "Press the start button when you are ready.";
        } else {
            //write HH logic here ********************
        }
    }

    // **** Game over functions ****
    //What to do when game is over
    function gameIsOver() {
        //display gameOver message
    }

    //Game over
    function checkIfGameOver(playerAttacked) {
        playerAttacked.playersBoard.allShipsSunken() === true ? gameOver === true : gameOver === false;
        return gameOver;
    }

    // **** Attack functions ****
    //Visual hit on board
    function visualCoordHit(e, hitSuccess) {
        explosionAnimation.playAnimation(e.currentTarget);
        let hitSpotIcon = document.createElement('ion-icon');
        hitSpotIcon.setAttribute("name", "close");
        let hitAttribute;
        hitSuccess === true ? hitAttribute = "spot-hit-green" : hitAttribute = "spot-hit-red"
        hitSpotIcon.setAttribute("class", `${hitAttribute}`);
        e.currentTarget.append(hitSpotIcon);
        //background color on hit to be white
        //set class to enable another cursor over hit spot
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

    // **** Setting Event listeners for hits ****
    function enableEventListenersOnBoards() {
        for (let coord of player2Coords) {
            coord.addEventListener('click', (e) => {
                if (player1.playersTurn === true) {
                    boardClick(player1, player2, e);
                    console.log("p2 hit")
                }
            });
        }
        if (gameType === "HH") {
            for (let coord of player1Coords) {
                coord.addEventListener('click', (e) => {
                    if (player2.playersTurn === true) {
                        boardClick(player2, player2, e);
                        console.log("p2 hit")
                    }
                });
            }
        }
    }
    // **** Starting the game ****
    function startGame() {
        if (!gameStartBtn.classList.contains('start-game-btn-not-ready')) {
            setShipPosition() //// **** only working for HC
            player1.playersTurn = true;
            gameStartBtn.classList.add("hide");
            messageContainerP1.textContent = "Game started! Human's turn to attack!";
            messageContainerP2.textContent = "Click a coordinate on the Computer's board to shoot it.";
            gettingBoardCoords();
            gameStarted = true;
            settingCursorTarget(player2Board);
            enableEventListenersOnBoards()
        }
    }


    //NEXT STEPS: add looping function that players take turns
    //add computer shooting

    return {
        initiateGame,
        // checkIfGamePossible,
        startGame,
        resettingHTMLElements,

        //for testing only:
        player1,
        player2,
        sortShips,
        setShipPosition,
    }
})()

export { Game }