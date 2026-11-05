import { Room } from "../classes/room.js";

export interface Ability {
	name: string;
	use: (room: Room) => boolean;
}
