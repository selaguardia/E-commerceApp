// require("../config/db.connection"); // Do I need?
module.exports = {
  Product: require('./Product'),
  Review: require('./Review'),
}

// Key names here are used to find, create, update, & delete in controller files
// db.Product.find