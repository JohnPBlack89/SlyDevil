import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

export const userRouter = express.Router();

// tell userRouter to use json parser middleware
userRouter.use(express.json());

userRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const users = (await collections.users
			?.find({})
			.toArray()) as unknown as User[];

		res.status(200).send(users);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).send(error);
		} else {
			console.error("Unknown Error Occurred", error);
		}
	}
});

userRouter.get("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;

	try {
		const query = { _id: new ObjectId(id) };
		const game = (await collections.users?.findOne(query)) as unknown as User;

		if (game) {
			res.status(200).send(game);
		}
	} catch (error) {
		res
			.status(404)
			.send(`Unable to find matching document with id: ${req.params.id}`);
	}
});

userRouter.post("/", async (req: Request, res: Response) => {
	try {
		const newUser = req.body as User;
		const result = await collections.users?.insertOne(newUser);

		result
			? res
					.status(201)
					.send(`Successfully created a new game with id ${result.insertedId}`)
			: res.status(500).send("Failed to create a new game.");
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(400).send(error.message);
		} else {
			console.error("Unknown error occurred: " + error);
		}
	}
});

userRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;

	try {
		const updatedGame: User = req.body as User;
		const query = { _id: new ObjectId(id) };

		const result = await collections.users?.updateOne(query, {
			$set: updatedGame,
		});

		result
			? res.status(200).send(`Successfully updated game with id ${id}`)
			: res.status(304).send(`Game with id: ${id} not updated`);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(400).send(error.message);
		} else {
			console.error("Unknown error occurred: " + error);
		}
	}
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;

	try {
		const query = { _id: new ObjectId(id) };
		const result = await collections.users?.deleteOne(query);

		if (result && result.deletedCount) {
			res.status(202).send(`Successfully removed game with id ${id}`);
		} else if (!result) {
			res.status(400).send(`Failed to remove game with id ${id}`);
		} else if (!result.deletedCount) {
			res.status(404).send(`Game with id ${id} does not exist`);
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(400).send(error.message);
		} else {
			console.error("Unknown error occurred: " + error);
		}
	}
});
