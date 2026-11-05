import { Room } from "../classes/room.js";

export interface Goal {
	name: string;
	met: (room: Room) => boolean;
}
