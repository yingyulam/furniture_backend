import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let furniture;

export default class FurnitureDAO {
	static async injectDB(conn) {
		if (furniture) {
			return;
		}
		try {
			furniture = await conn.db(process.env.FURNITURE_NS).collection("furniture");
		} catch (e) {
			console.error(`Unable to connect in FurnitureDAO: ${e}`);
		}
	}

	static async getMovies({
		filters = null,
		page = 0,
		moviesPerPage = 20,
	} = {}) {
		let query;
		if (filters) {
			if ("name" in filters) {
				query = { $text: { $search: filters["name"] } };
			} else if ("category" in filters) {
				query = { category: { $eq: filters["category"] } };
			}
		}
		console.log(query);
		let cursor;
		try {
			cursor = await furniture
				.find(query)
				.limit(moviesPerPage)
				.skip(moviesPerPage * page);
			const moviesList = await cursor.toArray();
			const totalNumMovies = await furniture.countDocuments(query);
			return { moviesList, totalNumMovies };
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { moviesList: [], totalNumMovies: 0 };
		}
	}

	static async getRatings() {
		let ratings = [];
		try {
			ratings = await furniture.distinct("category");
			return ratings;
		} catch (e) {
			console.error(`Unable to get ratings, ${e}`);
			return ratings;
		}
	}

	static async getMovieById(id) {
		try {
			return await furniture
				.aggregate([
					{
						$match: {
							_id: new ObjectId(id),
						},
					},
					{
						$lookup: {
							from: "reviews",
							localField: "_id",
							foreignField: "movie_id",
							as: "reviews",
						},
					},
				])
				.next();
		} catch (e) {
			console.error(`Something went wrong in getMovieById: ${e}`);
			throw e;
		}
	}

  //try this:

  static async uploadItem(
		user,
		imageUrl,
		name,
		price,
		category,
		description,
		condition,
		date
	) {
		try {
			const uploadData = {
				user: user,
				imageUrl: imageUrl,
				name: name,
				category: category,
				price: price,
				description: description,
				condition: condition,
				date: date,
			};
			console.log(uploadData);
			return await furniture.insertOne(uploadData);
		} catch (e) {
			console.error(`Unable to upload Item for sell: ${e}`);
			return { error: e };
		}
	}
}
