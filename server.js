const express = require("express");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server);
io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnect`);
  });
});

module.exports = server;
