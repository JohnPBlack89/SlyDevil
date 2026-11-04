import { Ability } from "../../types/ability.js";
import { Room } from "../../types/room.js";

export const murder = {
	name: "Murder",
	use: (room: Room) => {
		return true;
	},
} satisfies Ability;
