import { Player } from "./player.js";
import { Rule } from "./rule.js";

export interface Game {
	name: string;
	rules: Rule[];
}
