import { corruptedCop } from "../roles/corrupted-cop.js";
import { Gametype } from "../types/gametype.js";

export const wiseGuys = {
	name: "Wise Guys",
	description: "",
	rules: [],
	possible_roles: [corruptedCop],
	minPlayers: 5,
	maxPlayers: 12,
} satisfies Gametype;
