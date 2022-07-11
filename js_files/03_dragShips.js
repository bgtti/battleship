//Dragging ships into position
let PositioningShips = (function () {
    //draggable items (ships)
    let p1Ships = document.querySelectorAll('.p1Ship');
    let p2Ships = document.querySelectorAll('.p2Ship'); //*******still missing

    //board coords which may have elements dragged into:
    let p1Coords = document.querySelectorAll('.p1DropContainer');
    let p2Coords = document.querySelectorAll('.p2DropContainer');

    //get rotating icons
    let rotatingIcons = document.querySelectorAll('.rotateShipIcon');

    rotatingIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
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
        })
    })
    function removeRotateIcons() {
        let shipContainers = document.querySelectorAll('.theShip');
        shipContainers.forEach(ship => {
            if (!ship.firstChild) {
                ship.parentElement.classList.add("hide");
            }
        })
    }


    //Remove class of element being dragged on drop or when another ship is selected *******only p1
    function clearDraggingClass() { p1Ships.forEach(element => { element.classList.remove('shipOnDrag') }) };

    //Update board coords which may have elements dragged into:
    //This function could be improved by reading adjecent coords where ship positioning would overlap
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
    }

    //drag event listeners of ships    ********************only for P1!!!
    p1Ships.forEach(ship => {
        ship.addEventListener('mousedown', () => {
            clearDraggingClass();
            ship.classList.add('shipOnDrag');
            enableDrop(p1Coords); //**** change for p2...
        });
    });

    //drop event listener ********************only for P1!!!
    p1Coords.forEach(coord => {
        coord.addEventListener('dragover', e => {
            if (e.currentTarget.classList.contains('enableDrop')) {
                e.preventDefault();
                coord.classList.add("coords-on-drag");

                //adding class to adjacent elements:
                let theCoord = e.currentTarget.dataset.p1;
                let shipDragged = document.querySelector('.shipOnDrag');
                let lengthOfShip = shipDragged.childElementCount;

                if (shipDragged.classList.contains('shipVertical')) {
                    document.querySelector(`[data-p1="${(parseInt(theCoord) + 8)}"]`).classList.add("coords-on-drag");
                    if (lengthOfShip > 2) {
                        document.querySelector(`[data-p1="${(parseInt(theCoord) + 16)}"]`).classList.add("coords-on-drag");
                        if (lengthOfShip === 4) {
                            document.querySelector(`[data-p1="${(parseInt(theCoord) + 24)}"]`).classList.add("coords-on-drag");
                        }
                    }
                } else {
                    document.querySelector(`[data-p1="${(parseInt(theCoord) + 1)}"]`).classList.add("coords-on-drag");
                    if (lengthOfShip > 2) {
                        document.querySelector(`[data-p1="${(parseInt(theCoord) + 2)}"]`).classList.add("coords-on-drag");
                        if (lengthOfShip === 4) {
                            document.querySelector(`[data-p1="${(parseInt(theCoord) + 3)}"]`).classList.add("coords-on-drag");
                        }
                    }
                };
            }
        });

        coord.addEventListener('dragleave', () => {
            p1Coords.forEach(coord => coord.classList.remove("coords-on-drag"));
        })

        coord.addEventListener('drop', e => {
            p1Coords.forEach(coord => coord.classList.remove("coords-on-drag"));

            let shipDragged = document.querySelector('.shipOnDrag');
            let lengthOfShip = shipDragged.childElementCount;

            let targettedCoord = parseInt(coord.dataset.p1);

            let shipCanBeDropped = true;

            if (shipDragged.classList.contains('shipVertical')) {
                for (let i = 0; i < lengthOfShip; i++) {
                    let coordOfPart = String((targettedCoord + (8 * i)));
                    let partContainer = document.querySelector(`[data-p1="${coordOfPart}"]`); // **p1
                    if (partContainer.firstChild) { shipCanBeDropped = false };
                }
                if (shipCanBeDropped) {
                    for (let i = 0; i < lengthOfShip; i++) {
                        let shipPart = shipDragged.firstChild;
                        let coordOfPart = String((targettedCoord + (8 * i)));
                        let partContainer = document.querySelector(`[data-p1="${coordOfPart}"]`); // **p1
                        partContainer.appendChild(shipPart);
                    }
                }
            } else {
                for (let i = 0; i < lengthOfShip; i++) {
                    let coordOfPart = String((targettedCoord + i));
                    let partContainer = document.querySelector(`[data-p1="${coordOfPart}"]`); // **p1
                    if (partContainer.firstChild) { shipCanBeDropped = false };
                }
                if (shipCanBeDropped) {
                    for (let i = 0; i < lengthOfShip; i++) {
                        let shipPart = shipDragged.firstChild;
                        let coordOfPart = String((targettedCoord + i));
                        let partContainer = document.querySelector(`[data-p1="${coordOfPart}"]`); // **p1
                        partContainer.appendChild(shipPart);
                    }
                }
            }

            removeRotateIcons();
            clearDraggingClass();
        })
    })

})()




