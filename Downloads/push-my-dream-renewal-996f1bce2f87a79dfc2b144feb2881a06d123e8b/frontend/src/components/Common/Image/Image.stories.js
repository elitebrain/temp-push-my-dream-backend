import React from "react";
import Image from "./Image";
// import src from "public/assets/image/intro_bg01.jpg";

export default {
  title: "Image",
  component: Image
};

export const image = () => (
  <Image width="300px" height="100vh" loadingTime="2" />
);
