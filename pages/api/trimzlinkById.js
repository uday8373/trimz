import DbConnect from "../../utils/DbConnect";
import {VerifyToken} from "../../utils/VerifyToken";
import TrimzLink from "../../models/TrimzLink";

export default async function handler(req, res) {
  await DbConnect();
  if (req.method === "GET") {
    const token = req.headers.token;

    try {
      const userId = await VerifyToken(token);
      if (!userId) {
        return res.status(401).json({success: false, message: "Token Error"});
      }

      const data = await TrimzLink.find({userId});

      return res.status(200).json({success: true, data});
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, error: "Internal server error"});
    }
  }
}
