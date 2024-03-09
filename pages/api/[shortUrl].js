import DbConnect from "../../utils/DbConnect";
import Url from "../../models/Url";
import UAParser from "ua-parser-js";

export default async function handler(req, res) {
  await DbConnect();

  const {shortUrl, ip} = req.query;

  try {
    const url = await Url.findOne({shortUrl});

    if (!url) {
      return res.status(404).json({error: "URL not found"});
    }

    if (url.isIpAddress) {
      if (url.ipAddress !== ip) {
        return res.status(404).json({error: "URL is privacy"});
      }
    }

    url.clicks += 1;

    const parser = new UAParser();
    const userAgent = req.headers["user-agent"];
    const parsedUA = parser.setUA(userAgent).getResult();

    const browserName = parsedUA.browser.name;
    const systemName = parsedUA.os.name;

    if (browserName) {
      const clickInfo = {
        browser: browserName,
        os: systemName,
        clickedAt: new Date(),
        clickIp: ip,
      };
      url.clickDetails.push(clickInfo);
    }

    await url.save();

    if (url.isOneTime) {
      await Url.findOneAndDelete({shortUrl});
    }

    res.json({originalUrl: url.originalUrl});
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({error: "Internal server error"});
  }
}
