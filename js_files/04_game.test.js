import { Game } from "./04_game.js";
// import * as moduleDragShips from "./03_dragShips.js";
import { PositioningShips } from "./03_dragShips.js";
import * as moduleFactories from "./01_factory.js";


//test sortShips
test('sortShips: sorting array by ship number', () => {
    let array = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['4', ['60', '61', '63', '64']], ['3', ['33', '41', '49', '57']]];
    const expected = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['3', ['33', '41', '49', '57']], ['4', ['60', '61', '63', '64']]];
    expect(Game.sortShips(array)).toEqual(expect.arrayContaining(expected));
});


describe('initiation: startGame, setShipPosition', () => {
    const mockCreatePlayerRequest = jest.spyOn(moduleFactories, 'CreatePlayer');
    // const mockGameboardFactory = jest.spyOn(moduleFactories, 'GameboardFactory');
    // const mockCreateShip = jest.spyOn(moduleFactories, 'CreateShip');

    test('startGame should call CreatePlayer factory', () => {
        Game.initiateGame("Human", "Computer");
        expect(mockCreatePlayerRequest).toHaveBeenCalledWith("Human");
        expect(mockCreatePlayerRequest).toHaveBeenCalledWith("Computer");
        expect(mockCreatePlayerRequest).toHaveBeenCalledTimes(2);
    });

    // test('setShipPosition to save coordinates in player', () => {
    //     jest.mock('./01_factory.js', () => {
    //         const originalModule = jest.requireActual('./01_factory.js');
    //         return {
    //             __esModule: true,
    //             ...originalModule
    //         };
    //     });
    //     let player1;
    //     let player2;
    //     Game.startGame("Human", "Computer");
    //     let sampleArray = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['4', ['60', '61', '63', '64']], ['3', ['33', '41', '49', '57']]];
    //     PositioningShips.p1shipPosition = sampleArray;
    //     Game.setShipPosition("HC");
    //     const expected = ['33', '41', '49', '57'];
    //     expect(mockCreatePlayerRequest).toHaveBeenCalledWith("Human");
    //     // expect(mockGameboardFactory).toHaveBeenCalled();
    //     // expect(mockCreateShip).toHaveBeenCalled();
    //     expect(PositioningShips.p1shipPosition).toEqual(expect.arrayContaining(sampleArray));
    //     expect(console.log(Game.player1.playersBoard.ships[2].shipPosition)).toEqual(expect.arrayContaining(expected));
    //     // expect(Game.setShipPosition).toHaveBeenCalledWith("HC");
    //     // expect(Game.player1.playersBoard.ships[2].shipPosition).toEqual(expect.arrayContaining(expected));


    //     // const mockedShipPosition = jest.spyOn(moduleDragShips, 'PositioningShips.p1shipPosition');
    //     // mockedShipPosition.mockImplementation(() => sampleArray);

    //     // const mockPositioningShipsRequest = jest.createMockFromModule(moduleDragShips, 'PositioningShips').mockReturnValue(sampleArray);
    //     // PositioningShips.p1shipPosition = sampleArray;


    //     // expect(mockPositioningShipsRequest).toHaveBeenCalledTimes(1);
    //     // expect(Game.player1.playersBoard.ships[2].shipPosition).toEqual(expect.arrayContaining(expected));

    // });
});







// test('tests setShipPosition', () => {
//     Game.startGame("Human", "Computer");
//     PositioningShips.p1shipPosition = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['4', ['60', '61', '63', '64']], ['3', ['33', '41', '49', '57']]];
//     Game.setShipPosition("HC");
//     const expected = ['33', '41', '49', '57'];
//     expect(Game.player1.playersBoard.ships[2].shipPosition).toEqual(expect.arrayContaining(expected));
// });



//Understand dependency injection and jest mocking: Mock a module with jest.mock


//https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c#:~:text=Mocking%20is%20a%20technique%20to,module%20that%20the%20subject%20imports.
//https://medium.com/codeclan/mocking-es-and-commonjs-modules-with-jest-mock-37bbb552da43