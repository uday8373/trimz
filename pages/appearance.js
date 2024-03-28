import React from "react";
import Appearance from "../container/appearance/Appearance";
import Auth from "../utils/auth";
import {NextSeo} from "next-seo";

export default function appearance() {
  return (
    <>
      <NextSeo
        title="Trimzlink:  Create Your All-in-One Personal Profile with Trimzlink | Social Media Link Aggregator"
        description="Discover Trimzlink, your ultimate solution to crafting a comprehensive personal profile. Consolidate all your social media links into one convenient location. Simplify sharing, enhance your online presence, and make connections effortlessly. Get started with Trimzlink today!"
      />
      <Auth>
        <Appearance />
      </Auth>
    </>
  );
}
