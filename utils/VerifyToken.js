// utils/VerifyToken.js

import jwt from "jsonwebtoken";

export const VerifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken.userId;
  } catch (error) {
    return null;
  }
};
