const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    // check if user with the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      // create a new user
      const user = new userModel({ email, password: hash, name, age });
      await user.save();

      // return success message
      res.status(201).json({ message: "User created successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      // Load hash from your password DB.
      bcrypt.compare(password, user.password, (err, result) => {
        // result == true

        if (result) {
          const token = jwt.sign(
            { authorId: user.id, author: user.name },
            "shhhhh"
          );
          res.status(200).json({ message: "Login Sucessful", token });
        }
      });
    } else {
      res.send({ message: "Wrong Crendentials", token });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = { userRouter };
