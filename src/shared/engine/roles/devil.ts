import { Role } from "../../types/role.js";
import { murder } from "../abilities/murder.js";
import { evil } from "../teams/evil.js";
export const devil = {
	name: "Devil",
	description: "Choose a living player to attack each night.",
	teams: [evil],
	abilities: [murder],
	goals: [
		{
			name: "Outnumber the town",
			conditions: [
				{ name: "Devils equal or outnumber living town", met: false },
			],
		},
	],
} satisfies Role;
