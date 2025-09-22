const express = require("express");
const dbCon = require("./app/config/dbCon");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

dbCon();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("use /admin to visit dashboard page");
});


const ProductApiRouter = require("./app/route/ProductApiRouter");
app.use("/api", ProductApiRouter);

const AuthEjsRoute = require("./app/route/authejsRoute");
app.use(AuthEjsRoute);

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
