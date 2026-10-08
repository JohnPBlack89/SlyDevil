import { Role } from "../../types/role.js";
import { townWins } from "../goals/townWins.js";
import { village } from "../teams/village.js";

export const warden = {
	name: "Warden",
	description: "Savior of... other... people I guess",
	teams: [village],
	abilities: [],
	goals: [townWins],
} satisfies Role;
