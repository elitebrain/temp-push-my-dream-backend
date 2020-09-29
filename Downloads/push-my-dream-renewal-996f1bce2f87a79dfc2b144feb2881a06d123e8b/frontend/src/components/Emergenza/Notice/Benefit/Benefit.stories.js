import React from "react";
import Benefit from "./Benefit";
import Background from "components/Common/Background";
import { BLACK_COLOR } from "shared/constants/colors";

export default {
  title: "Benefit",
  component: Benefit
};

export const benefit = () => (
  <Background width="100%" height="100vh" color={BLACK_COLOR}>
    <Benefit />
  </Background>
);
