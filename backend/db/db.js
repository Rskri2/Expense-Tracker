const mongoose = require("mongoose");
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const db = async () => {
  try {
    await mongoose.connect(DB);
  } catch (err) {
    console.log("error");
  }
};

module.exports = {db}