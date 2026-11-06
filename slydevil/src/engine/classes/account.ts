import { v7 } from "uuid";

export class Account {
	private _id: string;
	private _name: string;

	constructor(name: string) {
		this._id = Account.generateId();
		this._name = name;
	}

	private static generateId(): string {
		console.log("Need to add validation to ensure no duplicates");
		return v7().toString();
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
	}
}
