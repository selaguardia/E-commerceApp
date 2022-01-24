const express = require("express");
const router = express.Router();

const { Review, Product } = require("../models");

router.get("/", (req, res) => {
  Review.find({})
    .populate("product")
    .exec((error, allReviews) => {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
			// Here we are requesting all the products to add into the context
      Product.find({}, (error, allProducts) => {
        if (error) {
          console.log(error);
          req.error = error;
          return next();
        }

        const context = { reviews: allReviews, products: allProducts };
        return res.render("reviews/index", context);
      });
    });
});

router.post("/", function (req, res) {
  Review.create(req.body, function (error, createdReview) {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    return res.redirect("/reviews");
  });
});

router.delete("/:id", (req, res, next) => {
  Review.findByIdAndDelete(req.params.id, (error, deletedReview) => {
    if (error) {
      console.log(`Deleting error ${error}`);
      req.error = error;
      return next();
    } 
    return res.redirect("/reviews");
  });
});

module.exports = router;