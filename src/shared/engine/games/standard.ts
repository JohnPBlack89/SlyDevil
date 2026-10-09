import { Game } from "../../types/game.js";
import { devil } from "../roles/devil.js";
import { oracle } from "../roles/oracle.js";
import { villager } from "../roles/villager.js";
import { warden } from "../roles/warden.js";
import { OpenVote } from "../rules/voteOpen.js";

export const standard = {
	name: "Standard",
	description: "Just a standard game",
	rules: [OpenVote],
	possible_roles: [devil, warden, oracle, villager],
	minPlayers: 5,
	maxPlayers: 12,
} satisfies Game;
