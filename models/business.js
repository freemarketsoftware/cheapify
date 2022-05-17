const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let business = new Schema(
  {
    name: {
      type: String
    },
    city: {
      type: String
    },
    url: {
      type: String
    },
    lat: {
      type: String
    },
    long : {
      type: String
    }
  },
  { collection: "Businesses" }
);

module.exports = mongoose.model("businesses", business);