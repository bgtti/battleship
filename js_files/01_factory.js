//factory function: making ships
function CreateShip(length) {
    return {
        shipLength: length,
        shipPosition: [],
        hitSpots: [],
        hasSunken: false,
        setPosition(coords) {
            if (coords.length == this.shipLength) { this.shipPosition = coords };
        },
        isSunk() {
            if (this.shipPosition.every(e => this.hitSpots.includes(e))) {
                this.hasSunken = true;
            }
        },
        hit(coord) {
            if (this.shipPosition.includes(coord)) {
                this.hitSpots.push(coord);
                this.isSunk();
            };
        },
        generateRandomCoord() {
            return Math.floor((Math.random() * 64) + 1); //should return a number between (and including) 1 and 64
        },
        generateRandomDirection() {
            return Math.floor(Math.random() * (2) + 1); //should return either 1 (Vertical) or 2 (Horizontal)
        },
        computerShipCoordGenerator(firstCoord, verticalOrHorizontal) {
            //takes in arguments and creates the other ship coords
            let coordinates = [];
            let randomPosition = firstCoord;
            let length = this.shipLength;

            coordinates.push(randomPosition);

            if (verticalOrHorizontal === 1) {//if vertical
                if ((((length - 1) * 8) + randomPosition) <= 64) {
                    for (let i = 1; i < length; i++) {
                        let nextCoord = randomPosition + (8 * i);
                        coordinates.push(nextCoord);
                    }
                } else {
                    for (let i = 1; i < length; i++) {
                        let previousCoord = randomPosition - (8 * i);
                        coordinates.unshift(previousCoord);
                    }
                }
            } else if (verticalOrHorizontal === 2) {//if horizontal *** not finished
                let limitCoord = [];

                for (let i = 1; i <= 8; i++) {
                    let theMultiple = i * 8;

                    if (length > 2) {
                        for (let i = (length - 2); i > 0; i--) {
                            let theLimit = theMultiple - i;
                            limitCoord.push(theLimit);
                        }
                    }
                    limitCoord.push(theMultiple);
                }
                if (limitCoord.includes(randomPosition)) {
                    for (let i = 1; i < length; i++) {
                        let previousCoord = randomPosition - i;
                        coordinates.unshift(previousCoord);
                    }
                } else {
                    for (let i = 1; i < length; i++) {
                        let previousCoord = randomPosition + i;
                        coordinates.push(previousCoord);
                    }
                }
            }

            return coordinates
        },
        computerShipPositioning() {
            //takes callback functions to generate the first coord and ship direction. Then another callback to generate the other coordinates
            //checks if the generated coordinates are legal and if so, positions the ship
            let randomPosition = this.generateRandomCoord();
            let verticalOrHorizontal = this.generateRandomDirection();
            this.shipPosition = this.computerShipCoordGenerator(randomPosition, verticalOrHorizontal);
        }
    }
};

//Gameboard factory
//Should create 2 boards
function GameboardFactory() {
    return {
        boardReady: false, //checks if all ships have been placed
        ships: [CreateShip(2), CreateShip(3), CreateShip(4), CreateShip(4)],
        missedAttacks: [],
        shipsSunken: 0,

        checkIfAllShipsPositioned() {
            let shipPlacement = [this.ships[0].shipPosition, this.ships[1].shipPosition, this.ships[2].shipPosition, this.ships[3].shipPosition];
            shipPlacement.some(e => {
                e.length === 0 ? this.boardReady = false : this.boardReady = true;
            });
        },
        checkIfCoordInArrayOfCoords(singleArray, arrayOfArrays) { //check if elements in singleArray are present in any array in arrayOfArrays
            let arrayIncludesElement = false;
            for (let arr of arrayOfArrays) {
                if (singleArray.some(element => arr.includes(element))) {
                    arrayIncludesElement = true;
                }
            }
            return arrayIncludesElement;

        },
        positionComputerShips() {
            this.ships[0].computerShipPositioning();
            let allPositions = [[this.ships[0].computerShipPositioning()]];

            for (let i = 1; i < 4; i++) {
                this.ships[i].computerShipPositioning();
                let shipCoords = this.ships[i].shipPosition;
                let coordRepeted = this.checkIfCoordInArrayOfCoords(shipCoords, allPositions);

                while (coordRepeted === true) {
                    this.ships[i].computerShipPositioning();
                    shipCoords = this.ships[i].shipPosition;
                    coordRepeted = this.checkIfCoordInArrayOfCoords(shipCoords, allPositions);
                }
                allPositions.push(shipCoords);
            }
            this.boardReady = true;
        },
        receiveAttack(coord) {
            let missed = true;
            let shipAttacked = false;
            for (let ship of this.ships) {
                if (ship.shipPosition.includes(coord)) {
                    missed = false;
                    shipAttacked = true;
                    ship.hit(coord);
                    if (ship.hasSunken === true) {
                        this.shipsSunken++;
                    }
                }
            }
            if (missed === true) {
                this.missedAttacks.push(coord)
            }
            return shipAttacked
        },
        allShipsSunken() {
            if (this.ships.length === this.shipsSunken) {
                return true;
            } else { return false };
        }

    }
}

//Player
function CreatePlayer(type) {
    return {
        playerType: type, //computer or human
        playersTurn: false, //true or false
        shotPositions: [], //positions shot on the other player's board
        playersBoard: GameboardFactory(),
        checkIfMoveLegal(coord) {
            if (this.shotPositions.includes(coord)) {
                return false
            } else {
                this.shotPositions.push(coord);
                this.playersTurn = false;
                return true
            }
        },

        computerShooting() {
            //check if a coord free, then shoot it
            function generateRandomCoord() { return Math.floor((Math.random() * 64) + 1) }; //should return a number between (and including) 1 and 64}
            let randomCoord = generateRandomCoord();
            while (this.shotPositions.includes(randomCoord)) {
                randomCoord = generateRandomCoord();
            }
            return randomCoord.toString();
        },
    }

}



export {
    CreateShip,
    GameboardFactory,
    CreatePlayer
}


// let arr1 = [[1, 2], [3, 4, 5], [6, 7, 8, 9]];
// let arr2 = [20, 88];
// let arrIncludes = false;
// for (let arr of arr1) {
//     if (arr2.some(element => arr.includes(element))) {
//         arrIncludes = true;
//     }

// }
// console.log(arrIncludes)


// arr1.forEach(arr => arr2.some(element => arr.includes(element)));

// arr2.some(element => arr1.forEach(position => position.includes(element)));