// pages/api/signin.js

import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import {hash, compare} from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  await dbConnect();

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

          return res.status(200).json({message: "Welcome Back", token});
        } else {
          return res.status(401).json({success: false, message: "Incorrect password"});
        }
      } else {
        const hashedPassword = await hash(password, 10);
        user = await User.create({email, password: hashedPassword, ipAddress});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({message: "Sign In Successfully", token});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: "Server Error 123"});
    }
  } else {
    return res.status(405).json({success: false, message: "Method Not Allowed"});
  }
}
