module.exports = {
  product: require("./product_controllers"),
  review: require("./review_controllers"),
};

// Key names here are used to access them in server.js file
// app.use("/products", controllers.product);
// app.use("/reviews", controllers.review);