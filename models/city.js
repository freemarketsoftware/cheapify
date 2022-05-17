const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let city = new Schema(
  {
    name: {
      type: String
    },
    state: {
      type: String
    }
  },
  { collection: "Cities" }
);

module.exports = mongoose.model("cities", city);