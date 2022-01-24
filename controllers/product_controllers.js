const express = require("express");
const router = express.Router();
const { Review, Product } = require("../models");

// index route
router.get("/", (req, res) => {
  Product.find({}, (error, allProducts) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
    const context = { products: allProducts };
    res.render("products/index", context);
  });
});

// New product form
router.get("/new", (req, res) => {
  res.render("products/new.ejs");
});

// Create new Product
router.post("/", (req, res, next) => {
  Product.create(req.body, (error, createdProduct) => {
    if (error) {
      console.log(error);
      req.error = error;

      const context = { error };

      return res.render("products/new.ejs", context);
    }

    return res.redirect("/products");
  });
});

// Show route
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
    Review.find({ product: req.params.id }, (error, allReviews) => {
      const context = {
        product: foundProduct,
        reviews: allReviews,
      };

      return res.render("products/show", context);
    });
  });
});

// Delete route
router.delete("/:id", (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    Review.deleteMany({ product: req.params.id }, (error, deletedReviews) => {
      return res.redirect("/products");
    });
  });
});

// Edit route
router.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    } 
    const context = {
      product: foundProduct,
    }

    return res.render("products/edit.ejs", context);
  });
});

// Update route
router.put("/:id", (req, res, next) => {
  console.log('Put route reached');
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body
       }, 
    },
    {
      new: true
    },
    (error, updatedProduct) => {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      } 
      return res.redirect(`/products/${updatedProduct.id}`);
  });
});





module.exports = router;
