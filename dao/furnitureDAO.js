import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let furnitureCollection;

export default class FurnitureDAO {
	static async injectDB(conn) {
		if (furnitureCollection) {
			return;
		}
		try {
			furnitureCollection = await conn
				.db(process.env.FURNITURE_NS)
				.collection("furniture");
		} catch (e) {
			console.error(`Unable to connect in FurnitureDAO: ${e}`);
		}
	}

	static async getFurnitureCollection({
		filters = null,
		page = 0,
		furniturePerPage = 20,
	} = {}) {
		let query = {};
		if (filters) {
			console.log(filters);
			if ("name" in filters) {
				query = { $text: { $search: filters["name"] } };
			} else if ("category" in filters) {
				query = { category: { $eq: filters["category"] } };
			} else if ("condition" in filters) {
				query = { condition: { $eq: filters["condition"] } };
			}
		}
		//console.log(query);
		let cursor;
		try {
			cursor = await furnitureCollection
				.find(query)
				.limit(furniturePerPage)
				.skip(furniturePerPage * page);
			const furnitureList = await cursor.toArray();
			const totalNumFurniture = await furnitureCollection.countDocuments(query);
			return { furnitureList, totalNumFurniture };
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { furnitureList: [], totalNumFurniture: 0 };
		}
	}

	static async getCategories() {
		let categories = [];
		try {
			categories = await furnitureCollection.distinct("category");
			return categories;
		} catch (e) {
			console.error(`Unable to get categories, ${e}`);
			return categories;
		}
	}

	static async getConditions() {
		let conditions = [];
		try {
			conditions = await furnitureCollection.distinct("condition");
			return conditions;
		} catch (e) {
			console.error(`Unable to get conditions, ${e}`);
			return conditions;
		}
	}

	static async getFurnitureById(id) {
		try {
			return await furnitureCollection
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
			console.error(`Something went wrong in getFurnitureById: ${e}`);
			throw e;
		}
	}

	static async getFurnitureHistoryByUserId(id) {
		let query = {};
		let cursor;
		try {
			query = { "user.googleId": id };
			cursor = await furnitureCollection.find(query);
			const history = await cursor.toArray();
			return history;
		} catch (e) {
			console.error(
				`Something went wrong in getFurnitureHistoryByUserId: ${e}`
			);
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
			//console.log(uploadData);
			return await furnitureCollection.insertOne(uploadData);
		} catch (e) {
			console.error(`Unable to upload Item for sell: ${e}`);
			return { error: e };
		}
	}
}
