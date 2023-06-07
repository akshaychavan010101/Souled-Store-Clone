const express = require("express");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes");
const { CartRouter } = require("./routes/carts.routes");
const { ProductRouter } = require("./routes/products.routes");
const cors = require("cors");
const session = require("express-session");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO THE SOULED STORE APP");
});

// Set up session (new code for google auth)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(UserRouter);
app.use(ProductRouter);
app.use(CartRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Running and Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
