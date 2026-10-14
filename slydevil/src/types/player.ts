import { Ability } from "./abilities.js";
import { Account } from "./account.js";
import { Role } from "./role.js";
import { Status } from "./status.js";

export interface Player {
	id: string;
	account?: Account;
	role: Role;
	status: Status[];
	abilities: Ability[];
}
