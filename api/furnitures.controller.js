import FurnituresDAO from "../dao/furnituresDAO.js";

export default class FurnituresController {
	static async apiUploadItem(req, res, next) {
		try {
			const name = req.body.name;
			const price = req.body.price;
			const desc = req.body.description;
			const user_id = req.body.user_id;
			const date = new Date();

			console.log(name);

			const uploadItemResponse = await FurnituresDAO.uploadItem(
				user_id,
				name,
				price,
				desc,
				date
			);

			let { error } = uploadItemResponse;
			if (error) {
				res.status(500).json({ error: "Uable to upload item for sell." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
