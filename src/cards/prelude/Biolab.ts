import { Tags } from "../Tags";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { PreludeCard } from "./PreludeCard";
import { IProjectCard } from "../IProjectCard";
import { Resources } from '../../Resources';

export class Biolab extends PreludeCard implements IProjectCard {
    public tags: Array<Tags> = [Tags.SCIENCE];
    public name: string = "Biolab";
    public play(player: Player, game: Game) {
        player.setProduction(Resources.PLANTS);
		for (let i = 0; i < 3; i++) {
		    player.cardsInHand.push(game.dealer.dealCard());
		}
        return undefined;
    }
}

