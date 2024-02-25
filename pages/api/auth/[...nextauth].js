// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import {signIn} from "next-auth/react";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      const {email, image, name} = user;

      await dbConnect();

      try {
        let existingUser = await User.findOne({email});

        if (!existingUser) {
          existingUser = await User.create({email, image, name, ip: profile.ip});
        } else {
          existingUser.name = name;
          existingUser.image = image;
          existingUser.ip = profile.ip;
          await existingUser.save();
        }

        const token = await jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET);

        return Promise.resolve(true, {...user, token});
      } catch (error) {
        console.error("Error signing in with Google:", error);
        return Promise.resolve(false);
      }
    },
  },
  session: {
    jwt: true,
  },
});
