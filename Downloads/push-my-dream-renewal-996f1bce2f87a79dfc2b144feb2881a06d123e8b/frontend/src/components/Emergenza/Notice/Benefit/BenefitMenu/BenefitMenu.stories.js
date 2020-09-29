import React from "react";
import BenefitMenu from "./BenefitMenu";
import { BLACK_COLOR } from "shared/constants/colors";
import Background from "components/Common/Background";

export default {
  title: "BenefitMenu",
  component: BenefitMenu
};

export const benefitMenu = () => (
  <Background width="100%" height="100vh" color={BLACK_COLOR}>
    <BenefitMenu />
  </Background>
);
