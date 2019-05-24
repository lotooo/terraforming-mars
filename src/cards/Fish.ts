
import { IActionCard } from "./ICard";
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { SelectPlayer } from "../inputs/SelectPlayer";
import { Player } from "../Player";
import { Game } from "../Game";

export class Fish implements IActionCard, IProjectCard {
    public cost: number = 9;
    public tags: Array<Tags> = [Tags.ANIMAL];
    public name: string = "Fish";
    public animals: number = 0;
    public cardType: CardType = CardType.ACTIVE;
    public actionText: string = "Add 1 animal to this card";
    public text: string = "Requires +2C or warmer. Decrease any plant production 1 step. Gain 1 victory point for each animal on this card.";
    public description: string = "Martian barracudas? Why not!";
    public canPlay(player: Player, game: Game): boolean {
        return game.getTemperature() >= 2 - (player.requirementsBonus * 2);
    }
    public play(player: Player, game: Game) {
        return new SelectPlayer(game.getPlayers(), "Select player to decrease plant production 1 step", (foundPlayer: Player) => {
            foundPlayer.plantProduction = Math.max(0, foundPlayer.plantProduction - 1);
            game.addGameEndListener(() => {
                player.victoryPoints += this.animals;
            });
            return undefined;
        });
    }
    public canAct(): boolean {
        return true;
    }
    public action(_player: Player, _game: Game) {
        this.animals++;
        return undefined;
    }
}
