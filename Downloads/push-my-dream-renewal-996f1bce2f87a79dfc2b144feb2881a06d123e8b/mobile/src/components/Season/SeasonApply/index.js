import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import TitleHeader from "components/Common/TitleHeader";
import Content from "components/Layout/Content";
import Title from "./Title";
import SeasonApplyTypes from "./SeasonApplyTypes";

import { BACKGROUND_BLACK_COLOR, COLOR_696C8C } from "shared/constants/colors";

const SeasonApply = ({ season, onApplySeason }) => {
  return (
    <>
      <TitleHeader>참가 하기</TitleHeader>
      <div
        className="container"
        style={{
          overflow: "hidden",
          paddingBottom: "80px",
          backgroundColor: BACKGROUND_BLACK_COLOR,
        }}
      >
        <Title season={season} />
        <Content>
          <div className="content_title">참가 형식을 선택해주세요!</div>
          <SeasonApplyTypes onApplySeason={onApplySeason} />
        </Content>
      </div>
      <style jsx>{`
        .content_title {
          margin: 30px 0 20px 0;
          font-size: 18px;
          text-align: center;
          color: ${COLOR_696C8C};
        }
      `}</style>
    </>
  );
};

SeasonApply.propTypes = {
  season: PropTypes.object,
  onApplySeason: PropTypes.func,
};

export default SeasonApply;
