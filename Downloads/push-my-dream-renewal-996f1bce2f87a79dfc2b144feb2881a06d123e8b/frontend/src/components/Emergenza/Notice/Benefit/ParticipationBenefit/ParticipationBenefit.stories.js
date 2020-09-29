import React from "react";
import ParticipationBenefit from "./ParticipationBenefit";
import Background from "components/Common/Background";
import { BLACK_COLOR } from "shared/constants/colors";

export default {
  title: "BenefitParticipationBenefit",
  component: ParticipationBenefit
};

export const participationBenefit = () => (
  <Background width="100%" height="100%" color={BLACK_COLOR}>
    <ParticipationBenefit />
  </Background>
);
