import FurnitureDAO from "../dao/furnitureDAO.js";

export default class MoviesController {

    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ?
            parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        } else if (req.query.name) {
            filters.name = req.query.name;
        }

        const { moviesList, totalNumMovies } = await
            FurnitureDAO.getMovies({ filters, page, moviesPerPage });
        
        let response = {
            furniture: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        res.json(response);
    }

    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {};
            let movie = await FurnitureDAO.getMovieById(id);
            if (!movie) {
                res.status(404).json({ error: "not found"});
                return;
            }
            res.json(movie);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error:e})
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await FurnitureDAO.getRatings();
            res.json(propertyTypes);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
}
