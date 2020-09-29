import React from "react";
import PropTypes from "prop-types";

import Content from "components/Layout/Content";
import { COLOR_696C8C, WHITE_COLOR } from "shared/constants/colors";

const WalletNoti = ({ children, title }) => {
  return (
    <div className="WalletNoti">
      <Content>
        <div className="TitleContainer">
          <span className="Mark">?</span>
          <span className="Title">{title}</span>
        </div>
        <div className="noti_content">{children}</div>
      </Content>
      <style jsx>{`
        .WalletNoti {
          margin-top: 30px;
        }
        .TitleContainer {
          margin-bottom: 5px;
        }
        .TitleContainer .Mark {
          width: 14px;
          height: 14px;
          line-height: 14px;
          text-align: center;
          margin-right: 10px;
          border-radius: 50%;
          font-size: 12px;
          background-color: ${WHITE_COLOR};
          color: black;
          font-weight: bold;
          display: inline-block;
          vertical-align: middle;
        }
        .TitleContainer .Title {
          font-size: 12px;
          line-height: 15px;
          color: ${WHITE_COLOR};
          display: inline-block;
          vertical-align: middle;
        }
        .noti_content {
          font-weight: 500;
          font-size: 10px;
          color: ${COLOR_696C8C};
          padding-left: 25px;
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
};

WalletNoti.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default WalletNoti;
