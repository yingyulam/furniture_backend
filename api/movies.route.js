import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';
import FavoriteController from './favorites.controller.js';

const router = express.Router();

router.route("/").get(MoviesController.apiGetMovies);
router.route("/id/:id").get(MoviesController.apiGetMovieById);
router.route("/ratings").get(MoviesController.apiGetRatings);

router.route("/review")
      .post(ReviewsController.apiPostReview)
//challenge portion
      .put(ReviewsController.apiUpdateReview)
      .delete(ReviewsController.apiDeleteReview);

router.route("/favorite").put(FavoriteController.apiUpdateFavorites);

router.route("/favorite/:userId").get(FavoriteController.apiGetFavorites);

export default router;