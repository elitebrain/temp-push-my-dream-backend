import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import NewButton from "components/Common/NewButton";
import TitleHeader from "components/Common/TitleHeader";

import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import arrowLeft from "public/assets/icon/arrow_left(white).svg";
import Content from "./Content";

const PushBody = (props) => {
  const {
    title,
    confirmText,
    cancelText,
    handleConfirm,
    handleBack,
    contentPaddingNone,
    style,
    children,
  } = props;
  const [minHeight, setMinHeight] = useState("calc(100vh - 272px)");
  useEffect(() => {
    if (window) {
      setMinHeight(`${window.innerHeight - 272}px`);
    }
  });
  return (
    <div className="container">
      <TitleHeader>{title}</TitleHeader>
      <Content contentPaddingNone={contentPaddingNone}>
        <div className="wrapper" style={style}>
          {children}
        </div>
        {(cancelText || confirmText) && (
          <div className="btns">
            {cancelText && (
              <div className="btn">
                <NewButton
                  gradient
                  borderRadius="10px"
                  bgColor={BACKGROUND_BLACK_COLOR}
                  fontSize="16px"
                  onClick={handleBack}
                  // className="cancel_btn"
                >
                  {cancelText}
                </NewButton>
              </div>
            )}
            <div className="btn">
              <NewButton
                gradient
                borderRadius="10px"
                bgColor={BACKGROUND_BLACK_COLOR}
                fontSize="16px"
                onClick={() => handleConfirm()}
              >
                {confirmText}
              </NewButton>
            </div>
            {/* <button className="confirm_btn" onClick={() => handleConfirm()}>
            {confirmText}
          </button> */}
          </div>
        )}
      </Content>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          padding-bottom: 20px;
          box-sizing: border-box;
          overflow: auto;
        }
        .title {
          position: relative;
          font-size: 20px;
          color: #f1f1f1;
          text-align: center;
          height: 55px;
          line-height: 55px;
        }
        .wrapper {
          /* min-height: 558px; */
          min-height: ${minHeight};
          overflow: hidden;
          box-sizing: border-box;
          font-size: 11px;
          color: #fff;
        }
        .btns {
          position: relative;
          width: calc(100% - 40px);
          margin: auto;
          height: 65px;
          line-height: 65px;
          text-align: center;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btns .btn {
          flex: 1;
        }
        .btns .btn:nth-child(2n) {
          margin-left: 10px;
        }

        .cancel_btn,
        .confirm_btn {
          position: relative;
          height: 100%;
          background-color: #f38400;
          color: #fff;
          border: none;
          font-size: 20px;
          font-weight: 700;
        }
        .cancel_btn {
          width: 50%;
        }
        .cancel_btn:before {
          position: absolute;
          content: "";
          right: 0;
          bottom: 0;
          width: 0;
          height: 100%;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
        .confirm_btn {
          width: ${cancelText ? "50%" : "100%"};
        }
      `}</style>
    </div>
  );
};

PushBody.propTypes = {
  title: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
  handleBack: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default PushBody;
