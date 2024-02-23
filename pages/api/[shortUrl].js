import dbConnect from "../../utils/dbConnect";
import Url from "../../models/Url";

export default async function handler(req, res) {
  await dbConnect();

  const { shortUrl, ip } = req.query;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    if (url.isIpAddress) {
      if (url.ipAddress !== ip) {
        return res.status(404).json({ error: "URL is privact" });
      }
    }

    url.clicks += 1;

    const browserInfo = req.headers["user-agent"];
    if (browserInfo) {
      const clickInfo = {
        browser: browserInfo,
        clickedAt: new Date(),
      };
      url.clickDetails.push(clickInfo);
    }

    await url.save();

    if (url.isOneTime) {
      await Url.findOneAndDelete({ shortUrl });
    }

    res.json({ originalUrl: url.originalUrl });
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
