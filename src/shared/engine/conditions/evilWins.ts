import { Condition } from "../../types/conditions.js";
import { Room } from "../../types/room.js";

export const evilWins = {
	name: "Evil Wins",
	test: function (room: Room) {
		return true;
	},
} satisfies Condition;
