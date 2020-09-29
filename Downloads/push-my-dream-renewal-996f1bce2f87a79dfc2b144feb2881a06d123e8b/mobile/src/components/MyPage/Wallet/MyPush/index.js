import React from "react";
import PropTypes from "prop-types";

import Retention from "./Retention";
import SeasonPush from "./SeasonPush";
import WalletNoti from "../WalletNoti";
import ButtonGroup from "../ButtonGroup";

const MyPush = ({ push }) => {
  return (
    <div className="mypush_container">
      {/* My Push */}
      <Retention havePush={push.have_push} />
      {/* Season Push */}
      <SeasonPush seasonPushList={push && push.residualPushList} />
      {/* Noti */}
      <WalletNoti title="Season PUSH 란?">
        참여한 시즌에서 다음 차수 경연(예선2차, 3차 등)을 진행하기 위해 앞선
        차수에서 사용한 PUSH를 되돌려 받은 것입니다. <br />
        Season PUSH는 해당 시즌 내에서만 사용 가능하며 이미 1회 이상 사용한
        PUSH로 환불되지 않습니다. <br />
        Season PUSH를 기간(돌려 받은 직후 차수 경연 기간)내 사용하지 않을 경우
        최종 우승자에게 사용된 것으로 간주됩니다.
      </WalletNoti>
      <ButtonGroup
        left="충전 내역 상세"
        leftLink="/mypage/log/charging"
        right="PUSH 내역 상세"
        rightLink="/mypage/log/push"
      />
    </div>
  );
};

MyPush.propTypes = {
  push: PropTypes.shape({
    have_push: PropTypes.number,
    residualPushList: PropTypes.array,
  }),
};
export default MyPush;
