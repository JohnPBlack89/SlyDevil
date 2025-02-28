import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDatabase(
	databaseName: string,
	collectionName: string
) {
	dotenv.config();

	const client: mongoDB.MongoClient = new mongoDB.MongoClient(
		process.env.DB_CONN_STRING as string
	);

	await client.connect();

	const db: mongoDB.Db = client.db(databaseName);

	await applySchemaValidation(db, collectionName);

	const usersCollection: mongoDB.Collection = db.collection(collectionName);

	collections.users = usersCollection;

	console.log(
		`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
	);
}

async function applySchemaValidation(db: mongoDB.Db, collection: string) {
	const jsonSchema = {
		$jsonSchema: {
			bsonType: "object",
			required: ["name", "password", "email", "username"],
			additionalProperties: false,
			properties: {
				_id: {},
				name: {
					bsonType: "string",
					description: "'name' is required and is a string",
				},
				password: {
					bsonType: "number",
					description: "'password' is required and is a number",
				},
				email: {
					bsonType: "string",
					description: "'email' is required and is a string",
				},
				username: {
					bsonType: "string",
					description: "'username' is required and is a string",
				},
			},
		},
	};

	await db
		.command({
			collMod: collection,
			validator: jsonSchema,
		})
		.catch(async (error: mongoDB.MongoServerError) => {
			if (error.codeName === "NamespaceNotFound") {
				await db.createCollection(collection, {
					validator: jsonSchema,
				});
			}
		});
}
