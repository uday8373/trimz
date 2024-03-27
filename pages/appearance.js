import React from "react";
import Appearance from "../container/appearance/Appearance";
import Auth from "../utils/auth";

export default function appearance() {
  return (
    <>
      <Auth>
        <Appearance />
      </Auth>
    </>
  );
}
