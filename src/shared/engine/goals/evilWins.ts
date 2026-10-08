import { Goal } from "../../types/goals.js";
import { Player } from "../../types/player.js";
import { Room } from "../../types/room.js";
import { Team } from "../../types/team.js";
import { evil } from "../teams/evil.js";

export const evilWins = {
	name: "Evil Wins",
	met: function (room: Room) {
		var evilCount = room.players.filter(
			(player: Player) =>
				player.role.teams.findIndex((t: Team) => (t.name = evil.name)) != 0,
		).length;

		return room.players.length / 2 <= evilCount;
	},
} satisfies Goal;
