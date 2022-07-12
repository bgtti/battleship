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
                shipPart.classList.add(`ship-${shipNr}-part-${i}`);
                ship.appendChild(shipPart);
            }
            return ship;
        }
        if ((playerName === "Human") || (playerName === "Player 1") || (playerName === "Player 2")) {
            let shipContainer = document.createElement('div');
            shipContainer.setAttribute("class", "ship-container");

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
        }

        boardsContainer.append(playerContainer);
    };

    function resetBoard() {
        while (boardsContainer.firstChild) {
            boardsContainer.removeChild(boardsContainer.firstChild)
        }
    }

    //drawing initial board
    createBoard("p1", "Human");
    createBoard("p2", "Computer");

    return {
        createBoard,
        resetBoard
    }
})();

export {
    DisplayBoard,
}
