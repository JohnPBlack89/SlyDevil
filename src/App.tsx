import Logo from "./app/components/Logo";
import express from "express";
import { connectToDatabase } from "./server/services/database.service";
import { userRouter } from "./server/routes/user.router";

export default function App() {
	const app = express();
	const port = 5173;

	connectToDatabase("SlyDevil", "Users")
		.then(() => {
			app.use("/users", userRouter);

			app.listen(port, () => {
				console.log(`Server started at http://localhost:${port}`);
			});
		})
		.catch((error: Error) => {
			console.error("Database connection failed", error);
			process.exit();
		});
	return <Logo />;
}
