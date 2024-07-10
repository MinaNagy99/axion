const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("connection is done");
  })
  .catch((err) => {
    console.log(`error connecting to ${err}`);
  });

module.exports = dbConnection;
