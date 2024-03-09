import DbConnect from "../../../utils/DbConnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  await DbConnect();

  if (req.method === "POST") {
    const {email, image, name, ipAddress} = req.body;

    try {
      let user = await User.findOne({email});

      if (user) {
        await User.findOneAndUpdate({email}, {ipAddress, name, image});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

        return res
          .status(200)
          .json({success: true, message: "Sign In Successfully", token});
      } else {
        user = await User.create({email, name, image, ipAddress});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

        return res
          .status(200)
          .json({success: true, message: "Sign In Successfully", token});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: "Server Error 123"});
    }
  } else {
    return res.status(405).json({success: false, message: "Method Not Allowed"});
  }
}
