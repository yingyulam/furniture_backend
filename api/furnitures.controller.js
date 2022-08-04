import FurnituresDAO from "../dao/furnituresDAO.js";

export default class FurnituresController {
	static async apiUploadItem(req, res, next) {
		try {
			const imageUrl = req.body.imageUrl;
			const name = req.body.name;
			const price = req.body.price;
			const description = req.body.description;
			const user = req.body.user;
			const category = req.body.category;
			const condition = req.body.condition;
			const date = new Date();

			const uploadItemResponse = await FurnituresDAO.uploadItem(
				user,
				imageUrl,
				name,
				price,
				category,
				description,
				condition,
				date
			);

			let { error } = uploadItemResponse;
			if (error) {
				res.status(500).json({ error: "Unable to upload item for sell." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			console.log("Reached here");
			res.status(500).json({ error: e.message });
		}
	}
}
