import { Goal } from "../../types/goals.js";
import { Room } from "../../types/room.js";
import { devil } from "../roles/devil.js";

export const townWins = {
	name: "Town Wins",
	met: function (room: Room) {
		for (var player of room.players)
			if ((player.role.name = devil.name)) return false;
		return true;
	},
} satisfies Goal;
