const mongoose = require("mongoose");

const connectToDB = () => {
  const NODE_ENV = process.env.NODE_ENV;
  let dbUri = "";

  if (NODE_ENV === "production")
    dbUri = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.sjmpwid.mongodb.net/AdsAppDB?retryWrites=true&w=majority`;
  else dbUri = "mongodb://localhost:27017/AdsAppDB";

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to the database");
  });

  db.on("error", (err) => console.log("Error " + err));
};

module.exports = connectToDB;
