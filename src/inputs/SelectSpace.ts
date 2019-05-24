
import { PlayerInput } from "../PlayerInput";
import { ISpace } from "../ISpace";
import { PlayerInputTypes } from "../PlayerInputTypes";

export class SelectSpace implements PlayerInput {
    public inputType: PlayerInputTypes = PlayerInputTypes.SELECT_SPACE;
    public onend?: () => void;
    constructor(public title: string, public availableSpaces: Array<ISpace>, public cb: (space: ISpace) => PlayerInput | undefined) {
        if (availableSpaces.length === 0) {
            throw "No available spaces";
        }
    }
}
