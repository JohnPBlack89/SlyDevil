import { Room } from "./room.js";

export interface Ability {
	name: string;
	use: (room: Room) => boolean;
}
