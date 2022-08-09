//Dragging ships into position
//is file: sets the drag and drop functionality and collects the ship's position
//the ships' positions are requested by game.js to commence the game
//a polyfill (script of id = DragDropTouch in the HTML document) translates the drag and drop functionality for touch devices.

export let PositioningShips = (function () {
    //draggable items (ships)
    let p1Ships = document.querySelectorAll('.p1Ship');
    let p2Ships = document.querySelectorAll('.p2Ship');

    //board coords which may have elements dragged into:
    let p1Coords = document.querySelectorAll('.p1DropContainer');
    let p2Coords = document.querySelectorAll('.p2DropContainer');

    //get rotating icons
    let rotatingIcons = document.querySelectorAll('.rotateShipIcon');

    //ship positions
    const p1shipPosition = [];
    const p2shipPosition = [];

    //parts of ship dropped
    const p1shipParts = [];
    const p2shipParts = [];

    //Callback functions for event listeners:

    //rotate icon to set ship in vertical position
    function rotatingIconsEventListener(e) {
        let iconsParent = e.currentTarget.parentElement;
        if (iconsParent.firstChild.classList.contains('the-ship-vertical')) {
            iconsParent.firstChild.classList.remove('the-ship-vertical');
            iconsParent.firstChild.classList.remove('shipVertical');
            iconsParent.firstChild.childNodes.forEach(child => { child.classList.remove('ship-part-vertical') });

        } else if (!iconsParent.firstChild.classList.contains('the-ship-vertical')) {
            iconsParent.firstChild.classList.add('the-ship-vertical');
            iconsParent.firstChild.classList.add('shipVertical');
            iconsParent.firstChild.childNodes.forEach(child => { child.classList.add('ship-part-vertical'); });
        }
    };

    function removeRotateIcons() {
        let shipContainers = document.querySelectorAll('.theShip');
        shipContainers.forEach(ship => {
            if (!ship.firstChild) {
                ship.parentElement.classList.add("hide");
            }
        })
    }

    //check if all ships were positioned (to enable start game button click):
    function checkIfAllShipsPositioned(player) { //accepts "p1" or "p2"
        if (player === "p1" && p1shipPosition.length === 4) {
            let gameStartBtn = document.querySelector(".startGameBtn");
            gameStartBtn.classList.remove('start-game-btn-not-ready');

            let shipPositioningButtonP1 = document.querySelector(".p1ShipReadyBtn");
            if (shipPositioningButtonP1) { shipPositioningButtonP1.classList.remove('button-style-not-ready'); }
        } else if (player === "p2" && p2shipPosition.length === 4) {
            let shipPositioningButtonP2 = document.querySelector(".p2ShipReadyBtn");
            shipPositioningButtonP2.classList.remove('button-style-not-ready');
        }
    };

    //Remove class of element being dragged on drop or when another ship is selected 
    function clearDraggingClass(playerShips) { ///argument should be: p1Ships or p2Ships
        playerShips.forEach(element => { element.classList.remove('shipOnDrag') });
    };

    //Update board coords which may have elements dragged into:
    //(This function could be improved in the future by reading adjacent coords where ship positioning would overlap)
    function enableDrop(theBoardCoords) { //accepts arguments: p1Coords or p2Coords
        let shipDragged = document.querySelector('.shipOnDrag');
        let lengthOfShip = shipDragged.childElementCount;

        theBoardCoords.forEach(coord => { coord.classList.remove('enableDrop'); });
        if (shipDragged.classList.contains('shipVertical')) {
            for (let i = 0; i < (8 * (8 - (lengthOfShip - 1))); i++) {
                if (!theBoardCoords[i].hasChildNodes()) {
                    theBoardCoords[i].classList.add('enableDrop')
                }
            }
        } else {
            for (let i = 1; i < 65; i += 8) {
                for (let j = (i - 1); j < ((i + 7) - (lengthOfShip - 1)); j++) {
                    if (!theBoardCoords[j].hasChildNodes()) {
                        theBoardCoords[j].classList.add('enableDrop')
                    }
                }
            }
        }
    };

    //drag event listeners of ships
    function shipEventListenerMouseDown(ship, playerShips, playerCoords) { ///argument should be: (ship, p1Ships, p1Coords) or (ship, p2Ships, p2Coords)
        clearDraggingClass(playerShips);
        ship.classList.add('shipOnDrag');
        enableDrop(playerCoords);
    }

    //drag event for coords in boards
    function coordEventListenerDragOver(e, coord, player) { ///argument should be: (e, coord, "p1") or (e, coord, "p2")
        if (e.currentTarget.classList.contains("enableDrop")) {
            e.preventDefault();
            coord.classList.add("coords-on-drag");

            //adding class to adjacent elements:
            let theCoord;
            player === "p1" ? theCoord = e.currentTarget.dataset.p1 : theCoord = e.currentTarget.dataset.p2;
            let shipDragged = document.querySelector('.shipOnDrag');
            let lengthOfShip = shipDragged.childElementCount;

            if (shipDragged.classList.contains('shipVertical')) {
                document.querySelector(`[data-${player}="${(parseInt(theCoord) + 8)}"]`).classList.add("coords-on-drag");
                if (lengthOfShip > 2) {
                    document.querySelector(`[data-${player}="${(parseInt(theCoord) + 16)}"]`).classList.add("coords-on-drag");
                    if (lengthOfShip === 4) {
                        document.querySelector(`[data-${player}="${(parseInt(theCoord) + 24)}"]`).classList.add("coords-on-drag");
                    }
                }
            } else {
                document.querySelector(`[data-${player}="${(parseInt(theCoord) + 1)}"]`).classList.add("coords-on-drag");
                if (lengthOfShip > 2) {
                    document.querySelector(`[data-${player}="${(parseInt(theCoord) + 2)}"]`).classList.add("coords-on-drag");
                    if (lengthOfShip === 4) {
                        document.querySelector(`[data-${player}="${(parseInt(theCoord) + 3)}"]`).classList.add("coords-on-drag");
                    }
                }
            };
        };
    };

    function coordEventListenerDrop(coords, coord, player, playerShips) { //arguments should be: (p1Coords, coord, "p1", p1Ships) or (p2Coords, coord, "p2", p2Ships)
        coords.forEach(coord => coord.classList.remove("coords-on-drag"));
        let shipDragged = document.querySelector('.shipOnDrag');
        let lengthOfShip = shipDragged.childElementCount;

        const dropSpot = [shipDragged.dataset.ship, []];
        const droppedParts = [shipDragged.dataset.ship, []];

        let targettedCoord;
        player === "p1" ? targettedCoord = parseInt(coord.dataset.p1) : targettedCoord = parseInt(coord.dataset.p2)

        let shipCanBeDropped = true;
        if (shipDragged.classList.contains('shipVertical')) {
            for (let i = 0; i < lengthOfShip; i++) {
                let coordOfPart = String((targettedCoord + (8 * i)));
                let partContainer = document.querySelector(`[data-${player}="${coordOfPart}"]`);
                if (partContainer.firstChild) { shipCanBeDropped = false };
            }
            if (shipCanBeDropped) {
                for (let i = 0; i < lengthOfShip; i++) {
                    let shipPart = shipDragged.firstChild;
                    let coordOfPart = String((targettedCoord + (8 * i)));
                    let partContainer = document.querySelector(`[data-${player}="${coordOfPart}"]`);
                    partContainer.appendChild(shipPart);
                    dropSpot[1].push(parseInt(coordOfPart));
                    droppedParts[1].push(shipPart);
                }
            }
        } else {
            for (let i = 0; i < lengthOfShip; i++) {
                let coordOfPart = String((targettedCoord + i));
                let partContainer = document.querySelector(`[data-${player}="${coordOfPart}"]`);
                if (partContainer.firstChild) { shipCanBeDropped = false };
            }
            if (shipCanBeDropped) {
                for (let i = 0; i < lengthOfShip; i++) {
                    let shipPart = shipDragged.firstChild;
                    let coordOfPart = String((targettedCoord + i));
                    let partContainer = document.querySelector(`[data-${player}="${coordOfPart}"]`);
                    partContainer.appendChild(shipPart);
                    dropSpot[1].push(parseInt(coordOfPart));
                    droppedParts[1].push(shipPart)
                }
            }
        }
        player === "p1" ? p1shipPosition.push(dropSpot) : p2shipPosition.push(dropSpot);
        player === "p1" ? p1shipParts.push(droppedParts) : p2shipParts.push(droppedParts);
        player === "p1" ? checkIfAllShipsPositioned("p1") : checkIfAllShipsPositioned("p2");
        removeRotateIcons();
        clearDraggingClass(playerShips);
    };

    function activatingDragDropELs() {
        while (p1shipPosition.length > 0) {
            p1shipPosition.pop();
        };
        while (p2shipPosition.length > 0) {
            p2shipPosition.pop();
        };
        while (p1shipParts.length > 0) {
            p1shipParts.pop();
        };
        while (p2shipParts.length > 0) {
            p2shipParts.pop();
        };
        p1Ships = document.querySelectorAll('.p1Ship');
        p2Ships = document.querySelectorAll('.p2Ship');
        p1Coords = document.querySelectorAll('.p1DropContainer');
        p2Coords = document.querySelectorAll('.p2DropContainer');
        rotatingIcons = document.querySelectorAll('.rotateShipIcon');

        //EL for rotation of ships
        rotatingIcons.forEach(icon => {
            icon.addEventListener('click', (e) => { rotatingIconsEventListener(e); })
        })
        //EL for P1 & P2 ships
        p1Ships.forEach(ship => {
            ship.addEventListener('mousedown', () => { shipEventListenerMouseDown(ship, p1Ships, p1Coords) });
        });
        p2Ships.forEach(ship => {
            ship.addEventListener('mousedown', () => { shipEventListenerMouseDown(ship, p2Ships, p2Coords) });
        });
        //EL for P1 board coords
        p1Coords.forEach(coord => {
            coord.addEventListener('dragover', e => { coordEventListenerDragOver(e, coord, "p1") });
            coord.addEventListener('dragleave', () => {
                p1Coords.forEach(coord => coord.classList.remove("coords-on-drag"));
            })
            coord.addEventListener('drop', e => { coordEventListenerDrop(p1Coords, coord, "p1", p1Ships); })
        })
        //EL for P2 board coords
        p2Coords.forEach(coord => {
            coord.addEventListener('dragover', e => { coordEventListenerDragOver(e, coord, "p2") });
            coord.addEventListener('dragleave', () => {
                p2Coords.forEach(coord => coord.classList.remove("coords-on-drag"));
            });
            coord.addEventListener('drop', e => { coordEventListenerDrop(p2Coords, coord, "p2", p2Ships); });
        })
    }
    activatingDragDropELs()

    return {
        activatingDragDropELs,
        p1shipPosition,
        p2shipPosition,
        p1shipParts,
        p2shipParts,
    }
})()