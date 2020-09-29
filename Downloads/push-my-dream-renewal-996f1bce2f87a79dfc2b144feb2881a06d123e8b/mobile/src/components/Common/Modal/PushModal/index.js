import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  GRADIENT_00F1B4_D53CF5,
  BACKGROUND_BLACK_COLOR,
  FONT_WHITE_COLOR,
  COLOR_979CCA,
  COLOR_3B3D55,
  GRADIENT_FFFFFF_C0C5DF_C0C5DF,
} from "shared/constants/colors";
import NewButton from "components/Common/NewButton";

const PushModal = (props) => {
  const {
    closePushModal,
    title,
    cancelText,
    confirmText,
    handleCancel,
    handleConfirm,
    modalHeight = 449,
    btnFontSize = 18,
    btnFontWeight = 700,
    containerPadding = "20px",
    headerHeight = 30,
    headerFontSize = 18,
    children,
  } = props;
  const [activeBtnBG, setActiveBtnBG] = useState("transparent");
  const [activeSpanBG, setActiveSpanBG] = useState("#000");
  const _handleTouchStart = () => {
    console.log("_handleTouchStart");
    setActiveSpanBG("transparent");
    setTimeout(() => {
      setActiveBtnBG(`linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(180deg, #ffffff 0%, #c0c5df 100%)`);
    }, 200);
  };
  console.log(activeBtnBG, activeSpanBG);
  return (
    <div className="modal_rectangle">
      <div className="modal__overlay" onClick={() => closePushModal()}></div>
      <div className="modal__content push_modal">
        <div className="container">
          {title && <div className="header">{title}</div>}
          <div className="body">{children}</div>
          <div className="footer">
            {cancelText && (
              <NewButton
                // className="cancel_btn"
                onTouchStart={_handleTouchStart}
                onClick={() => handleCancel()}
                width="95px"
                height="35px"
                color={COLOR_979CCA}
                bgColor={BACKGROUND_BLACK_COLOR}
                borderRadius="20px"
                gradient
                style={{ marginRight: "20px" }}
              >
                {cancelText}
              </NewButton>
            )}
            {confirmText && (
              <NewButton
                // className="confirm_btn"
                onTouchStart={_handleTouchStart}
                onClick={() => handleConfirm()}
                width="95px"
                height="35px"
                bgImage={GRADIENT_FFFFFF_C0C5DF_C0C5DF(180)}
                color={COLOR_3B3D55}
                borderRadius="20px"
              >
                {confirmText}
              </NewButton>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .push_modal {
          position: absolute;
          width: 289px;
          height: ${modalHeight}px;
          border-radius: 10px;
          background: linear-gradient(to right, #00f1b4, #d53cf5);
        }
        .container {
          position: absolute;
          left: 1px;
          top: 1px;
          width: 287px;
          height: ${modalHeight - 2}px;
          border-radius: 10px;
          background-color: #000;
          padding: ${containerPadding};
          box-sizing: border-box;
          overflow-y: auto;
        }
        .header {
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
          /* width: calc(100% + 40px); */

          /* margin-left: -20px; */
          height: ${headerHeight}px;
          text-align: center;
          line-height: ${headerHeight}px;
          color: ${FONT_WHITE_COLOR};
          border: 1px solid transparent;
          font-size: ${headerFontSize}px;
          border-radius: 5px;
        }
        .body {
          font-size: 18px;
          color: #aaa;
          box-sizing: border-box;
          width: 100%;
          margin-top: 1px;
        }
        .footer {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
          height: 45px;
        }
        .cancel_btn {
          width: 130px;
          margin-right: 7px;
        }
        .cancel_btn,
        .confirm_btn {
          position: relative;
          display: inline-block;
          text-align: center;
          background: linear-gradient(to right, #00f1b4, #d53cf5);
          border: none;
          border-radius: 30px;
          color: #fff;
          font-size: ${btnFontSize}px;
          height: 45px;
          font-weight: ${btnFontWeight};
          line-height: 45px;
          transition: 0.6s ease-in-out;
        }
        .confirm_btn {
          width: ${cancelText ? "130px" : "100%"};
        }
        .cancel_btn:active,
        .confirm_btn:active {
          color: #aaa;
          background: ${activeBtnBG};
          transition: 0.6s ease-in-out;
        }
        .cancel_btn:active > span,
        .confirm_btn:active > span {
          background: ${activeSpanBG};
        }
        .cancel_btn > span,
        .confirm_btn > span {
          position: absolute;
          left: 1px;
          top: 1px;
          width: 128px;
          height: 43px;
          border-radius: 30px;
          background-color: #000;
        }
        @keyframes wave {
          0% {
            background: radial-gradient(#000 0%, #000 100%);
          }
          20% {
            background: radial-gradient(#000 0%, #ffffff 30%);
          }
          40% {
            background: radial-gradient(#ffffff 0%, #c0c5df 30%);
          }
          60% {
            background: radial-gradient(#ffffff 0%, #c0c5df 60%);
          }
          100% {
            background: radial-gradient(#ffffff 0%, #c0c5df 100%);
          }
        }
      `}</style>
    </div>
  );
};

PushModal.propTypes = {
  closePushModal: PropTypes.func,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  modalHeight: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default PushModal;
