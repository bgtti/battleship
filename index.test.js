//import
const indexJS = require('./index.js');

//createShip
test('tests setPosition method: position was set', () => {
    const ship1 = indexJS.createShip(3);
    ship1.setPosition(["a1", "a2", "a3"]);
    const expected = ["a1", "a2", "a3"];
    expect(ship1.shipPosition).toEqual(expect.arrayContaining(expected));
});
test('tests setPosition method: position not set', () => {
    const ship1 = indexJS.createShip(3);
    ship1.setPosition(["a1", "a2", "a3", "a4"]);
    const expected = [];
    expect(ship1.shipPosition).toEqual(expect.arrayContaining(expected));
});
test('tests hit method: got hits', () => {
    const ship1 = indexJS.createShip(3);
    ship1.shipPosition = ["a1", "a2", "a3"];
    ship1.hit("a2");
    ship1.hit("a1");
    const expected = ["a2", "a1"];
    expect(ship1.hitSpots).toEqual(expect.arrayContaining(expected));
});
test('tests hit method: hit missed', () => {
    const ship1 = indexJS.createShip(3);
    ship1.shipPosition = ["a1", "a2", "a3"];
    ship1.hit("a11");
    const expected = [];
    expect(ship1.hitSpots).toEqual(expect.arrayContaining(expected));
});
test('tests isSunk method: sunken false', () => {
    const ship1 = indexJS.createShip(3);
    ship1.shipPosition = ["a1", "a2", "a3"];
    ship1.hit("a2");
    ship1.hit("b3");
    ship1.hit("a11");
    ship1.hit("a3");
    const expected = false;
    expect(ship1.hasSunken).toBe(expected);
})
test('tests isSunk method: sunk true', () => {
    const ship1 = indexJS.createShip(3);
    ship1.shipPosition = ["a1", "a2", "a3"];
    ship1.hit("a2");
    ship1.hit("a1");
    ship1.hit("a3");
    const expected = true;
    expect(ship1.hasSunken).toBe(expected);
})


//gameboard
test('ship creation in board', () => {
    const board1 = indexJS.gameboardFactory();
    const expected = 3;
    expect(board1.ships[0].shipLength).toEqual(expected);
});
test('check if all ships positioned: false', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.checkIfAllShipsPositioned()
    const expected = false;
    expect(board1.boardReady).toBe(expected);
});
test('check if all ships positioned: true', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.ships[1].setPosition(['b1', 'b2']);
    board1.checkIfAllShipsPositioned()
    const expected = true;
    expect(board1.boardReady).toBe(expected);
});
test('check receiveAttack method: missed', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.ships[1].setPosition(['b1', 'b2']);
    board1.receiveAttack('c1');
    const expected = 1;
    expect(board1.missedAttacks.length).toBe(expected);
});
test('check receiveAttack method: success ship hit', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.ships[1].setPosition(['b1', 'b2']);
    board1.receiveAttack('b1');
    const expected = 1;
    expect(board1.ships[1].hitSpots.length).toBe(expected);
});
test('check receiveAttack method: ship hit but not sunken', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.ships[1].setPosition(['b1', 'b2']);
    board1.receiveAttack('b1');
    const expected = 0;
    expect(board1.shipsSunken).toBe(expected);
});
test('check receiveAttack method: success ship sunken', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.ships[1].setPosition(['b1', 'b2']);
    board1.receiveAttack('b1');
    board1.receiveAttack('b2');
    const expected = 1;
    expect(board1.shipsSunken).toBe(expected);
});
test('check allShipsSunken method: all ships sunken false', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.ships[1].setPosition(['b1', 'b2']);
    board1.receiveAttack('b1');
    board1.receiveAttack('b2');
    const expected = false;
    expect(board1.allShipsSunken()).toBe(expected);
});
test('check allShipsSunken method: all ships sunken true', () => {
    const board1 = indexJS.gameboardFactory();
    board1.ships[0].setPosition(['a1', 'a2', 'a3']);
    board1.ships[1].setPosition(['b1', 'b2']);
    for (let i = 0; i < 4; i++) { board1.receiveAttack(`a${i}`) }
    for (let i = 0; i < 3; i++) { board1.receiveAttack(`b${i}`) }
    const expected = true;
    expect(board1.allShipsSunken()).toBe(expected);
});

//Player
test('check checkIfMoveLegal: illegal move', () => {
    const player1 = indexJS.createPlayer("human");
    player1.shotPositions = ['a1', 'a2', 'a3'];
    const expected = false;
    expect(player1.checkIfMoveLegal('a2')).toBe(expected);
});
test('check checkIfMoveLegal: legal move', () => {
    const player1 = indexJS.createPlayer("human");
    player1.shotPositions = ['a1', 'a2', 'a3'];
    const expected = true;
    expect(player1.checkIfMoveLegal('b2')).toBe(expected);
});

//
// test('...', () => {

//     const expected = ["..."];
//     expect(...)toEqual(expect.arrayContaining(expected));
// });