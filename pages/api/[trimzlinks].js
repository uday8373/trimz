import DbConnect from "../../utils/DbConnect";
import TrimzLink from "../../models/TrimzLink";
import {VerifyToken} from "../../utils/VerifyToken";

export default async function handler(req, res) {
  await DbConnect();

  if (req.method === "GET") {
    const {trimzLink} = req.query;
    const token = req.headers.token;
    try {
      const userId = await VerifyToken(token);
      if (!userId) {
        return res.status(201).json({success: false, message: "Token Error"});
      }
      const user = await TrimzLink.findOne({trimzLink});
      if (user) {
        return res
          .status(200)
          .json({success: true, message: "Data fetch successfully", user});
      }
      return res.status(201).json({success: false, message: "Trimzlink not found"});
    } catch (error) {}
  }
}
