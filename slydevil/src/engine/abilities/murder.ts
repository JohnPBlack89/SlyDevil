import { Ability } from "../types/ability.js";
import { Room } from "../classes/room.js";
import { Player } from "../classes/player.js";
import { dead } from "../statuses/dead.js";

export const murder = {
	name: "Murder",
	use: (room: Room, ...items) => {
		if (items.length != 1)
			throw new Error("Must pass a single player to be murdered");

		if (typeof items[0] != typeof Player)
			throw new Error("Must pass a player to be murdered");

		const player = items[0] as Player;

		player.addStatus(dead);
	},
} satisfies Ability;
