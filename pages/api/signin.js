// pages/api/signin.js

import DbConnect from "../../utils/DbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import {hash, compare} from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  await DbConnect();

  if (req.method === "POST") {
    const {email, password, ipAddress} = req.body;

    try {
      let user = await User.findOne({email});

      if (user) {
        const isPasswordMatch = await compare(password, user.password);

        if (isPasswordMatch) {
          await User.findOneAndUpdate({email}, {ipAddress});
          console.log("env", process.env.JWT_SECRET);

          const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET);

          return res.status(200).json({success: true, message: "Welcome Back", token});
        } else {
          return res.status(201).json({success: false, message: "Incorrect password"});
        }
      } else {
        return res
          .status(201)
          .json({success: false, message: "Don't have an account. Sign Up"});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: "Server Error"});
    }
  } else {
    return res.status(405).json({success: false, message: "Method Not Allowed"});
  }
}
