let favoritesCollection;

export default class FavoritesDAO {
	static async injectDB(conn) {
		if (favoritesCollection) {
			return;
		}
		try {
			favoritesCollection = await conn
				.db(process.env.FURNITURE_NS)
				.collection("favorites");
		} catch (e) {
			console.error(`Unable to connect in FavoritesDAO: ${e}`);
		}
	}

	static async updateFavorites(userId, favorites) {
		try {
			const updateResponse = await favoritesCollection.updateOne(
				{ _id: userId },
				{ $set: { favorites: favorites } },
				{ upsert: true }
			);
			return updateResponse;
		} catch (e) {
			console.error(`Unable to update favorites: ${e}`);
			return { error: e };
		}
	}

	static async updateProfile(userId, imageUrl, nickname, contact) {
		try {
			const updateResponse = await favoritesCollection.updateOne(
				{ _id: userId },
				{ $set: { imageUrl: imageUrl, nickname: nickname, contact: contact } },
				{ upsert: true }
			);
			return updateResponse;
		} catch (e) {
			console.error(`Unable to update favorites: ${e}`);
			return { error: e };
		}
	}

	static async getFavorites(id) {
		let cursor;
		try {
			cursor = await favoritesCollection.find({
				_id: id,
			});
			const favorites = await cursor.toArray();
			return favorites[0];
		} catch (e) {
			console.error(`Something went wrong in getFavorites: ${e}`);
			throw e;
		}
	}
}
