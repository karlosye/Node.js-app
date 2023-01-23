const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products").then((data) => {
  console.log(data[0]);
}); 

app.use("/admin", adminRoute.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: null });
});

app.listen(3000, () => {
  console.log("server has started");
});
