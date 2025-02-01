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
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("679db89a2dbc51a7eab243a1")
    .then((user) => {
      if (!user) {
        console.log("No user found!");
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});
app.use("/", jobRoutes);
const server = http.createServer(app);
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          userName: "jagadeeswar_manyam",
          email: "sample@gmail.com",
          password: process.env.DB_pass,
        });
        user.save();
      }
    });

    server.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
