import React, { useCallback } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import NewButton from "components/Common/NewButton";
import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import { OPEN_MODAL } from "store/reducers/modal";

const Buttongroup = ({ left, right, leftLink, rightLink }) => {
  const dispatch = useDispatch();

  const onReadyPage = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        content: "준비 중입니다.",
        isViewClose: false,
      },
    });
  }, [dispatch]);
  return (
    <div className="button_container">
      {leftLink ? (
        <Link href={leftLink}>
          <a className="button_link">
            <NewButton
              height="40px"
              bgColor={BACKGROUND_BLACK_COLOR}
              gradient
              activeAnimation
              fontSize="14px"
              style={{ fontWeight: "normal" }}
            >
              {left}
            </NewButton>
          </a>
        </Link>
      ) : (
        <a className="button_link">
          <NewButton
            height="40px"
            bgColor={BACKGROUND_BLACK_COLOR}
            gradient
            activeAnimation
            fontSize="14px"
            style={{ fontWeight: "normal" }}
            onClick={onReadyPage}
          >
            {left}
          </NewButton>
        </a>
      )}
      {rightLink ? (
        <Link href={rightLink}>
          <a className="button_link">
            <NewButton
              height="40px"
              bgColor={BACKGROUND_BLACK_COLOR}
              gradient
              activeAnimation
              fontSize="14px"
              style={{ fontWeight: "normal" }}
            >
              {right}
            </NewButton>
          </a>
        </Link>
      ) : (
        <a className="button_link">
          <NewButton
            height="40px"
            bgColor={BACKGROUND_BLACK_COLOR}
            gradient
            activeAnimation
            fontSize="14px"
            style={{ fontWeight: "normal" }}
            onClick={onReadyPage}
          >
            {right}
          </NewButton>
        </a>
      )}

      <style jsx>{`
        .button_container {
          box-sizing: border-box;
          width: 100%;
          background-color: ${BACKGROUND_BLACK_COLOR};
          margin-top: 30px;
          padding: 20px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .button_container .button_link {
          flex: 1;
        }

        .button_container .button_link:first-of-type {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Buttongroup;
