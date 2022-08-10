import express from "express";
import FurnitureController from "./furniture.controller.js";
import ReviewsController from "./reviews.controller.js";
import FavoriteController from "./favorites.controller.js";

const router = express.Router();

router.route("/").get(FurnitureController.apiGetFurnitureCollection);
router.route("/id/:id").get(FurnitureController.apiGetFurnitureById);
router.route("/id/:id").get(FurnitureController.apiGetFurnitureById);
router.route("/categories").get(FurnitureController.apiGetCategories);
router.route("/conditions").get(FurnitureController.apiGetConditions);
router.route("/history/:userId").get(FurnitureController.apiGetFurnitureByUser);
router.route("/upload").post(FurnitureController.apiUploadItem);

router
	.route("/review")
	.post(ReviewsController.apiPostReview)
	//challenge portion
	.put(ReviewsController.apiUpdateReview)
	.delete(ReviewsController.apiDeleteReview);

router.route("/favorite").put(FavoriteController.apiUpdateFavorites);
router.route("/favorite/:userId").get(FavoriteController.apiGetFavorites);

export default router;
