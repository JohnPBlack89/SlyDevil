import { Room } from "./room.js";

export interface Goal {
	name: string;
	met: (room: Room) => boolean;
}
