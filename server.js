const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const controllers = require('./controllers');
const methodOverride = require('method-override');
require('dotenv').config();

/* Database CONNNECTION */
require('./config/db.connection');

// Middleware
app.use((req, res, next) => {    
  console.log(`${req.method} ${req.originalUrl}`);    
	next();
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use("/products", controllers.product);
app.use("/reviews", controllers.review);

// 404 page
app.use("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`✅ Listening for client requests on Port ${PORT} ✅`)
})