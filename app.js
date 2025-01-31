const http = require("http");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.set("view engine", "ejs");
app.set("views", "views");

const jobRoutes = require("./routes/jobRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", jobRoutes);
const server = http.createServer(app);
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    console.log("connected to the DB");
    server.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
