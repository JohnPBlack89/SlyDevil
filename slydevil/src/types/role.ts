import { Goal } from "./goal.js";
import { Ability } from "./ability.js";
import { Team } from "./team.js";

export interface Role {
	name: string;
	description: string;
	teams: Team[];
	abilities: Ability[];
	goals: Goal[];
}
