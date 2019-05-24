
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { ISpace } from "../ISpace";
import { SelectSpace } from "../inputs/SelectSpace";

export class ImmigrantCity implements IProjectCard {
    public cost: number = 13;
    public tags: Array<Tags> = [Tags.CITY, Tags.STEEL];
    public cardType: CardType = CardType.ACTIVE;
    public name: string = "Immigrant City";
    public text: string = "Decrease your energy production 1 step and decrease your mega credit production 2 steps. Place a city tile. Each time a city tile is placed, including this, increase your mega credit production 1 step.";
    public description: string = "Taking care of immigrants is costly, but will begin to pay off when they start working for you in the growing society.";
    public canPlay(player: Player): boolean {
        return player.energyProduction >= 1 && player.megaCreditProduction >= 3;
    }
    public play(player: Player, game: Game) {
        return new SelectSpace("Select space for city tile", game.getAvailableSpacesOnLand(player), (space: ISpace) => {
            game.addCityTile(player, space.id);
            player.energyProduction--;
            player.megaCreditProduction++;
            game.addCityTilePlacedListener(() => {
                player.megaCreditProduction++;
            });
            return undefined;
        });
    }
}
