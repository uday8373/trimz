// rateLimit.js
import {RateLimiterMemory} from "rate-limiter-flexible";

const opts = {
  points: 10, // 10 requests
  duration: 24 * 60 * 60, // per 24 hours
};

const rateLimiter = new RateLimiterMemory(opts);

export default async function rateLimit(req, res, userIp) {
  try {
    const ip = userIp;

    await rateLimiter.consume(ip, 1);
    return true;
  } catch (err) {
    console.error(err);
    res.status(429).json({success: false, message: "Too many requests from this IP"});
    return false;
  }
}
