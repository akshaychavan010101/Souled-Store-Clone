const express = require("express");
const { connection } = require("./config/db");
const { ProductRouter } = require("./routes/products.routes");
const { UserRouter } = require("./routes/user.routes");
const cors = require("cors");

const app = express();
require("dotenv").config();


app.use(cors())
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("WELCOME");
})

app.use(UserRouter);
app.use(ProductRouter);

app.listen(process.env.Port, async () => {
  try {
    await connection;
    console.log("Running and Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
