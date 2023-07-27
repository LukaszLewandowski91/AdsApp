const express = require("express");
const router = express.Router();
const AdController = require("../controllers/ads.controller");

router.get("/ads", AdController.getAllAds);
router.get("/ads/:id", AdController.getAdById);
router.post("/ads", AdController.addNewAd);
router.delete("/ads/:id", AdController.deleteAd);
router.put("/ads/:id", AdController.updateAd);

module.exports = router;
