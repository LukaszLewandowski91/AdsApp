const express = require("express");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const helmet = require("helmet");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectToDB = require("./db");
const adsRoutes = require("./routes/ads.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();

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

// connect do DB
connectToDB().then(() => {
  // add middleware
  app.use(helmet());
  if (process.env.NODE_ENV !== "production") {
    app.use(
      cors({
        origin: ["http://localhost:3000"],
        credentials: true,
      })
    );
  } else {
    app.use(cors());
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create(mongoose.connection),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV == "production",
      },
    })
  );

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  // add routes
  app.use("/api", adsRoutes);
  app.use("/auth", authRoutes);

  // serve the static files from the React app
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.use(express.static(path.join(__dirname, "/public")));
  // at any other link, just serve React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });

  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });
});
module.exports = server;
