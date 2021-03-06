import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import {Game} from '../Game';
import {SelectPlayer} from '../inputs/SelectPlayer';
import {SelectSpace} from '../inputs/SelectSpace';

export class BigAsteroid implements IProjectCard {
    public cost: number = 27;
    public tags: Array<Tags> = [Tags.SPACE];
    public cardType: CardType = CardType.EVENT;
    public name: string = 'Big Asteroid';

    private doPlay(player: Player, game: Game): SelectSpace | undefined {
      player.titanium += 4;
      return game.increaseTemperature(player, 2);
    }
    public play(player: Player, game: Game) {

      const playersToRemovePlantsFrom = player.getOtherPlayersWithPlantsToRemove(game);

      if (game.getPlayers().length === 1 || playersToRemovePlantsFrom.length === 0) {
        return this.doPlay(player, game);
      }

      if (playersToRemovePlantsFrom.length === 1) {
        playersToRemovePlantsFrom[0].removePlants(player, 4, game);
        return this.doPlay(player, game);
      }

      return new SelectPlayer(
          playersToRemovePlantsFrom,
          'Select player to remove up to 4 plants from',
          (foundPlayer: Player) => {
            foundPlayer.removePlants(player, 4, game);
            return this.doPlay(player, game);
          }
      );
    }
}
