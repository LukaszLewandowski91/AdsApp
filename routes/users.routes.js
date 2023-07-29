const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

router.post("/register", UserController.register);
router.get("/user/:id", UserController.getUser);

module.exports = router;
