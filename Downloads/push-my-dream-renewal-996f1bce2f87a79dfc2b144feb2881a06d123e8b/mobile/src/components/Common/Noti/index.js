import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { COLOR_696C8C, WHITE_COLOR } from "shared/constants/colors";

const Noti = ({ children, title, vertical, verticalTitleWidth }) => {
  const notiClass = useMemo(() => `${vertical ? "vertical" : ""}`, [vertical]);

  return (
    <div className={notiClass}>
      <div className="NotiContainer">
        <span className="Mark">?</span>
        <span className="Title">{title}</span>
      </div>
      <div className="noti_content">{children}</div>
      <style jsx>{`
        .vertical {
          display: flex;
          align-item: flex-start;
        }
        .NotiContainer {
          margin-bottom: 5px;
        }

        .vertical .NotiContainer {
          display: flex;
          flex-basis: ${verticalTitleWidth};
          margin-right: 10px;
          margin-bottom: initial;
        }
        .NotiContainer .Mark {
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
        .NotiContainer .Title {
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

        .vertical .noti_content {
          padding-left: initial;
          flex: 1;
        }
      `}</style>
    </div>
  );
};

Noti.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  vertical: PropTypes.bool,
};

export default Noti;
