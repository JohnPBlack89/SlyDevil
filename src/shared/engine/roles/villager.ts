import { Role } from "../../types/role.js";
import { townWins } from "../goals/townWins.js";
import { village } from "../teams/village.js";

export const villager = {
	name: "Villager",
	description: "Just some random lady or dude",
	teams: [village],
	abilities: [],
	goals: [townWins],
} satisfies Role;
