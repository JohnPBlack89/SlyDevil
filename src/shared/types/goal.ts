import { Condition } from "./conditions.js";

export interface Goal {
	name: string;
	conditions: Condition[];
}
