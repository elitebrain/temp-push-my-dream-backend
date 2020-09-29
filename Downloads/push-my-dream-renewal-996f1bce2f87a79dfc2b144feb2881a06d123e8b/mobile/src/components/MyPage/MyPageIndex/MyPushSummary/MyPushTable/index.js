import React from "react";
import PropTypes from "prop-types";

import {
  HEADER_BLACK_BG_COLOR,
  WHITE_COLOR,
  COLOR_3B3D55,
  COLOR_696C8C,
} from "shared/constants/colors";

import DynamicLoader from "components/Common/DynamicLoader";

import arrow_right from "public/assets/icon/arrow_right_ico(purple).svg";
import Link from "next/link";

const MyPushTable = ({
  children,
  isLoading,
  title,
  moreContent,
  moreContentLink,
}) => {
  return (
    <div className="MyPushTable">
      <div className="MyPushTable_Header">
        <h3>{title}</h3>

        <Link href={moreContentLink}>
          <a className="MyPushTable_MoreContent">
            {moreContent}
            <span className="MyPushTable_MoreContent_Icon">
              <img width="100%" height="100%" src={arrow_right} />
            </span>
          </a>
        </Link>
      </div>
      <div className="MyPushTable_Body">
        {isLoading ? (
          <div className="MyPushTable_Body_Loader">
            <DynamicLoader loaderColor="#fff" size="40px" />
          </div>
        ) : (
          children
        )}
      </div>
      <style jsx>{`
        .MyPushTable {
          width: 100%;

          margin-bottom: 15px;
        }
        .MyPushTable:last-of-type {
          margin: none;
        }

        .MyPushTable .MyPushTable_Header {
          box-sizing: border-box;
          padding: 0 10px;
          width: 100%;
          height: 30px;
          border: 1px solid ${COLOR_3B3D55};
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .MyPushTable .MyPushTable_Header h3 {
          font-weight: bold;
          font-size: 12px;
          color: ${COLOR_696C8C};
        }

        .MyPushTable .MyPushTable_Header .MyPushTable_MoreContent {
          display: flex;
          align-items: center;
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
          cursor: pointer;
          text-decoration: none;
        }

        .MyPushTable .MyPushTable_Header .MyPushTable_MoreContent_Icon {
          width: 15px;
          height: 15px;
          margin-left: 10px;
        }
        .MyPushTable .MyPushTable_Body {
          box-sizing: border-box;
          padding: 15px 10px;

          border-radius: 0px 0px 5px 5px;
        }

        .MyPushTable .MyPushTable_Body .MyPushTable_Body_Loader {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

MyPushTable.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  moreContent: PropTypes.string.isRequired,
  moreContentLink: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default MyPushTable;
