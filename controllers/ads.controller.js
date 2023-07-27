const Ad = require("../models/ad.model");
const User = require("../models/user.model");
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

exports.addNewAd = async (req, res) => {
  try {
    const { title, description, publishDate, image, price, location, userId } =
      req.body;
    const newAds = new Ad({
      title: title,
      description: description,
      publishDate: publishDate,
      image: image,
      price: price,
      location: location,
      userId: userId,
    });
    await newAds.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateAd = async (req, res) => {
  const { title, description, publishDate, image, price, location, userId } =
    req.body;
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      (ad.title = title),
        (ad.description = description),
        (ad.publishDate = publishDate),
        (ad.image = image),
        (ad.price = price),
        (ad.location = location),
        (ad.userId = userId);
      await ad.save();
      res.json({ message: "Ok" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: "Ok" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
