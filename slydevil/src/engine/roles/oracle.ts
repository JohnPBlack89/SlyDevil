import { Role } from "../../types/role.js";
import { townWins } from "../goals/townWins.js";
import { village } from "../teams/village.js";

export const oracle = {
	name: "Oracle",
	description: "See the future, taste the rainbow",
	teams: [village],
	abilities: [],
	goals: [townWins],
} satisfies Role;
