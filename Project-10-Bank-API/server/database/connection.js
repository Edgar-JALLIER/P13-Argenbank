const dotEnv = require("dotenv");
dotEnv.config();

const mongoose = require("mongoose");
const databaseUrl = process.env.DATABASE_URL;
console.log("Connected to MongoDB database");
module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true });
    console.log("Database successfully connected");
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw new Error(error);
  }
};
