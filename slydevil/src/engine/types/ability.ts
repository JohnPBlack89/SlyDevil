import { Role } from "react-native";
import { Account } from "../classes/account.js";
import { Player } from "../classes/player.js";
import { Room } from "../classes/room.js";
import { Gametype } from "./gametype.js";
import { Goal } from "./goal.js";
import { Rule } from "./rule.js";
import { State } from "./state.js";
import { Status } from "./status.js";
import { Team } from "./team.js";

type AllowedTypes =
	| Account
	| Player
	| Room
	| Ability
	| Gametype
	| Goal
	| Role
	| Rule
	| State
	| Status
	| Team;

export interface Ability {
	name: string;
	use: (room: Room, ...items: AllowedTypes[]) => void;
}
