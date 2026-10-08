import { Goal } from "./goals.js";
import { Ability } from "./abilities.js";
import { Team } from "./team.js";

export interface Role {
	name: string;
	description: string;
	teams: Team[];
	abilities: Ability[];
	goals: Goal[];
}
