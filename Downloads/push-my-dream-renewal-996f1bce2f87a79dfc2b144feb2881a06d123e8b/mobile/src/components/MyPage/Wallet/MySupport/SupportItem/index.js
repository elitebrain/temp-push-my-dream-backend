import React from "react";
import moment from "moment";

import Avatar from "components/Common/Avatar";

import { COLOR_696C8C, WHITE_COLOR } from "shared/constants/colors";
import { numberWithCommasAndCheckNone } from "shared/functions";

const SupportItem = ({
  support: {
    USER: { nickname, user_photo },
    support,
    sum_support,
    created_at,
  },
}) => {
  return (
    <div className="SupportItem">
      <div className="AvatarContainer">
        <Avatar photo={user_photo} width="100%" height="100%" />
      </div>
      <div className="Content">
        <div className="Top">
          <span>{moment(created_at).format("YYYY.MM.DD HH:mm")}</span>
          <span>{`개인 누적: ${numberWithCommasAndCheckNone(
            sum_support
          )}`}</span>
        </div>
        <div className="Bottom">
          <span className="Nickname">{nickname}</span>
          <span className="Support">
            {numberWithCommasAndCheckNone(support)}
          </span>
        </div>
      </div>

      <style jsx>{`
        .SupportItem {
          width: 100%;
          height: 45px;
          padding: 10px 0;
          border-bottom: 0.5px solid ${COLOR_696C8C};

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .SupportItem:first-of-type {
          padding-top: 0px;
        }

        .SupportItem:last-of-type {
          padding-bottom: 0px;
          border-bottom: 0px;
        }

        .SupportItem .AvatarContainer {
          flex-basis: 45px;
          width: 45px;
          height: 45px;
        }

        .SupportItem .Content {
          margin-left: 20px;
          width: 100%;
          flex: 1;
        }

        .SupportItem .Content .Top {
          display: flex;
          justify-content: space-between;
          align-items: center;

          font-size: 10px;
          line-height: 12px;
          color: ${COLOR_696C8C};
        }

        .SupportItem .Content .Bottom {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          font-size: 14px;
          line-height: 17px;
          color: ${WHITE_COLOR};
        }

        .SupportItem .Content .Nickname {
          font-weight: bold;
          width: 100%;
          flex-wrap: wrap;
          word-break: keep-all;
        }

        .SupportItem .Content .Support {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default SupportItem;
