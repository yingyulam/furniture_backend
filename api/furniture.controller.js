import FurnitureDAO from "../dao/furnitureDAO.js";

export default class FurnitureController {

    static async apiGetFurnitureCollection(req, res, next) {
      //console.log(req.query);
        const furniturePerPage = req.query.furniturePerPage ?
            parseInt(req.query.furniturePerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        } else if (req.query.condition) {
            filters.condition = req.query.condition;
        }else if (req.query.name) {
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

    static async apiGetFurnitureById(req, res, next) {
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

    static async apiGetConditions(req, res, next) {
      try {
          let propertyTypes = await FurnitureDAO.getConditions();
          res.json(propertyTypes);
      } catch(e) {
          console.log(`API, ${e}`);
          res.status(500).json({ error: e});
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
  
        const uploadItemResponse = await FurnitureDAO.uploadItem(
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
        //console.log("Reached here");
        res.status(500).json({ error: e.message });
      }
    }
}
