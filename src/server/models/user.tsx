import { ObjectId } from "mongodb";

export default class User {
	public id?: ObjectId;
	public name: string;
	public email: string;
	public password: string;
	public username: string;

	constructor(name: string, email: string, password: string, username: string) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.username = username;
	}
}
