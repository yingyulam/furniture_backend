import express from "express";
import FurnitureController from "./furniture.controller.js";
import FavoriteController from "./favorites.controller.js";

const router = express.Router();

router.route("/").get(FurnitureController.apiGetFurnitureCollection);
router.route("/id/:id").get(FurnitureController.apiGetFurnitureById);
router.route("/categories").get(FurnitureController.apiGetCategories);
router.route("/conditions").get(FurnitureController.apiGetConditions);
router.route("/history/:userId").get(FurnitureController.apiGetFurnitureByUser);
router.route("/upload").post(FurnitureController.apiUploadItem);
router.route("/update").put(FurnitureController.apiUpdateItem);
router.route("/delete").delete(FurnitureController.apiDeleteItem);

router.route("/favorite").put(FavoriteController.apiUpdateFavorites);
router.route("/favorite/:userId").get(FavoriteController.apiGetFavorites);
router.route("/profile").put(FavoriteController.apiUpdateProfile);

export default router;
