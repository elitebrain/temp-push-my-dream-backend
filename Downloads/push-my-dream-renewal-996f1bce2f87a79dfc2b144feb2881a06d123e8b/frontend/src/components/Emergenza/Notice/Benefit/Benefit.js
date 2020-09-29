import React, { useContext } from "react";
import BenefitMenu from "./BenefitMenu";
import VictoryBenefit from "./VictoryBenefit";
import ParticipationBenefit from "./ParticipationBenefit";
import ParticipationWay from "./ParticipationWay";
import { EmergenzaContext } from "../EmergenzaNoticeComponent";

const Benefit = () => {
  const { benefitMenu } = useContext(EmergenzaContext);

  return (
    <div className="benefit">
      <BenefitMenu />
      {/* 우승혜택 */}
      {benefitMenu === 1 && <VictoryBenefit />}
      {/* 참여 혜택 */}
      {benefitMenu === 2 && <ParticipationBenefit />}
      {/* 참여방법 */}
      {benefitMenu === 3 && <ParticipationWay />}
      <style jsx>{`
          .benefit {
            padding-bottom: 150px;
          }
        `}</style>
    </div>
  );
};

export default Benefit;
