import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js";
import FavoritesDAO from "./dao/favoritesDAO.js";
import FurnitureDAO from "./dao/furnitureDAO.js"

async function main() {
	dotenv.config();

	const client = new mongodb.MongoClient(process.env.FURNITURE_DB_URI);
	const port = process.env.PORT || 8000;

	try {
		// Connect to MongoDB server
		await client.connect();
		await FurnitureDAO.injectDB(client);
		await ReviewsDAO.injectDB(client);
		await FavoritesDAO.injectDB(client);

		app.listen(port, () => {
			console.log("Server is running on port: " + port);
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

main().catch(console.error);
