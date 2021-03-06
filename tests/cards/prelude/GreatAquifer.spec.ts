
import { expect } from "chai";
import { GreatAquifer } from "../../../src/cards/prelude/GreatAquifer";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Game } from "../../../src/Game";
import { SelectSpace } from "../../../src/inputs/SelectSpace";

describe("GreatAquifer", function () {
    it("Should play", function () {
        const card = new GreatAquifer();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        const action = card.play(player, game);
        expect(action).not.to.eq(undefined);
        expect(action instanceof SelectSpace).to.eq(true);
    });
});
