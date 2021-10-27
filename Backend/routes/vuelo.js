const express = require("express");
const router = express.Router();
const vueloController = require("../controllers/vueloController");

//Autenticación para el uso del API
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");

//Definición de rutas para cada uno de los verbos para los post
router.get("/get-flight", vueloController.get);

router.get("/getBy-flight/:id", auth, vueloController.getById);

router.post("/add-flight",auth, permit(1),  vueloController.create);

router.delete("/delete-flight/:id",auth, permit(1), vueloController.delete);

router.put("/update-flight/:id",auth, permit(1), vueloController.update);

module.exports = router;
