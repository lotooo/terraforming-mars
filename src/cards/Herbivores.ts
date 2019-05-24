
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectPlayer } from "../inputs/SelectPlayer";

export class Herbivores implements IProjectCard {
    public cost: number = 12;
    public tags: Array<Tags> = [Tags.ANIMAL];
    public cardType: CardType = CardType.ACTIVE;
    public name: string = "Herbivores";
    public animals: number = 0;
    public text: string = "Requires 8% oxygen. Add 1 animal to this card. Decrease any plant production 1 step. When you place a greenery tile, add an animal to this card. Gain 1 VP per 2 animals on this card.";
    public description: string = "Inhabiting the green hills of Mars";
    public canPlay(player: Player, game: Game): boolean {
        return game.getOxygenLevel() >= 8 - player.requirementsBonus;
    }
    public play(player: Player, game: Game) {
        return new SelectPlayer(game.getPlayers(), "Select player to decrease plant production 1 step", (foundPlayer: Player) => {
            foundPlayer.plantProduction = Math.max(0, foundPlayer.plantProduction - 1);
            this.animals++;
            game.addGreeneryPlacedListener((placedPlayer: Player) => {
                if (placedPlayer === player) {
                    this.animals++;
                }
            });
            game.addGameEndListener(() => {
                player.victoryPoints += Math.floor(this.animals / 2);
            });
            return undefined;
        });
    }
}
