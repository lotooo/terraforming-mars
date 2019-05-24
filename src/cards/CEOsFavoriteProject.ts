
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { Tags } from "./Tags";
import { SelectCard } from "../inputs/SelectCard";

export class CEOsFavoriteProject implements IProjectCard {
    public cost: number = 1;
    public tags: Array<Tags> = [];
    public cardType: CardType = CardType.EVENT;
    public name: string = "CEO's Favorite Project";
    public text: string = "ADD 1 RESOURCE TO A CARD WITH AT LEAST 1 RESOURCE ON IT";
    public description: string = "Having the top man's attention, the involved people are sure to do their best";
    public canPlay(player: Player): boolean {
        return this.getAvailableCards(player).length > 0;
    }
    private getAvailableCards(player: Player): Array<IProjectCard> {
        return player.getCardsWithResources().filter((card) => card.animals || card.microbes || card.fighterResources || card.scienceResources);
    }
    public play(player: Player, _game: Game) {
        const availableCards = this.getAvailableCards(player);
        return new SelectCard("Select card to add resource", availableCards, (foundCards: Array<IProjectCard>) => {
            const foundCard = foundCards[0];
            if (foundCard.animals) {
                foundCard.animals++;
            } else if (foundCard.microbes) {
                foundCard.microbes++;
            } else if (foundCard.fighterResources) {
                foundCard.fighterResources++;
            } else if (foundCard.scienceResources) {
                foundCard.scienceResources++;
            }
            return undefined;
        });
    }
}

