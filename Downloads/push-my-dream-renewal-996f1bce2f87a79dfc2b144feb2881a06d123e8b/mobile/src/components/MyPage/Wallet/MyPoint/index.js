import React, { useCallback } from "react";
import PropTypes from "prop-types";

import Content from "components/Layout/Content";
import WalletNoti from "../WalletNoti";
import WalletContent from "../WalletContent";
import DreamerItem from "./DreamerItem";
import ButtonGroup from "../ButtonGroup";
import List from "components/Common/List";

const MyPoint = ({ point }) => {
  const renderDreamerItem = useCallback(
    (dreamer) => <DreamerItem key={dreamer.user_no} dreamer={dreamer} />,
    []
  );

  const renderSeasonPointItem = useCallback(
    (season) => (
      <WalletContent
        key={season.category_level3_no}
        title={
          season &&
          season.CATEGORY_LEVEL3 &&
          season.CATEGORY_LEVEL3.category_level3
        }
        icon={
          season &&
          season.CATEGORY_LEVEL2 &&
          season.CATEGORY_LEVEL2.category_level2_icon
        }
      >
        <List
          list={season && season.dreamerList}
          renderItem={renderDreamerItem}
        />
      </WalletContent>
    ),
    []
  );

  return (
    <div className="myponint_container">
      <Content>
        <div className="title">보유 Point</div>
      </Content>
      <List
        list={point && point.seasonList}
        renderItem={renderSeasonPointItem}
      />
      {/* Noti */}
      <WalletNoti title="Point 란?">
        참여자에게 PUSH 할때 발행되는 Point로 각 Point는 해당 시즌 내에서 해당
        참여자의 관련 이벤트(LOOK 투표 등) 에서 사용할 수 있습니다.
      </WalletNoti>
      <ButtonGroup
        left="POINT 획득 내역"
        leftLink="/mypage/log/push"
        right="POINT 사용 내역"
      />
      <style jsx>{`
        .title {
          font-size: 18px;
          color: #fff;
          margin-bottom: 20px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

MyPoint.propTypes = {
  point: PropTypes.shape({
    seasonList: PropTypes.array,
  }),
};

export default MyPoint;
