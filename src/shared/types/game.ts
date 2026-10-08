import { Role } from "./role.js";
import { Rule } from "./rule.js";

export interface Game {
	name: string;
	rules: Rule[];
	possible_roles: Role[];
}
