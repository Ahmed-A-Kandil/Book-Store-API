const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const databaseURI = process.env.DATABASE_URI;

async function connectDB() {
  try {
    await mongoose.connect(databaseURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
}

module.exports = connectDB;
