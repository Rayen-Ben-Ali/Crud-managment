const mongoose = require("mongoose");

const product = mongoose.model("product", {
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});

module.exports = product;
