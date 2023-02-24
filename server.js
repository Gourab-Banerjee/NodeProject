const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cookieParser=require("cookie-parser")

app.use(cookieParser())
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const dbDriver =
  "mongodb+srv://gourabbanerjee:Gb9111993@cluster0.rgcdgwz.mongodb.net/basicadmin";

  const jwtAdmin=require("./middleware/authJwt")
  app.use(jwtAdmin.authJwt)

const adminRouter = require("./routes/admin.routes");

app.use(adminRouter);

const port = process.env.PORT || 1993;

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Db is connected`);
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
