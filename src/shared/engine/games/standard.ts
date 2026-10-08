import { Game } from "../../types/game.js";
import { devil } from "../roles/devil.js";
import { oracle } from "../roles/oracle.js";
import { villager } from "../roles/villager.js";
import { warden } from "../roles/warden.js";

export const standard = {
	name: "Standard",
	rules: [],
	possible_roles: [devil, warden, oracle, villager],
} satisfies Game;
