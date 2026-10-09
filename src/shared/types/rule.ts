import { RuleType } from "../engine/rules/_index.js";

export interface Rule {
	name: string;
	type: RuleType;
}
