import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
	name: string;
	email: string;
	password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

userrun().catch((err) => console.log(err));

export default async function userrun() {
	// 4. Connect to MongoDB
	await connect("mongodb://127.0.0.1:27017/test");

	const user = new User({
		name: "Bill",
		email: "bill@initech.com",
		password: "https://i.imgur.com/dM7Thhn.png",
	});
	await user.save();

	console.log(user.email);

	return;
}
