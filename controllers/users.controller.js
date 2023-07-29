const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { login, password, avatar, phoneNumber } = req.body;
    const newUser = new User({
      login: login,
      password: password,
      avatar: avatar,
      phoneNumber: phoneNumber,
    });
    await newUser.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ message: "User not found" });
    else res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
