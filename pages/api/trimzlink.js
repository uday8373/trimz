import DbConnect from "../../utils/DbConnect";
import TrimzLink from "../../models/TrimzLink";
import {VerifyToken} from "../../utils/VerifyToken";

export default async function handler(req, res) {
  await DbConnect();

  if (req.method === "POST") {
    const {name} = req.body;
    const token = req.headers.token;
    try {
      const user = await TrimzLink.findOne({name});

      if (user) {
        return res.status(201).json({success: false, message: "User name already taken"});
      }

      const userId = await VerifyToken(token);
      if (!userId) {
        return res.status(201).json({success: false, message: "Token Error"});
      }

      const linkData = {
        name,
        userId: userId,
      };

      const link = await TrimzLink.create(linkData);
      res.status(200).json({success: true, message: "Link Create Succesful", link});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Internal server error"});
    }
  }
  if (req.method === "GET") {
    const {name} = req.query;
    const token = req.headers.token;
    try {
      const userId = await VerifyToken(token);
      if (!userId) {
        return res.status(201).json({success: false, message: "Token Error"});
      }
      const user = await TrimzLink.findOne({name});
      if (user) {
        return res
          .status(201)
          .json({success: false, message: "That username is already taken"});
      }
      return res.status(200).json({success: true, message: "User name available"});
    } catch (error) {}
  }
}
