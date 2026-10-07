import { Room } from "./room.js";

export interface Condition {
	name: string;
	test: (room: Room) => boolean;
}
