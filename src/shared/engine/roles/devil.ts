import { Role } from "../../types/role.js";
import { murder } from "../abilities/murder.js";
import { evilWins } from "../goals/evilWins.js";
import { evil } from "../teams/evil.js";
export const devil = {
	name: "Devil",
	description: "Choose a living player to attack each night.",
	teams: [evil],
	abilities: [murder],
	goals: [evilWins],
} satisfies Role;
