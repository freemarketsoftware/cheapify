const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let state = new Schema(
  {
    name: {
      type: String
    },
  },
  { collection: "States" }
);

module.exports = mongoose.model("states", state);