//import
// const factoryJS = require('./01_factory.js');
import { CreateShip, GameboardFactory, CreatePlayer } from "./01_factory.js"

//CreateShip
describe("CreateShip: test shipPositionMethod", () => {
    test('setPosition: position was set', () => {
        const ship1 = CreateShip(3);
        ship1.setPosition(["1", "2", "3"]);
        const expected = ["1", "2", "3"];
        expect(ship1.shipPosition).toEqual(expect.arrayContaining(expected));
    });
    test('tests setPosition method: position not set', () => {
        const ship1 = CreateShip(3);
        ship1.setPosition(["1", "2", "3", "4"]);
        const expected = [];
        expect(ship1.shipPosition).toEqual(expect.arrayContaining(expected));
    });

});

describe("CreateShip: test hit method", () => {
    test('hit method: got hits', () => {
        const ship1 = CreateShip(3);
        ship1.shipPosition = ["1", "2", "3"];
        ship1.hit("1");
        ship1.hit("2");
        const expected = ["1", "2"];
        expect(ship1.hitSpots).toEqual(expect.arrayContaining(expected));
    });
    test('hit method: hit missed', () => {
        const ship1 = CreateShip(3);
        ship1.shipPosition = ["1", "2", "3"];
        ship1.hit("11");
        const expected = [];
        expect(ship1.hitSpots).toEqual(expect.arrayContaining(expected));
    });
});

describe("CreateShip: isSunk method method", () => {
    test('isSunk method: sunken false', () => {
        const ship1 = CreateShip(3);
        ship1.shipPosition = ["1", "2", "3"];
        ship1.hit("2");
        ship1.hit("3");
        ship1.hit("11");
        ship1.hit("22");
        const expected = false;
        expect(ship1.hasSunken).toBe(expected);
    });
    test('isSunk method: sunk true', () => {
        const ship1 = CreateShip(3);
        ship1.shipPosition = ["1", "2", "3"];
        ship1.hit("2");
        ship1.hit("3");
        ship1.hit("1");
        const expected = true;
        expect(ship1.hasSunken).toBe(expected);
    });
});

describe("CreateShip: computerShipCoordGenerator", () => {
    test('computerShipCoordGenerator: horizontal position (1/2)', () => {
        const ship1 = CreateShip(3);
        const expected = [3, 4, 5];
        expect(ship1.computerShipCoordGenerator(3, 2)).toEqual(expect.arrayContaining(expected));
    });
    test('computerShipCoordGenerator: horizontal position (2/2)', () => {
        const ship1 = CreateShip(3);
        const expected = [53, 54, 55];
        expect(ship1.computerShipCoordGenerator(55, 2)).toEqual(expect.arrayContaining(expected));
    });
    test('computerShipCoordGenerator: vertical position (1/2)', () => {
        const ship1 = CreateShip(4);
        const expected = [37, 45, 53, 61];
        expect(ship1.computerShipCoordGenerator(61, 1)).toEqual(expect.arrayContaining(expected));
    });
    test('computerShipCoordGenerator: vertical position (2/2)', () => {
        const ship1 = CreateShip(2);
        const expected = [7, 15];
        expect(ship1.computerShipCoordGenerator(7, 1)).toEqual(expect.arrayContaining(expected));
    });
});

describe("CreateShip: computerShipPositioning", () => {
    test('computerShipPositioning: length of ship positioned', () => {
        const ship1 = CreateShip(3);
        ship1.computerShipPositioning()
        const expected = 3;
        expect(ship1.shipPosition.length).toBe(expected);
    });
});

//GameboardFactory
describe("GameboardFactory: ships", () => {
    test('ships: ship creation', () => {
        const board1 = GameboardFactory();
        const expected = 2;
        expect(board1.ships[0].shipLength).toEqual(expected);
    });
});

describe("GameboardFactory: checkIfAllShipsPositioned", () => {
    test('checkIfAllShipsPositioned: false', () => {
        const board1 = GameboardFactory();
        board1.ships[0].setPosition(['1', '2', '3']);
        board1.checkIfAllShipsPositioned()
        const expected = false;
        expect(board1.boardReady).toBe(expected);
    });
    test('checkIfAllShipsPositioned: true', () => {
        const board1 = GameboardFactory();
        board1.ships[0].setPosition(['4', '5']);
        board1.ships[1].setPosition(['1', '2', '3']);
        board1.ships[2].setPosition(['9', '10', '11', '12']);
        board1.ships[3].setPosition(['17', '18', '19', '20']);
        board1.checkIfAllShipsPositioned()
        const expected = true;
        expect(board1.boardReady).toBe(expected);
    });
});

describe("GameboardFactory: checkIfCoordInArrayOfCoords method", () => {
    test('checkIfCoordInArrayOfCoords: true/false', () => {
        const board1 = GameboardFactory();
        const array1 = ['17', '18', '19', '20'];
        const array2 = ['24', '62', '63', '20', '33'];
        const array3 = ['24', '62', '63', '21', '33'];
        expect(board1.checkIfCoordInArrayOfCoords(array1, array2)).toBe(true);
        expect(board1.checkIfCoordInArrayOfCoords(array1, array3)).toBe(false);
    });
});

describe("GameboardFactory: positionComputerShips", () => {
    test('positionComputerShips positions ships and sets board as ready', () => {
        const board1 = GameboardFactory();
        board1.positionComputerShips()
        const expected = true;
        expect(board1.ships[0].shipPosition.length).toBe(2);
        expect(board1.ships[1].shipPosition.length).toBe(3);
        expect(board1.ships[2].shipPosition.length).toBe(4);
        expect(board1.ships[3].shipPosition.length).toBe(4);
        expect(board1.boardReady).toEqual(expected);
    });
});


describe("GameboardFactory: receiveAttack method", () => {
    test('receiveAttack method: missed hits', () => {
        const board1 = GameboardFactory();
        board1.ships[0].setPosition([1, 2]);
        board1.ships[1].setPosition([3, 4, 5]);
        board1.ships[2].setPosition([9, 10, 11, 12]);
        board1.ships[3].setPosition([17, 18, 19, 20]);
        board1.receiveAttack('21');
        board1.receiveAttack('10');
        board1.receiveAttack(19);
        const expectedLength = 1;
        const expectedMissed = [21];
        const expectedSunk = 0;
        const expectedHit = false;
        expect(board1.missedAttacks.length).toBe(expectedLength);
        expect(board1.missedAttacks).toEqual(expect.arrayContaining(expectedMissed));
        expect(board1.shipsSunken).toBe(expectedSunk);
        expect(board1.receiveAttack(33)[0]).toBe(expectedHit);
    });
    test('receiveAttack method: ship hit but not sunken', () => {
        const board1 = GameboardFactory();
        board1.ships[0].setPosition([1, 2]);
        board1.ships[1].setPosition([3, 4, 5]);
        board1.ships[2].setPosition([9, 10, 11, 12]);
        board1.ships[3].setPosition([17, 18, 19, 20]);
        board1.receiveAttack(3);
        board1.receiveAttack(4);
        const expectedSunken = 0;
        const expectedHit = true;
        const expectedSank = false;
        expect(board1.shipsSunken).toBe(expectedSunken);
        expect(board1.receiveAttack(9)[0]).toBe(expectedHit);
        expect(board1.receiveAttack(9)[1]).toBe(expectedSank);
    });
    test('receiveAttack method: ship hit and sunken', () => {
        const board1 = GameboardFactory();
        board1.ships[0].setPosition([1, 2]);
        board1.ships[1].setPosition([3, 4, 5]);
        board1.ships[2].setPosition([9, 10, 11, 12]);
        board1.ships[3].setPosition([17, 18, 19, 20]);
        board1.receiveAttack(2);
        board1.receiveAttack(1);
        board1.receiveAttack(3);
        board1.receiveAttack(4);
        const expectedSunken = 1;
        const expectedHit = true;
        const expectedSank = true;
        expect(board1.shipsSunken).toBe(expectedSunken);
        expect(board1.receiveAttack(5)[0]).toBe(expectedHit);
        expect(board1.receiveAttack(5)[1]).toBe(expectedSank);
    });
});

describe("GameboardFactory: allShipsSunken", () => {
    test('allShipsSunken method: all ships sunken false', () => {
        const board1 = GameboardFactory();
        board1.ships[0].setPosition([1, 2]);
        board1.ships[1].setPosition([3, 4, 5]);
        board1.ships[2].setPosition([9, 10, 11, 12]);
        board1.ships[3].setPosition([17, 18, 19, 20]);
        for (let i = 1; i < 3; i++) { board1.receiveAttack(`${i}`) }
        for (let i = 3; i < 6; i++) { board1.receiveAttack(`${i}`) }
        board1.receiveAttack(9);
        const expected = false;
        expect(board1.allShipsSunken()).toBe(expected);
    });
    test('allShipsSunken method: all ships sunken true', () => {
        const board1 = GameboardFactory();
        board1.ships[0].setPosition([1, 2]);
        board1.ships[1].setPosition([3, 4, 5]);
        board1.ships[2].setPosition([9, 10, 11, 12]);
        board1.ships[3].setPosition([17, 18, 19, 20]);
        for (let i = 1; i < 3; i++) { board1.receiveAttack(`${i}`) }
        for (let i = 3; i < 6; i++) { board1.receiveAttack(`${i}`) }
        for (let i = 9; i < 13; i++) { board1.receiveAttack(`${i}`) }
        for (let i = 17; i < 21; i++) { board1.receiveAttack(`${i}`) }
        const expected = true;
        expect(board1.allShipsSunken()).toBe(expected);
    });
});

//CreatePlayer
describe("CreatePlayer: checkIfMoveLegal", () => {
    test('checkIfMoveLegal: legal and illegal move', () => {
        const player1 = CreatePlayer("human");
        player1.shotPositions = [9, 10, 11, 12];
        player1.checkIfMoveLegal(13)
        const expected = false;
        const expected2 = true;
        const expected3 = [9, 10, 11, 12, 13];
        expect(player1.shotPositions).toEqual(expect.arrayContaining(expected3));
        expect(player1.checkIfMoveLegal(9)).toBe(expected);
        expect(player1.checkIfMoveLegal(14)).toBe(expected2);
    });
});

describe("CreatePlayer: computerShooting", () => {
    test('computerShooting moves yield nr from 0 to 64', () => {
        const player1 = CreatePlayer("computer");
        const expected1 = 65;
        const expected2 = 0;
        expect(parseInt(player1.computerShooting())).toBeLessThan(expected1);
        expect(parseInt(player1.computerShooting())).toBeGreaterThan(expected2);
    });
});




