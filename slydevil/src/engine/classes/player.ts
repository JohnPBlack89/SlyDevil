import { Ability } from "../types/ability.js";
import { Account } from "./account.js";
import { Role } from "../types/role.js";
import { Status } from "../types/status.js";

export interface Player {
	id: string;
	account?: Account;
	role: Role;
	status: Status[];
	abilities: Ability[];
}
