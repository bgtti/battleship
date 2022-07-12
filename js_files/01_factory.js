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
            function generateRandomCoord() { return Math.floor((Math.random() * 64) + 1) };
            let randomCoord = generateRandomCoord();
            while (this.shotPositions.includes(randomCoord)) {
                randomCoord = generateRandomCoord();
            }
            return randomCoord.toString();

        }
    }

}



export {
    CreateShip,
    GameboardFactory,
    CreatePlayer
}
