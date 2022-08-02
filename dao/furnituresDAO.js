let furnituresCollection;

export default class FurnitureDAO {
	static async injectDB(conn) {
		if (furnituresCollection) {
			return;
		}
		try {
			furnituresCollection = await conn
				.db(process.env.MOVIEREVIEWS_NS)
				.collection("furnitures");
		} catch (e) {
			console.error(`Unable to connect in FurnitureDAO: ${e}`);
		}
	}

	static async uploadItem(user_id, imageUrl, name, price, desc, date) {
		try {
			const uploadData = {
				user_id: user_id,
				imageUrl: imageUrl,
				name: name,
				price: price,
				desc: desc,
				date: date,
			};
			return await furnituresCollection.insertOne(uploadData);
		} catch (e) {
			console.error(`Unable to upload Item for sell: ${e}`);
			return { error: e };
		}
	}
}
