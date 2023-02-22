const express = require("express");
const { UserModel } = require("../models/users.model");
const UserRouter = express.Router();
UserRouter.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

UserRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send({ msg: "All users data", data: users });
  } catch (error) {
    res.send({ msg: "Server Error", Error: error.message });
  }
});

UserRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, gender } = req.body;
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      res.send({ msg: "Email is already registered, Please Login" });
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          res.send({
            msg: "Something went wrong, Please try again",
            Error: err.message,
          });
        } else {
          const newUser = await UserModel({
            first_name,
            last_name,
            email,
            password: hash,
            phone,
            gender,
          });
          await newUser.save();
          res.send({ msg: "User Registered Successfully" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "Server error", Error: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = await jwt.sign(
            { userid: user[0]._id },
            process.env.secretKey,
            { expiresIn: "1h" }
          );
          const tosendUser = {
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            email: user[0].email,
            phone: user[0].phone,
            gender: user[0].gender,
            _id: user[0]._id,
          };
          res.send({
            msg: "Login Successfull",
            accesstoken: token,
            user: tosendUser,
          });
        } else {
          res.send({
            msg: "Wrong Credentials",
          });
        }
      });
    } else {
      res.send({ msg: "Account not found, Please register first" });
    }
  } catch (error) {
    res.send({ msg: "Server error", Error: error.message });
  }
});

UserRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Data Updated Successfully" });
  } catch (error) {
    return res.send({ msg: "Server Error", Error: error.message });
  }
});

UserRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Account Deleted" });
  } catch (error) {
    return res.send({ msg: "Server Error", Error: error.message });
  }
});

module.exports = { UserRouter };
