//factory function: making ships
function CreateShip(length) {
    return {
        shipLength: length,
        shipPosition: [],
        shipDirection: "not set", //only used for computer generated ships
        hitSpots: [],
        hasSunken: false,
        shipParts: [],
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
            } else if (verticalOrHorizontal === 2) {//if horizontal 
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
            verticalOrHorizontal === 1 ? this.shipDirection = "vertical" : this.shipDirection = "horizontal";
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
        checkIfCoordInArrayOfCoords(givenCoords, allCoords) { //check if elements in givenCoords are present in allCoords array
            let arrayIncludesElement = false;
            if (givenCoords.some(element => allCoords.includes(element))) {
                return true;
            }
            return arrayIncludesElement;

        },
        positionComputerShips() {
            this.ships[0].computerShipPositioning();
            let allPositions = [...this.ships[0].shipPosition];

            let counter = 1;
            let coordRepeted;

            while (counter < 4) {
                this.ships[counter].computerShipPositioning();
                let shipCoords = this.ships[counter].shipPosition;
                coordRepeted = this.checkIfCoordInArrayOfCoords(shipCoords, allPositions);
                if (coordRepeted === false) {
                    counter++;
                    allPositions.push(...shipCoords);
                    if (counter === 3) {
                        this.boardReady = true; //using?
                    }
                }
            }
        },
        receiveAttack(coordReceived) {
            const coord = parseInt(coordReceived);
            let missed = true;
            let shipAttacked = false;
            let shipSunk = false;
            for (let ship of this.ships) {
                if (ship.shipPosition.includes(coord)) {
                    missed = false;
                    shipAttacked = true;
                    ship.hit(coord);
                    if (ship.hasSunken === true) {
                        shipSunk = true;
                        this.shipsSunken++;
                    }
                }
            }
            if (missed === true) {
                this.missedAttacks.push(coord)
            }
            return [shipAttacked, shipSunk]
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
            if (!this.shotPositions.includes(randomCoord)) {
                this.shotPositions.push(randomCoord)
                return randomCoord.toString();
            }
        },
    }

}



export {
    CreateShip,
    GameboardFactory,
    CreatePlayer
}
