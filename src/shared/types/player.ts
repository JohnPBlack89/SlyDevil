import { Account } from "./account.js";
import { Role } from "./role.js";
import { Status } from "./status.js";

export interface Player {
	account?: Account;
	role: Role;
	status: Status[];
}
