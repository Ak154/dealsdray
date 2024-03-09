const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, resp) => {
    try {
      const userExist = await User.findOne({ username: req.body.username });
      if (userExist) {
        return resp
          .status(200)
          .send({ message: "User already exist", success: false });
      }
      const password = req.body.password;
      const Salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, Salt);
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      await newUser.save();
      resp
        .status(200)
        .send({ message: "User created successfully", success: true });
    } catch (error) {
      console.log(error);
      resp
        .status(500)
        .send({ message: "Error creating user", success: false, error });
    }
  });
  
  router.post("/login", async (req, resp) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return resp
          .status(200)
          .send({ message: "User doesn't exist", success: false });
      }
  
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return resp
          .status(200)
          .send({ message: "incorrect password", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        resp
          .status(200)
          .send({ message: "Login successful", success: true, data: token });
      }
    } catch (error) {
      console.log(error);
      resp
        .status(500)
        .send({ message: "Error in login page", success: false, error });
    }
  });

// router.get('/:f_userName', async(req, resp)=>{
//      const { f_userName } = req.params;
//     try {
//         const user = await User.findOne({f_userName})
//         if(user){
//             resp.json(user);
//         }else{
//             return resp.status(404).send({ message:"User not found", success: false})
//         }
//     } catch (error) {
//         console.log("Error in fetching user details", error);
//         resp.status(500).send({ message: "Internal server error"})
//     }
// })

router.post("/get-user-info-by-id", authMiddleware, async (req, resp) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return resp
          .status(200)
          .send({ message: "User does not exist", success: false });
      } else {
        return resp.status(200).send({ success: true, data: user });
      }
    } catch (error) {
      return resp
        .status(500)
        .send({ message: "Error getting user info", success: false, error });
    }
  });

module.exports = router;
