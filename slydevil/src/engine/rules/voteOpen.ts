import { Rule } from "../../types/rule.js";
import { RuleType } from "./_index.js";

export const OpenVote = {
	name: "Open Vote",
	type: RuleType.voting,
} satisfies Rule;
