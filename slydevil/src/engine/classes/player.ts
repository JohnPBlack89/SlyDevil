import { Ability } from "../types/ability.js";
import { Account } from "./account.js";
import { Role } from "../types/role.js";
import { Status } from "../types/status.js";
import { v7 } from "uuid";

export class Player {
	private _id: string;
	private _account: Account;
	private _role: Role;
	private _statuses: Status[];
	private _abilities: Ability[];

	constructor(account: Account, role: Role) {
		this._id = Player.generateId();
		this._account = account;
		this._role = role;
		this._statuses = [];
		this._abilities = this._role.abilities;
	}

	private static generateId(): string {
		console.log("Need to add validation to ensure no duplicates");
		return v7().toString();
	}
	get id(): string {
		return this._id;
	}

	get account(): Account {
		return this._account;
	}

	get role(): Role {
		return this._role;
	}
	set role(role: Role) {
		this._role = role;
	}

	addStatus(status: Status) {
		if (
			this._statuses.findIndex((existingStatus) => existingStatus == status) !=
			null
		)
			throw Error("Can't add status again");

		this._statuses.push(status);
	}
	removeStatus(status: Status) {
		if (
			this._statuses.findIndex((existingStatus) => existingStatus == status) ==
			null
		)
			throw Error("Can't find status");

		this._statuses = this._statuses.filter(
			(currentstatus) => currentstatus != status,
		);
	}
	get statuses(): readonly Status[] {
		return this._statuses;
	}

	addAbility(ability: Ability) {
		if (
			this._abilities.findIndex(
				(existingability) => existingability == ability,
			) != null
		)
			throw Error("Can't add ability again");

		this._abilities.push(ability);
	}
	removeability(ability: Ability) {
		if (
			this._abilities.findIndex(
				(existingability) => existingability == ability,
			) == null
		)
			throw Error("Can't find ability");

		this._abilities = this._abilities.filter(
			(currentability) => currentability != ability,
		);
	}
	get abilitys(): readonly Ability[] {
		return this._abilities;
	}
}
