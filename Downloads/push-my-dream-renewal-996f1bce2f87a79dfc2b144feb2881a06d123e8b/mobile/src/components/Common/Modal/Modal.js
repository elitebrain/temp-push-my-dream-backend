import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { CLOSE_MODAL } from "store/reducers/modal";
import {
  BACKGROUND_BLACK_COLOR,
  GRADIENT_FFFFFF_C0C5DF_C0C5DF,
  BLACK_COLOR,
  COLOR_3B3D55,
  COLOR_979CCA,
  GRADIENT_00F1B4_D53CF5,
} from "shared/constants/colors";
import NewButton from "../NewButton";

const Modal = () => {
  const {
    view,
    custom,
    container,
    content,
    onConfirm,
    onClose,
    confirmText,
    closeText,
    isViewClose,
    isClose,
    top,
    bottom,
    transparent,
  } = useSelector((state) => state.modal);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view) {
      document.body.style.overflow = "hidden";
    }

    return function cleanup() {
      document.body.style.overflow = null;
      setIsConfirming(false);
      setIsCanceling(false);
    };
  }, [view, onConfirm, onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (!isConfirming) {
        if (onConfirm) {
          setIsConfirming(true);
          await onConfirm();
        } else {
          dispatch({ type: CLOSE_MODAL });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [onConfirm, dispatch, isConfirming]);

  const handleClose = useCallback(() => {
    try {
      if (!isCanceling) {
        if (onClose) {
          setIsCanceling(true);
          onClose();
        } else {
          dispatch({ type: CLOSE_MODAL });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, isClose, onClose, isCanceling]);

  if (!view) {
    return null;
  }

  return (
    <div className="Modal_container">
      <div className="Modal_dialog" onClick={handleClose}></div>
      {/* {isViewCloseIcon && (
        <AiOutlineClose
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "25px",
            height: "25px",
            color: "#aaa",
            cursor: "pointer",
          }}
        />
      )} */}
      <div className="Modal_content">
        {custom && container}
        {!custom && (
          <div className="modal">
            <div className="infoContainer">{content}</div>
            <div className="buttonContainer">
              {isViewClose && (
                <NewButton
                  onClick={handleClose}
                  width="95px"
                  height="35px"
                  color={COLOR_979CCA}
                  bgColor={BACKGROUND_BLACK_COLOR}
                  borderRadius="20px"
                  gradient
                  style={{ marginRight: "20px" }}
                >
                  {closeText ? closeText : "취소"}
                </NewButton>
              )}
              <NewButton
                onClick={handleConfirm}
                width="95px"
                height="35px"
                bgImage={GRADIENT_FFFFFF_C0C5DF_C0C5DF(180)}
                color={COLOR_3B3D55}
                borderRadius="20px"
              >
                {confirmText ? confirmText : "확인"}
              </NewButton>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .Modal_container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: ${top ? "flex-start" : bottom ? "flex-end" : "center"};
        }
        .Modal_container .Modal_close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 25px;
          height: 25px;
          color: "#aaa";
          cursor: pointer;
        }
        .Modal_container .Modal_dialog {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${transparent
            ? "transparent"
            : BACKGROUND_BLACK_COLOR};
          z-index: 0;
        }
        .Modal_container .Modal_content {
          position: relative;
          z-index: 1;
        }

        .Modal_container .Modal_content .modal {
          width: 90vw;
          max-width: 450px;
          padding: 50px 20px;
          border: solid 1px transparent;
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
          border-radius: 10px;
          box-sizing: border-box;
        }

        .Modal_container .Modal_content .modal .infoContainer {
          font-size: 18px;
          line-height: 30px;
          text-align: center;
          color: ${COLOR_979CCA};
          word-break: keep-all;
          margin-bottom: 40px;
        }

        .Modal_container .Modal_content .modal .buttonContainer {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

Modal.propTypes = {
  view: PropTypes.bool,
  custom: PropTypes.bool,
  container: PropTypes.node,
  content: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  isViewClose: PropTypes.bool,
};

export default Modal;
