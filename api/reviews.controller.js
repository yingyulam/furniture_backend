import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
	static async apiPostReview(req, res, next) {
		try {
			const movieId = req.body.movie_id;
			const review = req.body.review;
			const userInfo = {
				name: req.body.name,
				_id: req.body.user_id,
			};

			const date = new Date();

			const reviewResponse = await ReviewsDAO.addReview(
				movieId,
				userInfo,
				review,
				date
			);

			var { error } = reviewResponse;
			console.log(error);
			if (error) {
				res.status(500).json({ error: "Uable to post review." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiUpdateReview(req, res, next) {
		// challenge portion
		try {
			const reviewId = req.body.review_id;
			const userID = req.body.user_id;
			const review = req.body.review;
			const date = new Date();

			const reviewResponse = await ReviewsDAO.updateReview(
				reviewId,
				userID,
				review,
				date
			);

			console.log(reviewResponse);

			if (reviewResponse.modifiedCount === 0) {
				res.status(500).json({ error: "No changes were made." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}

	static async apiDeleteReview(req, res, next) {
		//console.log(req.body)
		// challeng portion:
		try {
			const reviewId = req.body.review_id;
			const userId = req.body.user_id;

			const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);

			if (reviewResponse.deletedCount === 0) {
				res.status(500).json({ error: "Do review was deleted." });
			} else {
				res.json({ status: "success" });
			}
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
}
