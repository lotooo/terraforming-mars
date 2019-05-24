
import { expect } from "chai";
import { SymbioticFungus } from "../../src/cards/SymbioticFungus";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Ants } from "../../src/cards/Ants";

describe("SymbioticFungus", function () {
    it("Can't act or play", function () {
        const card = new SymbioticFungus();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        expect(card.canPlay(player, game)).to.eq(false);
        expect(card.canAct(player, game)).to.eq(false);
    });
    it("Should play", function () {
        const card = new SymbioticFungus();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        game.increaseTemperature(player, 3); // -24
        game.increaseTemperature(player, 3); // -18
        game.increaseTemperature(player, 2); // -14
        expect(card.play()).to.eq(undefined);
    });
    it("Should act", function () {
        const card = new SymbioticFungus();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        player.playedCards.push(new Ants());
        const action = card.action(player, game);
        expect(action).not.to.eq(undefined);
        action.cb([player.playedCards[0]]);
        expect(player.playedCards[0].microbes).to.eq(1);
    });
});
