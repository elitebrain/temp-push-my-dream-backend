import React from "react";
import PropTypes from "prop-types";

import { COLOR_696C8C, WHITE_COLOR } from "shared/constants/colors";

const CustomInfo = ({ title, content, style }) => {
  return (
    <div className="information_container">
      <div className="content_box" style={style}>
        <span className="title">{title}</span>
        <span className="border" />
        <span className="content">{content}</span>
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
         {
          /* .content_box:last-child {
          padding-bottom: 50px;
          margin-bottom: initial;
        } */
        }
        .content_box .title {
          flex-basis: 53px;
          width: 53px;
          margin-right: 6px;
          font-size: 14px;
          color: ${COLOR_696C8C};
          line-height: 17px;
          white-space: nowrap;
        }

        .content_box .border {
          width: 0px;
          height: 12px;
          border: 0.7px solid #ae46e7;
          margin-right: 6px;
          margin-top: 2px;
        }
        .content_box .content {
          flex: 1;
          font-size: 14px;
          line-height: 17px;
          color: ${WHITE_COLOR};
        }
      `}</style>
    </div>
  );
};

CustomInfo.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  style: PropTypes.object,
};

export default CustomInfo;
