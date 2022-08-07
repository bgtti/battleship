import { PositioningShips } from "./03_dragShips.js";
import { CreatePlayer } from "./01_factory.js";
import { explosionAnimation } from "./05_explosionAnimation.js";
import { displayMessages } from "./06_displayMessages.js";

const Game = (function () {
    //********** HTML ELEMENTS: Getting necessary elements **********
    // HTML elements:
    const gameStartBtn = document.querySelector(".startGameBtn");
    const playAgainBtn = document.querySelector(".playAgainBtn");
    let theSwitchModal;
    let theSwitchBtn;
    let shipPositioningButtonP1;
    let shipPositioningButtonP2;
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

    //********** INITIATION: creates players & saves gameType **********
    let player1;
    let player2;
    let gameType;
    let gameOver = false;

    //hiding other player's coordinates:
    function hidingCoords(player) { //accepts "p1" or "p2"
        //make all boards white:
        player1Coords.forEach(coord => { coord.classList.remove("hidden-coord") });
        player2Coords.forEach(coord => { coord.classList.remove("hidden-coord") });
        //make board dark:
        let playerCoords = document.querySelectorAll(`[data-${player}]`);
        playerCoords.forEach(coord => { coord.classList.add("hidden-coord") });
        //hide unpositioned ships
        let shipContainer = document.querySelectorAll(`.shipContainer`);
        shipContainer.forEach(ship => { ship.classList.remove("hide") });
        let shipContainerPlayer = document.querySelectorAll(`.shipContainer${player}`);
        shipContainerPlayer.forEach(ship => { ship.classList.add("hide") });
        //hide shipParts (of ships that are not sunk)
        let allShipParts = document.querySelectorAll(".shipPartNotSunk");
        allShipParts.forEach(part => { part.classList.remove("hide") });
        let playersShipParts = document.querySelectorAll(`.shipPartNotSunk${player}`);
        playersShipParts.forEach(part => { part.classList.add("hide") });
    }
    //unhide boards (used when game is over)
    function displayCoordsAndShips() {
        //make all boards white:
        player1Coords.forEach(coord => { coord.classList.remove("hidden-coord") });
        player2Coords.forEach(coord => { coord.classList.remove("hidden-coord") });
        //display all ships:
        let allShipParts = document.querySelectorAll(".shipPartNotSunk");
        allShipParts.forEach(part => { part.classList.remove("hide") });
    }

    //initiation:
    function initiateGame(player1Type, player2Type) { //player types: "Human" or "Computer"
        gameStartBtn.classList.add('start-game-btn-not-ready');
        player1 = CreatePlayer(player1Type);
        player2 = CreatePlayer(player2Type);
        player2Type === "Computer" ? gameType = "HC" : gameType = "HH";
        gettingBoardCoords();
        displayMessages.displayMessage("positionShipsP1", gameType);
        gameOver = false;
        hidingCoords("p2");
        if (gameType === "HH") {
            hidingCoords("p2");
            player1CanPositionShips();
        }
    }

    //********** SWITCH LOGIC: for game type HH **********
    //open/close theSwitchModal
    function openSwitchPlayerModal() {
        theSwitchModal.classList.remove('hide');
    }

    //allow Player 1 to position ships
    function player1CanPositionShips() {
        theSwitchModal = document.querySelector(".switchModal");
        theSwitchBtn = document.querySelector(".okBtn");
        theSwitchBtn.addEventListener('click', () => { theSwitchModal.classList.add('hide') }); //******** */

        shipPositioningButtonP1 = document.querySelector(".p1ShipReadyBtn");
        shipPositioningButtonP2 = document.querySelector(".p2ShipReadyBtn");
        shipPositioningButtonP2.classList.add("hide");

        shipPositioningButtonP1.addEventListener('click', player2CanPositionShips);
    };

    //allow Player 2 to position ships
    function player2CanPositionShips() {
        if (!shipPositioningButtonP1.classList.contains('button-style-not-ready')) {
            shipPositioningButtonP1.classList.add("hide");
            shipPositioningButtonP2.classList.remove("hide");
            displayMessages.displayMessage("positionShipsP2", gameType);
            openSwitchPlayerModal();
            hidingCoords("p1");

            shipPositioningButtonP2.addEventListener('click', startGame);
        }
    }

    //switching players
    function playerSwitch() {
        openSwitchPlayerModal();
        if (player1.playersTurn === true) {
            hidingCoords("p2");
            settingCursorTarget(player2Board);
            resettingCursor(player1Board);
        } else if (player2.playersTurn === true) {
            hidingCoords("p1");
            settingCursorTarget(player1Board);
            resettingCursor(player2Board);
        }
    }

    //********** SHIP POSITIONING: take data from dragShips.js and send to player object **********

    // placing computer's visual ship parts in appropriate board coordinates
    function visualizingComputerShips() {
        for (let i = 0; i < 4; i++) { //for each ship
            let theShip = document.querySelector(`.p2Ship${i}`);
            let shipPosition = player2.playersBoard.ships[i].shipPosition;
            let shipDirection = player2.playersBoard.ships[i].shipDirection;

            for (let x = 1; x < (player2.playersBoard.ships[i].shipPosition.length + 1); x++) { //for each ship coord
                let theCoordToAppend = document.querySelector(`[data-p2="${String(shipPosition[x - 1])}"]`);
                let theShipPart = theShip.querySelector(`.ship-${i + 1}-part-${x}`);
                if (shipDirection === "vertical") { theShipPart.classList.add("ship-part-vertical") };
                player2.playersBoard.ships[i].shipParts.push(theShipPart);
                theShipPart.classList.add("hide");
                theCoordToAppend.append(theShipPart);
            }
        }
    }

    // sorting coordinates by ship number (helper function)
    function sortShips(arrayOfShips) {
        return arrayOfShips.sort((a, b) => { return a[0] - b[0] });
    }

    //setting ship position
    function setShipPosition() {
        let p1ShipCoords = sortShips(PositioningShips.p1shipPosition);
        let p2ShipCoords;
        let p1shipParts = sortShips(PositioningShips.p1shipParts);
        let p2shipParts;
        if (gameType === "HH") {
            p2ShipCoords = sortShips(PositioningShips.p2shipPosition);
            p2shipParts = sortShips(PositioningShips.p2shipParts);
        } else {
            player2.playersBoard.positionComputerShips();
            //UNCOMMENT TO SEE COMPUTER SHIP POSITION:
            console.log("Computer ship position:")
            console.log(player2.playersBoard.ships[0].shipPosition);
            console.log(player2.playersBoard.ships[1].shipPosition);
            console.log(player2.playersBoard.ships[2].shipPosition);
            console.log(player2.playersBoard.ships[3].shipPosition);
            visualizingComputerShips();
        }

        function putPositionInShip(player, coords, theshipParts) { //args: (player1, p1ShipCoords) or (player2, p2ShipCoords)
            player.playersBoard.ships[(parseInt(coords[0][0]) - 1)].setPosition(coords[0][1]);//2
            player.playersBoard.ships[(parseInt(theshipParts[0][0]) - 1)].shipParts = (theshipParts[0][1]);//2
            player.playersBoard.ships[(parseInt(coords[1][0]) - 1)].setPosition(coords[1][1]);//3
            player.playersBoard.ships[(parseInt(theshipParts[1][0]) - 1)].shipParts = (theshipParts[1][1]);//3
            player.playersBoard.ships[(parseInt(coords[2][0]) - 1)].setPosition(coords[2][1]);//4
            player.playersBoard.ships[(parseInt(theshipParts[2][0]) - 1)].shipParts = (theshipParts[2][1]);//4
            player.playersBoard.ships[(parseInt(coords[3][0]) - 1)].setPosition(coords[3][1]);//4
            player.playersBoard.ships[(parseInt(theshipParts[3][0]) - 1)].shipParts = (theshipParts[3][1]);//4
        };
        putPositionInShip(player1, p1ShipCoords, p1shipParts);
        if (gameType === "HH") {
            putPositionInShip(player2, p2ShipCoords, p2shipParts);
        }
    }

    //********** CURSOR: Special target cursor for attack **********
    function settingCursorTarget(element) {
        element.classList.add("cursorTarget");
    }
    function resettingCursor(element) {
        if (element) {
            element.classList.remove("cursorTarget");
        };
    }

    //********** GAME OVER **********
    //What to do when game is over
    function gameIsOver(whoWon) {
        gameOver = true;
        player1.playersTurn = false;
        player2.playersTurn = false;
        whoWon === player1 ? displayMessages.displayMessage("p1Wins", gameType) : displayMessages.displayMessage("p2Wins", gameType);
        resettingCursor(player2Board);
        resettingCursor(player1Board);
        setTimeout(() => {
            playAgainBtn.classList.remove("hide");
            displayCoordsAndShips()// unhide all ships & make board white
        }, 1000);
    }

    //********** ATTACK: functions **********
    //Visual hit on board
    function visualCoordHit(e, hitSuccess, shipParts, targetEl) {
        if (e === "C") {
            explosionAnimation.playAnimation(targetEl, hitSuccess, shipParts);
        } else {
            explosionAnimation.playAnimation(e.currentTarget, hitSuccess, shipParts);
        }
    }

    //Shooting a coord (on board click):
    function boardClick(playerAttacking, playerAttacked, e) {
        if (playerAttacking.checkIfMoveLegal(e.currentTarget.dataset) === true) {
            let theAttack;
            let hitSuccess;
            let sankShip;
            let shipParts = false;

            function analyseShot(player) {
                let p;
                let otherP;
                player === player1 ? p = "p1" : p = "p2";
                player === player1 ? otherP = "p2" : otherP = "p1";
                if (hitSuccess === true) {
                    displayMessages.displayMessage(`${p}ShotSuccess`, gameType);
                    if (sankShip === true) {
                        shipParts = theAttack[2];
                        shipParts.forEach(part => {
                            part.classList.remove("shipPartNotSunk")
                            part.classList.remove(`shipPartNotSunk${otherP}`)
                        });
                        if (playerAttacked.playersBoard.allShipsSunken() === true) {
                            gameIsOver(playerAttacking);
                        }
                    }
                } else {
                    displayMessages.displayMessage(`${p}ShotMissed`, gameType);
                }
            }

            //check if hit was successfull and whether ship sank
            if (playerAttacking === player1) {
                theAttack = player2.playersBoard.receiveAttack(e.currentTarget.dataset.p2)
                hitSuccess = theAttack[0];
                sankShip = theAttack[1];
                analyseShot(player1);

            } else {
                theAttack = player1.playersBoard.receiveAttack(e.currentTarget.dataset.p1)
                hitSuccess = theAttack[0];
                sankShip = theAttack[1];
                analyseShot(player2);
            }

            if (gameOver === false) {
                playerAttacking.playersTurn = false;
                playerAttacked.playersTurn = true;
            }

            //visual representation of hit on the board
            visualCoordHit(e, hitSuccess, shipParts);

            //switch players if gameType is HH
            if ((gameType === "HH") && (gameOver === true)) {
                setTimeout(() => {
                    playerSwitch()
                }, 1000);
            };

            //computer attack if gameType is HC:
            if ((gameType === "HC") && (player2.playersTurn === true)) {
                let coordOfComputerAttack;
                let coordInBoard;

                let compAtt = function () {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            coordOfComputerAttack = player2.computerShooting();
                            resolve();
                        }, 2000)
                    })
                }
                compAtt().then(() => {
                    coordInBoard = document.querySelector(`[data-p1="${coordOfComputerAttack}"]`);
                    theAttack = player1.playersBoard.receiveAttack(coordOfComputerAttack);
                    hitSuccess = theAttack[0];
                    sankShip = theAttack[1];
                    analyseShot(player2);
                    visualCoordHit("C", hitSuccess, shipParts, coordInBoard);
                }
                ).then(() => {
                    player1.playersTurn = true;
                    player2.playersTurn = false;
                });

            }
        };
    }

    //********** Setting Event listeners for hits **********
    function enableEventListenersOnBoards() {
        for (let coord of player2Coords) {
            coord.addEventListener('click', (e) => {
                if (player1.playersTurn === true) {
                    boardClick(player1, player2, e);
                }
            });
        }
        if (gameType === "HH") {
            for (let coord of player1Coords) {
                coord.addEventListener('click', (e) => {
                    if (player2.playersTurn === true) {
                        boardClick(player2, player1, e);
                    }
                });
            }
        }
    }
    //********** STARTING THE GAME **********
    function startGame() {
        function startThisGame() {
            setShipPosition()
            player1.playersTurn = true;
            displayMessages.displayMessage("gameStart", gameType);
            gettingBoardCoords();
            settingCursorTarget(player2Board);
            enableEventListenersOnBoards();
        }
        if (gameType === "HC") {
            if (!gameStartBtn.classList.contains('start-game-btn-not-ready')) {
                gameStartBtn.classList.add("hide");
                startThisGame();
            }
        }
        if (gameType === "HH") {
            if (!shipPositioningButtonP2.classList.contains('button-style-not-ready')) {
                shipPositioningButtonP2.classList.add("hide");
                openSwitchPlayerModal();
                hidingCoords("p2");
                startThisGame();
            }
        }
    }

    gameStartBtn.addEventListener('click', () => {
        startGame();
    })

    //********** RESET MODIFIED HTML ELEMENTS **********
    function resettingHTMLElements() {
        resettingCursor(player1Board);
        resettingCursor(player2Board);
        if (gameType === "HC") {
            gameStartBtn.classList.remove("hide");
            displayMessages.displayMessage("positionShipsP1", gameType);
        } else {
            gameStartBtn.classList.add("hide");
            displayMessages.displayMessage("positionShipsP1", gameType);
        }
    }


    return {
        initiateGame,
        resettingHTMLElements,

        //for testing only:
        sortShips,
    }
})()

export { Game }