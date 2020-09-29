import React, { useCallback } from "react";

import Content from "components/Layout/Content";
import WalletNoti from "../WalletNoti";
import WalletContent from "../WalletContent";
import Buttongroup from "../ButtonGroup";
import List from "components/Common/List";
import SupportItem from "./SupportItem";

import {
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  WHITE_COLOR,
} from "shared/constants/colors";
import { numberWithCommasAndCheckNone } from "shared/functions";

const MySupport = ({ support: { receive_push, supportList } }) => {
  const renderItem = useCallback(
    (supportItem) => (
      <SupportItem key={supportItem.push_log_no} support={supportItem} />
    ),
    []
  );

  return (
    <div className="MySupportContainer">
      <Content>
        <div className="title">받은 후원</div>
      </Content>
      <div className="content">
        <span className="key">PUSH</span>
        <span className="value">
          {numberWithCommasAndCheckNone(receive_push || 0)}
        </span>
      </div>
      {/* Noti */}
      <WalletNoti title="받은 후원 이란?">
        경연과 상관없이 프로듀서가 참여자의 활동을 지원하기 위해 제공하는 PUSH로
        100,000 PUSH 이상 부터 10,000 PUSH 단위로 현금으로 전환 출금이
        가능합니다.
      </WalletNoti>
      <div className="WalletContentContainer">
        <WalletContent title="후원 받은 현황">
          <List list={supportList} renderItem={renderItem} />
        </WalletContent>
      </div>

      <Buttongroup left="출금 하기" right="출금 내역" />
      <style jsx>{`
        .MySupportContainer .title {
          font-size: 18px;
          color: #fff;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .MySupportContainer .content {
          padding: 15px 20px;
          background: ${GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")};
          display: flex;

          justify-content: space-between;
          align-items: flex-end;
        }

        .MySupportContainer .content .key {
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
        }

        .MySupportContainer .content .value {
          font-weight: bold;
          font-size: 22px;
          color: ${WHITE_COLOR};
        }

        .MySupportContainer .WalletContentContainer {
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default MySupport;
