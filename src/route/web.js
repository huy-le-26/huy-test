import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomepage);

    // //crud
    router.get("/test/crud", homeController.getCrud); // chỗ có form test
    router.post("/post-crud-test", homeController.PostCrud); // link thêm db
    router.get("/get/crudtest", homeController.GetCrudTest); // link đọc db
    router.get("/edit-crud", homeController.EditCrudTest); // link edit db
    router.post("/put-crud", homeController.PutCrudTest); // link edit db
    router.get("/delete-crud", homeController.DelCrud); // link edit db

    return app.use("/", router);
};

module.exports = initWebRouters;