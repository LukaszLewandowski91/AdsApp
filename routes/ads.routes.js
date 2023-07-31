const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const AdController = require("../controllers/ads.controller");

router.get("/ads", AdController.getAllAds);
router.get("/ads/:id", AdController.getAdById);
router.get("/ads/search/:searchPhrase", AdController.getBySearchPhrase);
router.post("/ads", authMiddleware, AdController.addNewAd);
router.delete("/ads/:id", authMiddleware, AdController.deleteAd);
router.put("/ads/:id", authMiddleware, AdController.updateAd);

module.exports = router;
