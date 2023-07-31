const Ad = require("../models/ad.model");
const User = require("../models/user.model");
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate({ path: "userId", select: "login" });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate({
      path: "userId",
      select: "login",
    });
    if (!ad) res.status(404).json({ message: "Not found" });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getBySearchPhrase = async (req, res) => {
  try {
    const ads = await Ad.find({
      title: { $regex: `(?i)${req.params.searchPhrase}(?-i)` },
    }).populate({ path: "userId", select: "login" });
    if (!ads) res.status(404).json({ message: "Not found" });
    else res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNewAd = async (req, res) => {
  try {
    const { title, description, publishDate, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";

    if (
      title &&
      typeof title === "string" &&
      description &&
      typeof description === "string" &&
      publishDate &&
      typeof publishDate === "string" &&
      price &&
      typeof price === "string" &&
      location &&
      typeof location === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      const newAds = new Ad({
        title: title,
        description: description,
        publishDate: publishDate,
        price: price,
        image: req.file.filename,
        location: location,
        userId: req.session.user.id,
      });
      await newAds.save();
      res.json({ message: "OK" });
    } else {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      res.status(500).json({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateAd = async (req, res) => {
  const { title, description, publishDate, image, price, location } = req.body;
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad.userId === req.session.user.id) {
      if (ad) {
        (ad.title = title),
          (ad.description = description),
          (ad.publishDate = publishDate),
          (ad.image = image),
          (ad.price = price),
          (ad.location = location),
          await ad.save();
        res.json({ message: "Ok" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res
        .status(401)
        .json({ message: "You do not have access to edit this ad" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad.userId === req.session.user.id) {
      if (ad) {
        await Ad.deleteOne({ _id: req.params.id });
        res.json({ message: "Ok" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res
        .status(401)
        .json({ message: "You do not have access to delete this ad" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
