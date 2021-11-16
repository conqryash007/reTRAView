const express = require("express");
const router = express.Router();
const placeController = require("./../controllers/places-controller");

router.get("/:pid", placeController.getPlaceById);

router.get("/users/:uid", placeController.getPlacesByUser);

router.post("/", placeController.createPlace);

router.patch("/:uid", placeController.updatePlaceById);

router.delete("/:uid", placeController.deletePlaceById);
module.exports = router;
