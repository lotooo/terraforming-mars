import { expect } from "chai";
import { StormCraftIncorporated } from "../../../src/cards/colonies/StormCraftIncorporated";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";

describe("StormCraftIncorporated", function () {
    it("Should play", function () {
        const card = new StormCraftIncorporated();
        const player = new Player("test", Color.BLUE, false);
        const play = card.play();
        expect(play).to.eq(undefined);

        player.corporationCard = card;

        const action = card.action(player);
        expect(action).to.eq(undefined);
        expect(player.getResourcesOnCard(card)).to.eq(1);
    });
});