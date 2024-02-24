import shortid from "shortid";
import Url from "../../models/Url";
import dbConnect from "../../utils/dbConnect";

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const {
      originalUrl,
      userIp,
      isCustom,
      customUrl,
      isOneTime,
      ipAddress,
      isIpAddress,
    } = req.body;

    if (!urlRegex.test(originalUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    try {
      const existingUrl = await Url.findOne({
        $or: [{ originalUrl }, { customUrl }],
      });

      if (existingUrl) {
        if (existingUrl.originalUrl === originalUrl) {
          return res.status(200).json({
            message: "Your long URL already exists",
            url: existingUrl,
          });
        } else if (existingUrl.customUrl === customUrl) {
          return res
            .status(200)
            .json({ message: "Custom short ID already exists" });
        }
      }

      const shortUrl = isCustom
        ? customUrl
        : shortid.generate().substring(0, 4);

      const url = await Url.create({
        originalUrl,
        shortUrl,
        userIp,
        isCustom,
        customUrl: isCustom ? customUrl : undefined,
        isOneTime,
        isIpAddress,
        ipAddress,
      });

      const successMessage = isCustom
        ? "Custom URL created successfully"
        : "Short link created successfully";
      res.status(200).json({ message: successMessage, url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
