const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const getImageFileType = require("../utils/getImageFileType");
exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";

    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType) &&
      phoneNumber &&
      typeof phoneNumber === "string"
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res
          .status(409)
          .json({ message: "User with this login already exists" });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phoneNumber,
      });
      res.status(201).json({ message: `User created ${user.login}` });
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).json({ message: "Login or password are incorrect" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = { login: user.login, id: user.id };

          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(400).json({ message: "Login or password are incorrect" });
        }
      }
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } catch (err) {}
};

exports.logout = async (req, res) => {
  try {
    await req.session.destroy();
    res.json({ message: "You have been logout" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getUser = async (req, res) => {
  res.json({ message: req.session.user });
};
