import FurnitureDAO from "../dao/furnitureDAO.js";

export default class MoviesController {

    static async apiGetMovies(req, res, next) {
        const furniturePerPage = req.query.furniturePerPage ?
            parseInt(req.query.furniturePerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        } else if (req.query.name) {
            filters.name = req.query.name;
        }

        const { furnitureList, totalNumFurniture } = await
            FurnitureDAO.getFurnitureCollection({ filters, page, furniturePerPage });
        
        let response = {
            furniture: furnitureList,
            page: page,
            filters: filters,
            entries_per_page: furniturePerPage,
            total_results: totalNumFurniture,
        };
        res.json(response);
    }

    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {};
            let furniture = await FurnitureDAO.getFurnitureById(id);
            if (!furniture) {
                res.status(404).json({ error: "not found"});
                return;
            }
            res.json(furniture);
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
