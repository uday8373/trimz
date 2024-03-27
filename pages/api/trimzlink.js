import DbConnect from "../../utils/DbConnect";
import TrimzLink from "../../models/TrimzLink";
import {VerifyToken} from "../../utils/VerifyToken";

export default async function handler(req, res) {
  await DbConnect();
  const RESERVED_TRIMZ_LINKS = [
    "erex",
    "Erex",
    "EREX",
    "erexstudio",
    "ErexStudio",
    "EREXSTUDIO",
    "appearance",
    "trimzlink",
    "trimzLink",
    "TrimzLink",
    "trimzMe",
    "TrimzMe",
    "Trimz",
  ];

  if (req.method === "POST") {
    const {trimzLink} = req.body;
    const token = req.headers.token;
    try {
      const MAX_TRIMZLINK_PER_USER = 10;
      const user = await TrimzLink.findOne({trimzLink});

      if (user) {
        return res.status(201).json({success: false, message: "User name already taken"});
      }

      const userId = await VerifyToken(token);
      if (!userId) {
        return res.status(201).json({success: false, message: "Token Error"});
      }
      const userTrimzLinksCount = await TrimzLink.countDocuments({userId});
      if (userTrimzLinksCount >= MAX_TRIMZLINK_PER_USER) {
        return res.status(201).json({
          success: false,
          message: "Maximum limit reached",
        });
      }

      if (RESERVED_TRIMZ_LINKS.includes(trimzLink)) {
        return res
          .status(201)
          .json({success: false, message: "This trimzLink is reserved"});
      }

      const linkData = {
        name: trimzLink,
        trimzLink,
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
    const {trimzLink} = req.query;
    const token = req.headers.token;
    try {
      if (RESERVED_TRIMZ_LINKS.includes(trimzLink)) {
        return res
          .status(201)
          .json({success: false, message: "This trimzLink is reserved"});
      }
      const user = await TrimzLink.findOne({trimzLink});
      if (user) {
        return res
          .status(201)
          .json({success: false, message: "That username is already taken"});
      }
      return res.status(200).json({success: true, message: "User name available"});
    } catch (error) {}
  }
  if (req.method === "PATCH") {
    const {trimzLink} = req.query;
    const {name, about, backgroundColor, image, socialLinks} = req.body;
    const token = req.headers.token;

    try {
      // Verify user token
      const userId = await VerifyToken(token);
      if (!userId) {
        return res.status(401).json({success: false, message: "Token Error"});
      }

      const id = {trimzLink: trimzLink};
      const data = await TrimzLink.findOne(id);
      if (data.userId.toString() !== userId) {
        return res.status(403).json({success: false, message: "Unauthorized access"});
      }

      const updatedFields = {
        name,
        about,
        backgroundColor,
        image,
        socialLinks,
      };

      const trimzLinkDoc = await TrimzLink.findOneAndUpdate(id, updatedFields);

      return res.status(200).json({
        success: true,
        message: "TrimzLink updated successfully",
        trimzLink: trimzLinkDoc,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, error: "Internal server error"});
    }
  }
}
