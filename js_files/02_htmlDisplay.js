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

        function createDraggableShips(shipLength) {
            let ship = document.createElement('div');
            ship.setAttribute("draggable", "true"); //take this out when game starts
            ship.setAttribute("class", `ship-element-${shipLength}`);
            ship.classList.add(`${boardId}Ship`); //take this out when game starts
            ship.classList.add("ship-element-not-positioned"); //take this out when game starts
            return ship;
        }
        if ((playerName === "Human") || (playerName === "Player 1") || (playerName === "Player 2")) {
            let shipContainer = document.createElement('div');
            shipContainer.setAttribute("class", "ship-container");
            let ships = [createDraggableShips("1"), createDraggableShips("2")]
            shipContainer.append(ships[0], ships[1]);
            playerContainer.append(shipContainer);
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





export {
    DisplayBoard,
}
