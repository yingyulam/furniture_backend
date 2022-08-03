let furnituresCollection;

export default class FurnitureDAO {
	static async injectDB(conn) {
		if (furnituresCollection) {
			return;
		}
		try {
			furnituresCollection = await conn
				.db(process.env.FURNITURE_NS)
				.collection("furniture");
		} catch (e) {
			console.error(`Unable to connect in FurnitureDAO: ${e}`);
		}
	}

	static async uploadItem(user, imageUrl, name, price, category, desc, date) {
		try {
			const uploadData = {
				user: user,
				imageUrl: imageUrl,
				name: name,
				category: category,
				price: price,
				desc: desc,
				date: date,
			};
			console.log(uploadData);
			return await furnituresCollection.insertOne(uploadData);
		} catch (e) {
			console.error(`Unable to upload Item for sell: ${e}`);
			return { error: e };
		}
	}
}
