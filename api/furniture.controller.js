import FurnitureDAO from "../dao/furnitureDAO.js";

export default class FurnitureController {
	static async apiGetFurnitureCollection(req, res, next) {
		//console.log(req.query);
		const furniturePerPage = req.query.furniturePerPage
			? parseInt(req.query.furniturePerPage)
			: 20;
		const page = req.query.page ? parseInt(req.query.page) : 0;
		let filters = { ...req.query };

		if (req.query.category === "All Categories") filters.category = "";
		if (req.query.condition === "All Conditions") filters.condition = "";

		const { furnitureList, totalNumFurniture } =
			await FurnitureDAO.getFurnitureCollection({
				filters,
				page,
				furniturePerPage,
			});

		let response = {
			furniture: furnitureList,
			page: page,
			filters: filters,
			entries_per_page: furniturePerPage,
			total_results: totalNumFurniture,
		};
		res.json(response);
	}

	static async apiGetFurnitureById(req, res, next) {
		try {
			let id = req.params.id || {};
			let furniture = await FurnitureDAO.getFurnitureById(id);
			if (!furniture) {
				res.status(404).json({ error: "not found" });
				return;
			}
			res.json(furniture);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetFurnitureByUser(req, res, next) {
		try {
			let googleId = req.params.userId;
			let furnitures = await FurnitureDAO.getFurnitureHistoryByUserId(googleId);
			res.json(furnitures);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetCategories(req, res, next) {
		try {
			let propertyTypes = await FurnitureDAO.getCategories();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetConditions(req, res, next) {
		try {
			let propertyTypes = await FurnitureDAO.getConditions();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

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
			const location = req.body.location;

			const uploadItemResponse = await FurnitureDAO.uploadItem(
				user,
				imageUrl,
				name,
				price,
				category,
				description,
				condition,
				date,
				location
			);

			let { error } = uploadItemResponse;
			if (error) {
				res.status(500).json({ error: "Unable to upload item for sell." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			//console.log("Reached here");
			res.status(500).json({ error: e.message });
		}
	}

	static async apiUpdateItem(req, res, next) {
		try {
			const _id = req.body._id;
			const imageUrl = req.body.imageUrl;
			const name = req.body.name;
			const price = req.body.price;
			const description = req.body.description;
			const user = req.body.user;
			const category = req.body.category;
			const condition = req.body.condition;
			const date = new Date();
			const location = req.body.location;

			const updateItemResponse = await FurnitureDAO.updateItem(
				_id,
				user,
				imageUrl,
				name,
				price,
				category,
				description,
				condition,
				date,
				location
			);

			let { error } = updateItemResponse;
			if (error) {
				res.status(500).json({ error: "Unable to upload item for sell." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiDeleteItem(req, res, next) {
		console.log("req:", req.body);
		try {
			const objectId = req.body.objectId;
			const userId = req.body.userId;

			const deleteResponse = await FurnitureDAO.deleteItem(objectId, userId);

			if (deleteResponse.deletedCount === 0) {
				res.status(500).json({ error: "Do review was deleted." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
