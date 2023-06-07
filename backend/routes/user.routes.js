const express = require("express");
const { UserModel } = require("../models/users.model");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// new code for google auth
const passport = require("../oauths/google.oauth");
const { v4: uuidv4 } = require("uuid");

// Initialize Passport.js
UserRouter.use(passport.initialize());
UserRouter.use(passport.session());

UserRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({ msg: "All users data", data: users, ok: true });
  } catch (error) {
    res.send({ msg: "Server Error", Error: error.message });
  }
});

UserRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, gender } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.send({ msg: "User already exists", ok: false });
    }

    const newUser = await new UserModel({
      first_name,
      last_name,
      email,
      password,
      phone,
      gender,
    });

    await newUser.save();

    res.json({ msg: "User Registered", ok: true });
  } catch (error) {
    res.send({ msg: "Server error", Error: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ msg: "User does not exist", ok: false });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.json({ msg: "Invalid Credentials", ok: false });
    }

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ msg: "Login Successful", token, refreshToken, ok: true });
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

UserRouter.get("/validatetoken", (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ msg: "Valid token", ok: true });
  } catch (error) {
    res.json({ msg: false, Error: error.message });
  }
});

// ------------------ Google auth -----------------------
// Set up Google authentication callback route
UserRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "send the link of register page",
  }),
  (req, res) => {
    try {
      // Redirect user to the home page after authentication
      res.redirect("/google-verify");
    } catch (error) {
      res.send(error.message);
    }
  }
);

// Set up Google authentication route (hit this to start the Google authentication process)
UserRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Set up Google authentication verification route
UserRouter.get("/google-verify", async (req, res) => {
  try {
    // check if the email is verified from the googel if not send error
    if (!req.user || !req.user.emails[0].verified || !req.user.id) {
      res.status(400).json({ msg: "Invalid access to route" });
      return;
    }

    const { displayName, emails } = req.user;

    const user = {
      first_name: displayName,
      last_name: displayName,
      email: emails[0].value,
      password: uuidv4(),
      phone: 123456789,
      gender: "google",
    };

    // // save the user details in the database here
    const userInDb = await UserModel.findOne({ email: user.email });

    let newUserId = "";
    if (!userInDb) {
      const newUser = new UserModel(user);
      await newUser.save();
      newUserId = newUser._id;
    }
    //  send the token to the frontend
    const token = jwt.sign(
      { userid: newUserId ? newUserId : userInDb._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7h",
      }
    );

    // redirect the user to the frontend
    res.redirect(`http://127.0.0.1:5500/frontend/main.html?token=${token}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong*", error });
  }
});

module.exports = { UserRouter };
