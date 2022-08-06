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

    // placing computer's visual ship parts in appropriate board coordinates
    function visualizingComputerShips() {
        for (let i = 0; i < 4; i++) { //for each ship
            let theShip = document.querySelector(`.p2Ship${i}`);
            let shipPosition = player2.playersBoard.ships[i].shipPosition;
            let shipDirection = player2.playersBoard.ships[i].shipDirection;

            for (let x = 1; x < (player2.playersBoard.ships[i].shipPosition.length + 1); x++) { //for each ship coord
                let theCoordToAppend = document.querySelector(`[data-p2="${String(shipPosition[x - 1])}"]`);
                let theShipPart = theShip.querySelector(`.ship-${i + 1}-part-${x}`);
                if (shipDirection === "vertical") { theShipPart.classList.add("ship-part-vertical") }
                player2.playersBoard.ships[i].shipParts.push(theShipPart);
                theCoordToAppend.append(theShipPart);
                //HIDE THE SHIPS
            }
        }
    }

    // sorting coordinates by ship number (helper function)
    function sortShips(arrayOfShips) {
        return arrayOfShips.sort((a, b) => { return a[0] - b[0] })
    };

    //setting ship position
    function setShipPosition() {
        let p1ShipCoords = sortShips(PositioningShips.p1shipPosition);
        let p2ShipCoords;
        let p1shipParts = sortShips(PositioningShips.p1shipParts);
        let p2shipParts;
        if (gameType === "HH") {
            p2ShipCoords = sortShips(PositioningShips.p2shipPosition);
        } else {
            player2.playersBoard.positionComputerShips();
            // TEMPORARY VISUALIZATION OF COMPUTER SHIP POSITION:
            console.log("positioning c ships")
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
    function visualCoordHit(e, hitSuccess, targetEl) {
        if (e === "C") {
            explosionAnimation.playAnimation(targetEl, hitSuccess)
        } else {
            explosionAnimation.playAnimation(e.currentTarget, hitSuccess)
        }
        //background color on hit to be white
        //set class to enable another cursor over hit spot
    }

    // //check if ship sank
    // function shipHasSunk(player){ //player1 or player2
    //     player.playersBoard.
    // }

    //Shooting a coord (on board click):
    function boardClick(playerAttacking, playerAttacked, e) {
        if (playerAttacking.checkIfMoveLegal(e.currentTarget.dataset) === true) {
            //checks if hit was successful and whether the ship sank:
            let theAttack;
            let hitSuccess;
            let sankShip;
            if (playerAttacking === player1) {
                theAttack = player2.playersBoard.receiveAttack(e.currentTarget.dataset.p2)
                hitSuccess = theAttack[0];
                sankShip = theAttack[1];
            } else {
                theAttack = player1.playersBoard.receiveAttack(e.currentTarget.dataset.p1)
                hitSuccess = theAttack[0];
                sankShip = theAttack[1];
            }

            playerAttacking.playersTurn = false;
            playerAttacked.playersTurn = true;

            //visual representation of hit on the board

            //visual hit should also accept: if ship sank, pass on the ship parts to paint them red...
            visualCoordHit(e, hitSuccess); ///make async....

            if (playerAttacked.playersBoard.allShipsSunken() === true) {
                //game over -------WRONG!!! NOT WORKING!
                playerAttacking.playersTurn = false;
                playerAttacked.playersTurn = false;
                return console.log(":-(")
            }

            if ((gameType === "HC") && (player2.playersTurn = true)) {
                let coordOfComputerAttack;
                let coordInBoard;

                let compAtt = function () {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            coordOfComputerAttack = player2.computerShooting();
                            resolve();
                        }, 500)
                    })
                }
                compAtt().then(() => {
                    coordInBoard = document.querySelector(`[data-p1="${coordOfComputerAttack}"]`);
                    hitSuccess = player1.playersBoard.receiveAttack(coordOfComputerAttack)[0];
                    visualCoordHit("C", hitSuccess, coordInBoard);
                }
                ).then(() => {
                    player1.playersTurn = true;
                    player2.playersTurn = false;
                });

            }
        };
    }

    // **** Setting Event listeners for hits ****
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
                        boardClick(player2, player2, e);
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

    //*** */

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


//***************************** */
// OLD VERSION:

// **** Attack functions ****
//Visual hit on board
// function visualCoordHit(e, hitSuccess, targetEl) {
//     // let hitSpotIcon = document.createElement('ion-icon');
//     // hitSpotIcon.setAttribute("name", "close");
//     // let hitAttribute;
//     // hitSuccess === true ? hitAttribute = "spot-hit-green" : hitAttribute = "spot-hit-red"
//     // hitSpotIcon.setAttribute("class", `${hitAttribute}`);

//     // const theAnimation = (targeTDiv) => {
//     //     return new Promise((resolve) => {
//     //         explosionAnimation.playAnimation(targeTDiv)
//     //         resolve()
//     //     })
//     // }


//     if (e === "C") {
//         explosionAnimation.playAnimation(targetEl, hitSuccess)
//         // theAnimation(targetEl).then(() => {
//         //     targetEl.append(hitSpotIcon)
//         //     console.log("its C")
//         // })
//         // explosionAnimation.playAnimation(targetEl)
//         // targetEl.append(hitSpotIcon)
//         // console.log("its C")
//     } else {
//         explosionAnimation.playAnimation(e.currentTarget, hitSuccess)
//         // theAnimation(e.currentTarget).then(() => {
//         //     console.log("its not C " + e.currentTarget)
//         //     e.currentTarget.append(hitSpotIcon);
//         // })
//         // explosionAnimation.playAnimation(e.currentTarget)
//         // console.log("its not C " + e.currentTarget)
//         // e.currentTarget.append(hitSpotIcon);
//     }

//     // e === "C" ? explosionAnimation.playAnimation(targetEl) : explosionAnimation.playAnimation(e.currentTarget);
//     // let hitSpotIcon = document.createElement('ion-icon');
//     // hitSpotIcon.setAttribute("name", "close");
//     // let hitAttribute;
//     // hitSuccess === true ? hitAttribute = "spot-hit-green" : hitAttribute = "spot-hit-red"
//     // hitSpotIcon.setAttribute("class", `${hitAttribute}`);
//     // e === "C" ? targetEl.append(hitSpotIcon) : e.currentTarget.append(hitSpotIcon);


//     //background color on hit to be white
//     //set class to enable another cursor over hit spot
// }

// //Shooting a coord (on board click):
// function boardClick(playerAttacking, playerAttacked, e) {
//     if (playerAttacking.checkIfMoveLegal(e.currentTarget.dataset) === true) {
//         let hitSuccess;
//         if (playerAttacking === player1) {
//             hitSuccess = player2.playersBoard.receiveAttack(e.currentTarget.dataset.p2);
//         } else {
//             hitSuccess = player1.playersBoard.receiveAttack(e.currentTarget.dataset.p1);
//         }
//         playerAttacking.playersTurn = false;
//         playerAttacked.playersTurn = true;

//         visualCoordHit(e, hitSuccess); ///make async....

//         if (playerAttacked.playersBoard.allShipsSunken() === true) {
//             //game over
//             playerAttacking.playersTurn = false;
//             playerAttacked.playersTurn = false;
//             return console.log(":-(")
//         }

//         if ((gameType === "HC") && (player2.playersTurn = true)) {
//             let coordOfComputerAttack;
//             let coordInBoard;

//             let compAtt = function () {
//                 return new Promise(resolve => {
//                     setTimeout(() => {
//                         coordOfComputerAttack = player2.computerShooting();
//                         resolve();
//                     }, 500)
//                 })
//             }
//             compAtt().then(() => {
//                 coordInBoard = document.querySelector(`[data-p1="${coordOfComputerAttack}"]`);
//                 hitSuccess = player1.playersBoard.receiveAttack(coordOfComputerAttack);
//                 visualCoordHit("C", hitSuccess, coordInBoard);
//             }
//             ).then(() => {
//                 player1.playersTurn = true;
//                 player2.playersTurn = false;
//             });


//             // let coordOfComputerAttack = player2.computerShooting();
//             // let coordInBoard = document.querySelector(`[data-p1="${coordOfComputerAttack}"]`)
//             // hitSuccess = player1.playersBoard.receiveAttack(coordOfComputerAttack);
//             // visualCoordHit("C", hitSuccess, coordInBoard);
//             // player1.playersTurn = true;
//             // player2.playersTurn = false;
//         }
//     };
// }