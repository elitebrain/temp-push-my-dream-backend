import React, { useCallback } from "react";

import MyPushTable from "./MyPushTable";
import NewButton from "components/Common/NewButton";
import ResidualPushItem from "./ResidualPushItem";
import ParticipationItem from "./ParticipationItem";
import List from "components/Common/List";

import charging_btn from "public/assets/image/charging_btn.png";

import {
  GRAY_COLOR,
  WHITE_COLOR,
  MAIN_COLOR,
  GRADIENT_2F3354_040221,
  BACKGROUND_BLACK_COLOR,
  COLOR_696C8C,
} from "shared/constants/colors";
import { numberWithCommas } from "shared/functions";
import Link from "next/link";

const MyPushSummary = ({ isLoading, havePush, residualPushList }) => {
  // 잔여 PUSH 리스트 렌더링
  const renderResidualPushItem = useCallback(
    (item, index) => <ResidualPushItem key={index} item={item} />,
    []
  );

  // 잔여 PUSH 리스트 렌더링
  const renderParticipationItem = useCallback(
    (item, index) => <ParticipationItem key={index} item={item} />,
    []
  );

  return (
    <div className="MyPushSummary_container">
      <div className="MyPushSummary_header">
        <h2 className="title">잔여 PUSH</h2>
        <Link href="/charging">
          <a>
            <NewButton
              className="ChargingButton"
              width="78px"
              height="35px"
              fontSize="12px"
              onClick={() =>
                sessionStorage.setItem(
                  "charging_ref",
                  location.pathname + location.search
                )
              }
            >
              충전하기
            </NewButton>
          </a>
          {/* <a
            className="charging"
            onClick={() =>
              sessionStorage.setItem(
                "charging_ref",
                location.pathname + location.search
              )
            }
          /> */}
        </Link>
      </div>

      <MyPushTable
        isLoading={isLoading}
        title="잔여 PUSH"
        moreContent="내 지갑"
        moreContentLink="/mypage/wallet"
      >
        <List list={residualPushList} renderItem={renderResidualPushItem} />
        <div className="HavePush_container">
          {Boolean(havePush) && <h4 className="HavePush">미사용 PUSH</h4>}
          <span className="Push">
            {havePush ? numberWithCommas(havePush) : "-"}
          </span>
        </div>
      </MyPushTable>
      <MyPushTable
        isLoading={isLoading}
        title="참여중 SEASON"
        moreContent="PUSH 내역"
        moreContentLink="/mypage/log/push"
      >
        <List
          list={residualPushList}
          renderItem={renderParticipationItem}
          empty={<div className="Empty">구매한 PUSH 정보가 없습니다.</div>}
        />
      </MyPushTable>
      <style jsx>{`
        .MyPushSummary_container {
          background-image: ${GRADIENT_2F3354_040221(180)};
          padding: 25px 20px;
        }

        .MyPushSummary_container .MyPushSummary_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .MyPushSummary_container .MyPushSummary_header .charging {
          width: 78px;
          height: 35px;
          background-image: url(${charging_btn});
          background-repeat: no-repeat;
          background-size: cover;
        }

        .MyPushSummary_container .title {
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          color: ${WHITE_COLOR};
        }

        .MyPushSummary_container .HavePush_container {
          margin-top: 10px;
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .MyPushSummary_container .HavePush_container .HavePush {
          font-size: 12px;

          text-align: left;
          color: ${COLOR_696C8C};
        }

        .MyPushSummary_container .HavePush_container .Push {
          font-size: 22px;
          text-align: right;
          color: ${WHITE_COLOR};
          font-weight: bold;
        }

        .Empty {
          text-align: center;
          height: 50px;
          font-size: 12px;
          color: ${COLOR_696C8C};
        }

        :global(.ChargingButton) {
          background: linear-gradient(
                179.04deg,
                rgb(47, 51, 84) -53.29%,
                rgb(4, 2, 33) 203.27%
              )
              padding-box padding-box,
            linear-gradient(90deg, rgb(0, 241, 180) 0%, rgb(213, 60, 245) 100%)
              border-box border-box;
          border: 1px solid transparent !important;
        }
      `}</style>
    </div>
  );
};

export default MyPushSummary;
