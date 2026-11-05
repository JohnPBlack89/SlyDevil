import { Goal } from "../../types/goal.js";
import { Room } from "../../classes/room.js";
import { devil } from "../roles/devil.js";

export const townWins = {
	name: "Town Wins",
	met: function (room: Room) {
		for (var player of room.players)
			if ((player.role.name = devil.name)) return false;
		return true;
	},
} satisfies Goal;
