import DbConnect from "../../../utils/DbConnect";
import TrimzLink from "../../../models/TrimzLink";

export default async function handler(req, res) {
  await DbConnect();

  const {trimzLink} = req.query;

  try {
    const data = await TrimzLink.findOne({trimzLink});
    if (!data) {
      res.status(500).json({error: "Trimzlink not found"});
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
}
