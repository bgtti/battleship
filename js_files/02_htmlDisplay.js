function createBoard(boardId, playerName) {
    const boardsContainer = document.querySelector(".boardsContainer");
    const board = document.createElement('div');
    board.setAttribute("class", `board-${boardId}`);
    for (let i = 1; i < 65; i++) {
        let coord = document.createElement('div');
        coord.setAttribute(`data-${boardId}`, `${i}`);
        coord.setAttribute("class", "coord-div");
        board.appendChild(coord);
    }
    const playerContainer = document.createElement('div');
    playerContainer.setAttribute("class", "player-container");

    const namePlayer = document.createElement('h2');
    namePlayer.textContent = playerName;
    namePlayer.setAttribute("class", "player-name");

    playerContainer.append(namePlayer, board)

    boardsContainer.append(playerContainer);
};

export {
    createBoard,
}
