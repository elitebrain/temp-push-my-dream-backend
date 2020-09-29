import React, { useCallback } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Content from "components/Layout/Content";
import NewButton from "components/Common/NewButton";

import {
  WHITE_COLOR,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_2F3354_040221,
} from "shared/constants/colors";
import { numberWithCommasAndCheckNone } from "shared/functions";
import { OPEN_MODAL } from "store/reducers/modal";

const Retention = ({ havePush }) => {
  const dispatch = useDispatch();

  const onViewModal = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        content: "준비 중입니다.",
        isViewClose: false,
      },
    });
  }, [dispatch]);
  return (
    <div className="retention">
      <Content>
        <div className="title_container">
          <span className="title">MY PUSH</span>

          {/* <NewButton
            width="80px"
            height="35px"
            bgColor={BACKGROUND_BLACK_COLOR}
            gradient
            fontSize="12px"
            onClick={onViewModal}
          >
            충전하기
          </NewButton> */}

          <Link href="/charging">
            <a>
              <NewButton
                width="80px"
                height="35px"
                bgColor={BACKGROUND_BLACK_COLOR}
                gradient
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
          </Link>
        </div>
      </Content>
      <div className="content">
        <span>{numberWithCommasAndCheckNone(havePush)}</span>
      </div>
      <style jsx>{`
        .retention .title_container {
          overflow: hidden;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .retention .title_container .title {
          font-size: 18px;
          font-weight: bold;
          color: ${WHITE_COLOR};
        }

        .retention .content {
          padding: 15px 20px;
          background: ${GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")};
          text-align: right;
        }
        .retention .content span {
          font-weight: bold;
          font-size: 22px;
          color: ${WHITE_COLOR};
        }
      `}</style>
    </div>
  );
};

Retention.propTypes = {
  havePush: PropTypes.number,
};

export default Retention;
