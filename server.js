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

// connect do DB
connectToDB();

// add middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

// add routes
app.use("/api", adsRoutes);
app.use("/auth", authRoutes);

// serve the static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));

// at any other link, just serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// start express server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

// start socket io
const io = socket(server);
io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnect`);
  });
});

module.exports = server;
