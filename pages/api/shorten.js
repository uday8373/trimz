import shortid from "shortid";
import Url from "../../models/Url";
import DbConnect from "../../utils/DbConnect";
import {VerifyToken} from "../../utils/VerifyToken";

import rateLimit from "../../utils/RateLimit";

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
  const RESERVED_URL = [
    "trimzMe",
    "TrimzMe",
    "https://www.trimz.me/",
    "https://trimz.me/",
    "https://trimz.me",
    "trimz.me",
  ];

  if (req.method === "POST") {
    const {
      originalUrl,
      userIp,
      isCustom,
      customUrl,
      isOneTime,
      ipAddress,
      isIpAddress,
      isSignIn,
    } = req.body;
    const token = req.headers.token;

    try {
      await rateLimit(req, res, userIp);

      let userId;

      if (token) {
        userId = await VerifyToken(token);
        if (!userId) {
          return res.status(201).json({success: false, message: "Token Error"});
        }
      }
      if (RESERVED_TRIMZ_LINKS.includes(customUrl)) {
        return res
          .status(201)
          .json({success: false, message: "This custom URL is reserved"});
      }

      if (RESERVED_URL.some((reservedUrl) => originalUrl.includes(reservedUrl))) {
        return res
          .status(201)
          .json({success: false, message: "Restricted url ! please try different URL."});
      }

      const shortUrl = isCustom ? customUrl : shortid.generate().substring(0, 4);

      const existingUrl = await Url.findOne({
        $or: [{originalUrl}, {customUrl}, {shortUrl}],
      });

      if (existingUrl) {
        if (existingUrl.originalUrl === originalUrl) {
          return res.status(200).json({
            success: true,
            message: "Your long URL already exists",
            url: existingUrl,
          });
        } else if (existingUrl.customUrl === customUrl) {
          return res
            .status(201)
            .json({success: false, message: "Custom short ID already exists"});
        } else if (existingUrl.shortUrl === shortUrl) {
          return res
            .status(201)
            .json({success: false, message: "Something went wrong, Try again"});
        }
      }

      const isDefault = !(isCustom || isOneTime || isIpAddress);

      const urlData = {
        originalUrl,
        shortUrl,
        userIp,
        isCustom,
        customUrl: isCustom ? customUrl : undefined,
        isOneTime,
        isIpAddress,
        ipAddress,
        isDefault,
        isSignIn,
      };

      if (userId) {
        urlData.userId = userId;
      }

      const url = await Url.create(urlData);

      const successMessage = isCustom
        ? "Custom URL created successfully"
        : "Short link created successfully";
      res.status(200).json({success: true, message: successMessage, url});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Internal server error"});
    }
  }

  if (req.method === "GET") {
    const {ip, page = 0, sort = "asc"} = req.query;
    const token = req.headers.token;
    const limit = 5;
    const skip = page * limit;

    try {
      let data;
      let totalCount;

      if (token) {
        const userId = await VerifyToken(token);
        if (!userId) {
          return res.status(201).json({success: false, message: "Token Error"});
        }

        data = await Url.find({$or: [{userId: userId}, {userIp: ip}]})
          .skip(skip)
          .limit(limit)
          .sort({updated_at: sort});
        if (!data) {
          return res.status(201).json({success: false, message: "Data not found"});
        }
        totalCount = (
          await Url.countDocuments({$or: [{userId: userId}, {userIp: ip}]})
        ).toFixed();
      } else {
        data = await Url.find({userIp: ip})
          .skip(skip)
          .limit(limit)
          .sort({updated_at: sort});
        if (!data) {
          return res.status(201).json({success: false, message: "Data not found"});
        }
        totalCount = (await Url.countDocuments({userIp: ip})).toFixed();
      }

      return res.status(200).json({
        success: true,
        message: "Data found successfully",
        response: {data, totalCount, page},
      });
    } catch (error) {
      console.error("Error retrieving URL:", error);
      res.status(500).json({error: "Internal server error"});
    }
  }
}
