import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { COLOR_696C8C, WHITE_COLOR } from "shared/constants/colors";

const Info = ({ season }) => {
  return (
    <div className="information_container">
      <div className="content_box">
        <span className="title">대회기간</span>
        <span className="border" />
        <span className="content">{`${moment(season.start_time).format(
          "YYYY.MM.DD"
        )} ~ ${moment(season.end_time).format("MM.DD")}`}</span>
      </div>
      <div className="content_box">
        <span className="title">참여자격</span>
        <span className="border" />
        <span className="content">{season.eligibility_participate}</span>
      </div>
      <div className="content_box">
        <span className="title">심사기준</span>
        <span className="border" />
        <span className="content">{season.judging_method}</span>
      </div>
      <div className="content_box">
        <span className="title">우승혜택</span>
        {/* <span className="content_list">
          <span>1.&nbsp;&nbsp;우승 PUSH의 30% 수령</span>
          <span>2.&nbsp;&nbsp;인플루언서 활동 지원</span>
          <span>3.&nbsp;&nbsp;매니지먼트 지원</span>
        </span> */}
      </div>
      {/* <span className="noti">
        ※ 참여자와의 협의한 활동 방향에 따라 구체적인 지원 방법이 결정됩니다.
      </span> */}
      <style jsx>{`
        .information_container {
          /*margin-top: 20px;*/
        }
        .content_box {
          display: flex;
          align-items: flex-start;
          margin-bottom: 5px;
        }
        .content_box:last-child {
          padding-bottom: 50px;
          margin-bottom: initial;
        }
        .content_box .title {
          flex-basis: 53px;
          width: 55px;
          margin-right: 13px;
          font-size: 14px;
          color: ${COLOR_696C8C};
          line-height: 17px;
        }

        .content_box .border {
          width: 0px;
          height: 12px;
          border: 0.7px solid #ae46e7;
          margin-right: 13px;
          margin-top: 2px;
        }
        .content_box .content {
          flex: 1;
          font-size: 14px;
          line-height: 17px;
          color: ${WHITE_COLOR};
        }
        .content_list {
          margin-top: 5px;
          font-size: 12px;
          color: #fff;
          border-radius: 5px;
          background-color: #141418;
          padding: 10px;
          display: block;
        }
        .content_list span {
          line-height: 25px;
          display: block;
        }
        .noti {
          font-size: 12px;
          color: #878792;
          display: block;
        }
      `}</style>
    </div>
  );
};

Info.propTypes = {
  season: PropTypes.shape({
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    eligibility_participate: PropTypes.string,
    judging_method: PropTypes.string,
  }),
};

export default Info;
