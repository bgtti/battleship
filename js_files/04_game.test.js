import { Game } from "./04_game.js";
import { PositioningShips } from "./03_dragShips.js";


//test sortShips
test('tests sorting array by ship number', () => {
    let array = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['4', ['60', '61', '63', '64']], ['3', ['33', '41', '49', '57']]];
    const expected = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['3', ['33', '41', '49', '57']], ['4', ['60', '61', '63']]];
    expect(Game.sortShips(array)).toEqual(expect.arrayContaining(expected));
});
test('tests setShipPosition', () => {
    Game.startGame("Human", "Computer");
    PositioningShips.p1shipPosition = [['1', ['27', '28']], ['2', ['44', '45', '46']], ['4', ['60', '61', '63', '64']], ['3', ['33', '41', '49', '57']]];
    Game.setShipPosition("HC");
    const expected = ['33', '41', '49', '57'];
    expect(Game.player1.playersBoard.ships[2].shipPosition).toEqual(expect.arrayContaining(expected));
});