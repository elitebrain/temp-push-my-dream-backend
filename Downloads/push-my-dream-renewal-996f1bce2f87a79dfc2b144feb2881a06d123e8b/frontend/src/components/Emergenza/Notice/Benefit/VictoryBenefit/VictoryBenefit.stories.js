import React from "react";
import VictoryBenefit from "./VictoryBenefit";
import Background from "components/Common/Background";
import { BLACK_COLOR } from "shared/constants/colors";

export default {
  title: "BenefitVictoryBenefit",
  component: VictoryBenefit
};

export const victoryBenefit = () => (
  <Background width="100%" height="100vh" color={BLACK_COLOR}>
    <VictoryBenefit />
  </Background>
);
