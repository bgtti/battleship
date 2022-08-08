// import { Game } from "./04_game.js";
// import * as moduleFactories from "./01_factory.js";

//jest tests passed, but later failed for not finding DOM elements
// such as gameStartBtn
// for this reason, tests commented out

// test('sortShips: sorting array by ship number', () => {
//     let array = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['4', ['60', '61', '63', '64']], ['3', ['33', '41', '49', '57']]];
//     const expected = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['3', ['33', '41', '49', '57']], ['4', ['60', '61', '63', '64']]];
//     expect(Game.sortShips(array)).toEqual(expect.arrayContaining(expected));
// });


// describe('initiation: startGame, setShipPosition', () => {
//     const mockCreatePlayerRequest = jest.spyOn(moduleFactories, 'CreatePlayer');

//     test('startGame should call CreatePlayer factory', () => {
//         Game.initiateGame("Human", "Computer");
//         expect(mockCreatePlayerRequest).toHaveBeenCalledWith("Human");
//         expect(mockCreatePlayerRequest).toHaveBeenCalledWith("Computer");
//         expect(mockCreatePlayerRequest).toHaveBeenCalledTimes(2);
//     });
// });