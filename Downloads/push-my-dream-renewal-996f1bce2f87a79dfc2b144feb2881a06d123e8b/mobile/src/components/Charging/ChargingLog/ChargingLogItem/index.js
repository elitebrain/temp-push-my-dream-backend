import React, { useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash/collection";

import circleExclamation from "public/assets/icon/circle_exclamation.svg";
import {
  COLOR_696C8C,
  WHITE_COLOR,
  BACKGROUND_WHITE_COLOR,
} from "shared/constants/colors";
import { numberWithCommasAndCheckNone } from "shared/functions";

const pgcodeList = [
  { pgcode: "virtualaccount", pgname: "가상계좌" },
  { pgcode: "mobile", pgname: "모바일" },
  { pgcode: "creditcard", pgname: "신용카드" },
  { pgcode: "banktransfer", pgname: "인터넷뱅킹" },
];

const ChargingLogItem = ({ log, openModal }) => {
  /**
   * pgName 캐싱
   */
  const pgName = useMemo(
    () => _.find(pgcodeList, (pg) => pg.pgcode === log.pgcode).pgname,
    [pgcodeList, log]
  );

  return (
    <div className="ChargingLogItem">
      <div className="ChargingLogItem_Header">
        <p className="Date">
          <span className="YMD">
            {moment(log.updated_at).format("YYYY.MM.DD")}
          </span>
          {` ${moment(log.updated_at).format("HH:mm:ss")}`}
        </p>
        {log.status === 2 && (
          <div className="ResultPush">{`${numberWithCommasAndCheckNone(
            log.have_push
          )} PUSH`}</div>
        )}
      </div>
      <div className="ChargingLogItem_Content">
        <div className="PG">{pgName}</div>
        <div className="PUSH">{numberWithCommasAndCheckNone(log.amount)}</div>
      </div>
      {log.status === 1 && log.pgcode === "virtualaccount" && (
        <div className="ChargingLogItem_Wait_VirtualAccount">
          <div className="TagContainer" onClick={openModal}>
            <div className="Tag">입금대기</div>
          </div>
          <span className="Date">{`입금기한 : ${moment(log.expire_date).format(
            "YYYY.MM.DD"
          )}`}</span>

          <img src={circleExclamation} />
        </div>
      )}
      <style jsx>{`
        .ChargingLogItem {
          padding: 15px 20px;
          border-bottom: 0.5px solid rgba(57, 57, 74, 0.4);
        }

        .ChargingLogItem:last-of-type {
          border-bottom: initial;
        }

        .ChargingLogItem_Header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          height: 12px;
          font-size: 10px;
          color: ${COLOR_696C8C};
          margin-bottom: 5px;
        }

        .ChargingLogItem_Header .Date .YMD {
          color: ${WHITE_COLOR};
        }

        .ChargingLogItem_Content {
          display: flex;
          justify-content: space-between;
          align-items: center;

          height: 20px;
          font-size: 16px;
          color: ${WHITE_COLOR};
          margin-bottom: 5px;
        }

        .ChargingLogItem_Content .PG {
          height: 100%;
          line-height: 20px;
        }

        .ChargingLogItem_Content .PUSH {
          font-weight: bold;
          height: 100%;
          line-height: 20px;
        }

        .ChargingLogItem_Wait_VirtualAccount {
          height: 16px;
          line-height: 16px;
          display: flex;
          align-items: center;
        }

        .ChargingLogItem_Wait_VirtualAccount .TagContainer {
          display: inline-block;
          margin-right: 3px;
        }

        .ChargingLogItem_Wait_VirtualAccount .TagContainer .Tag {
          width: 45px;
          height: 16px;
          font-size: 10px;
          display: flex;
          justify-content: center;
          align-items: center;

          background-color: ${BACKGROUND_WHITE_COLOR};
          border-radius: 4px;
          color: ${COLOR_696C8C};
        }

        .ChargingLogItem_Wait_VirtualAccount .Date {
          color: ${COLOR_696C8C};
          margin-right: 5px;
          font-size: 10px;
        }

        .ChargingLogItem_Wait_VirtualAccount .ImageContainer {
        }

        .ChargingLogItem_Wait_VirtualAccount img {
          width: 13px;
          height: 13px;
        }
      `}</style>
    </div>
  );
};

ChargingLogItem.prtopTypes = {
  log: PropTypes.shape({
    updated_at: PropTypes.string,
    status: PropTypes.number,
    have_push: PropTypes.number,
    pgcode: PropTypes.string,
    amount: PropTypes.number,
    expire_date: PropTypes.string,
  }),
  openModal: PropTypes.func,
};

export default ChargingLogItem;
