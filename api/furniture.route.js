import express from "express";
import FurnitureController from "./furniture.controller.js";
import ReviewsController from "./reviews.controller.js";
import FavoriteController from "./favorites.controller.js";

const router = express.Router();

router.route("/").get(FurnitureController.apiGetFurnitureCollection);
router.route("/id/:id").get(FurnitureController.apiGetFurnitureById);
router.route("/ratings").get(FurnitureController.apiGetRatings);

router
	.route("/review")
	.post(ReviewsController.apiPostReview)
	//challenge portion
	.put(ReviewsController.apiUpdateReview)
	.delete(ReviewsController.apiDeleteReview);

router.route("/favorite").put(FavoriteController.apiUpdateFavorites);
router.route("/favorite/:userId").get(FavoriteController.apiGetFavorites);

router.route("/upload").post(FurnitureController.apiUploadItem);

export default router;
