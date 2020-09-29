import React, { useCallback } from "react";
import PropTypes from "prop-types";
import css from "styled-jsx/css";

import Content from "components/Layout/Content";
import WalletContent from "../../WalletContent";
import { COLOR_696C8C, WHITE_COLOR } from "shared/constants/colors";
import List from "components/Common/List";
import { numberWithCommasAndCheckNone } from "shared/functions";

const SeasonWalletItemStyle = css`
  .summary {
    text-align: right;
  }

  .summary .type {
    line-height: 18px;
    margin-right: 20px;
    font-size: 12px;
    color: ${COLOR_696C8C};
    display: inline-block;
    vertical-align: middle;
  }
  .summary .value {
    /* max-width: calc(100% - 43px); */
    width: 100px;
    font-size: 12px;
    color: ${WHITE_COLOR};
    display: inline-block;
    vertical-align: middle;
  }
  .residual {
    overflow: hidden;
    line-height: 27px;
    margin-top: 10px;
  }
  .residual .type {
    float: left;
    font-size: 12px;
    color: ${COLOR_696C8C};
  }
  .residual .value {
    float: right;
    font-size: 22px;
    color: ${WHITE_COLOR};
    font-weight: bold;
  }
`;

const SeasonPush = ({ seasonPushList }) => {
  // 시즌 지갑 렌더링
  const renderSeasonWalletItem = useCallback(
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
        {/* <div className="summary">
          <span className="type">시작</span>
          <span className="value">
            {numberWithCommasAndCheckNone(season.total_push)}
          </span>
        </div> */}
        <div className="summary">
          <span className="type">누적 사용</span>
          <span className="value">
            {numberWithCommasAndCheckNone(
              season.total_push - season.residual_push
            )}
          </span>
        </div>
        {/* 
        <div className="residual">
          <span className="type">잔여 PUSH</span>
          <span className="value">
            {numberWithCommasAndCheckNone(season.residual_push)}
          </span>
        </div> */}
        <style jsx>{SeasonWalletItemStyle}</style>
      </WalletContent>
    ),
    []
  );

  return (
    <div className="SeasonPush_container">
      <Content>
        <div className="title">Season PUSH</div>
      </Content>
      <List list={seasonPushList} renderItem={renderSeasonWalletItem} />

      <style jsx>{`
        .SeasonPush_container {
          margin-top: 40px;
        }
        .title {
          font-weight: bold;
          font-size: 18px;
          color: #fff;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

SeasonPush.propTypes = {
  seasonPushList: PropTypes.array,
};

export default SeasonPush;
