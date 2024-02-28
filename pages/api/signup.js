// pages/api/signup.js

import DbConnect from "../../utils/DbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import {hash} from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  await DbConnect();

  if (req.method === "POST") {
    const {email, password, name, ipAddress} = req.body;

    try {
      let user = await User.findOne({email});

      if (user) {
        return res
          .status(201)
          .json({success: false, message: "Already have an account, Sign In"});
      } else {
        const hashedPassword = await hash(password, 10);
        user = await User.create({email, name, password: hashedPassword, ipAddress});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

        return res
          .status(200)
          .json({success: true, message: "Sign Up Successfully", token});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: "Server Error 123"});
    }
  } else {
    return res.status(405).json({success: false, message: "Method Not Allowed"});
  }
}
