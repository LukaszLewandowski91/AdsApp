const express = require("express");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectToDB = require("./db");
const adsRoutes = require("./routes/ads.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api", adsRoutes);
app.use("/auth", authRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

connectToDB();

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
