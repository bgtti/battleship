const DisplayBoard = (function () {
    const boardsContainer = document.querySelector(".boardsContainer");

    function createBoard(boardId, playerName) {

        const board = document.createElement('div');
        board.setAttribute("class", `board-${boardId}`);
        for (let i = 1; i < 65; i++) {
            let coord = document.createElement('div');
            coord.setAttribute(`data-${boardId}`, `${i}`);
            coord.setAttribute("class", "coord-div");
            coord.classList.add(`${boardId}DropContainer`);
            board.appendChild(coord);
        }
        const playerContainer = document.createElement('div');
        playerContainer.setAttribute("class", "player-container");

        const namePlayer = document.createElement('h2');
        namePlayer.textContent = playerName;
        namePlayer.setAttribute("class", "player-name");

        playerContainer.append(namePlayer, board)

        function createDraggableShips(shipLength, shipNr) {
            let ship = document.createElement('div');
            ship.setAttribute("draggable", "true"); //take this out when game starts
            ship.setAttribute(`data-ship`, `${shipNr}`)
            ship.setAttribute("class", `the-ship`);
            ship.classList.add(`theShip`); //take this out when game starts
            ship.classList.add(`${boardId}Ship`); //take this out when game starts
            ship.classList.add("ship-not-positioned"); //take this out when game starts


            for (let i = 1; i < (parseInt(shipLength) + 1); i++) {
                let shipPart = document.createElement('div');
                shipPart = document.createElement('div');
                shipPart.classList.add('ship-part');
                shipPart.classList.add('shipPartNotSunk');
                shipPart.classList.add(`shipPartNotSunk${boardId}`);
                shipPart.classList.add(`ship-${shipNr}-part-${i}`);
                shipPart.classList.add(`${boardId}-ship-${shipNr}-part-${i}`);
                ship.appendChild(shipPart);
            }
            return ship;
        }
        if ((playerName === "Human") || (playerName === "Player 1") || (playerName === "Player 2")) {
            let shipContainer = document.createElement('div');
            shipContainer.setAttribute("class", "ship-container");
            shipContainer.classList.add(`shipContainer${boardId}`);
            shipContainer.classList.add(`shipContainer`);

            let ships = [createDraggableShips("2", "1"), createDraggableShips("3", "2"), createDraggableShips("4", "3"), createDraggableShips("4", "4")]
            for (let i = 0; i < ships.length; i++) {
                let shipSubContainer = document.createElement('div');
                shipSubContainer.classList.add('ship-sub-container');
                shipSubContainer.classList.add(`ship-sub-container-${i}`)
                let rotateIcon = document.createElement('ion-icon');
                rotateIcon.setAttribute('name', 'sync');
                rotateIcon.classList.add('rotate-ship-icon');
                rotateIcon.classList.add('rotateShipIcon');
                shipSubContainer.append(ships[i], rotateIcon);
                shipContainer.append(shipSubContainer);
            }
            playerContainer.append(shipContainer);
        } else {
            let ships = [createDraggableShips("2", "1"), createDraggableShips("3", "2"), createDraggableShips("4", "3"), createDraggableShips("4", "4")];
            playerContainer.append(ships[0], ships[1], ships[2], ships[3]);
            ships.forEach(ship => { ship.classList.add(`p2Ship${ships.indexOf(ship)}`) });
            ships.forEach(ship => { ship.classList.add('hide') });
        }

        boardsContainer.append(playerContainer);
    };

    function resetBoard() {
        while (boardsContainer.firstChild) {
            boardsContainer.removeChild(boardsContainer.firstChild)
        }
    }

    return {
        createBoard,
        resetBoard
    }
})();

const DisplayOthers = (function () {
    function switchPlayerModal() {
        let theSwitchModal = document.createElement('div');
        theSwitchModal.classList.add('switch-modal');
        theSwitchModal.classList.add('hide');

        let theSwitchButtonP1 = document.createElement('button');
        theSwitchButtonP1.textContent = "Player 1 Ready";
        theSwitchButtonP1.classList.add('button-style');
        theSwitchButtonP1.classList.add('p1ReadyBtn');//used?

        let theSwitchButtonP2 = document.createElement('button');
        theSwitchButtonP2.textContent = "Player 2 Ready";
        theSwitchButtonP2.classList.add('button-style');
        theSwitchButtonP2.classList.add('p2ReadyBtn');//used?


        theSwitchModal.append(theSwitchButtonP1, theSwitchButtonP2);

        let boardsContainer = document.querySelector('.boardsContainer');
        boardsContainer.append(theSwitchModal);
    }

    function clearPositionBtns() {
        let clearingBtns = document.querySelectorAll(".pShipReadyBtn")
        clearingBtns.forEach(btn => { btn.remove() });
    }
    function positionShipBtns() {
        clearPositionBtns()

        let shipPositioningButtonP1 = document.createElement('button');
        shipPositioningButtonP1.textContent = "Player 1 board ready";
        shipPositioningButtonP1.classList.add('button-style');
        shipPositioningButtonP1.classList.add('pShipReadyBtn');
        shipPositioningButtonP1.classList.add('p1ShipReadyBtn');//used?

        let shipPositioningButtonP2 = document.createElement('button');
        shipPositioningButtonP2.textContent = "Player 2 board ready";
        shipPositioningButtonP2.classList.add('button-style');
        shipPositioningButtonP2.classList.add('pShipReadyBtn');
        shipPositioningButtonP2.classList.add('p2ShipReadyBtn');//used?

        let messageContainer = document.querySelector('.messageContainer');
        messageContainer.append(shipPositioningButtonP1, shipPositioningButtonP2);
    }
    return {
        switchPlayerModal,
        clearPositionBtns,
        positionShipBtns
    }
})()

export {
    DisplayBoard,
    DisplayOthers
}
