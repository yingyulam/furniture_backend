import FavoritesDAO from "../dao/favoritesDAO.js";

export default class FavoriteController {
	static async apiUpdateFavorites(req, res, next) {
		try {
			const FavoritesResponse = await FavoritesDAO.updateFavorites(
				req.body._id,
				req.body.favorites
			);

			var { error } = FavoritesResponse;
			if (error) {
				res.status(500).json({ error });
			}

			// if (FavoritesResponse.modifiedCount === 0) {
			//   throw new Error ("Unable to update favorites.")
			// }
			res.json({ status: "success " });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiUpdateProfile(req, res, next) {
		try {
			const ProfileResponse = await FavoritesDAO.updateProfile(
				req.body._id,
				req.body.imageUrl,
				req.body.nickname,
				req.body.contact
			);

			var { error } = ProfileResponse;
			if (error) {
				res.status(500).json({ error });
			}

			// if (FavoritesResponse.modifiedCount === 0) {
			//   throw new Error ("Unable to update favorites.")
			// }
			res.json({ status: "success " });
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiGetFavorites(req, res, next) {
		try {
			let id = req.params.userId;
			let favorites = await FavoritesDAO.getFavorites(id);
			if (!favorites) {
				res.status(404).json({ error: "not found" });
				return;
			}
			res.json(favorites);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}
}
