import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { CLOSE_MODAL } from "store/reducers/modal";

const Modal = () => {
  const {
    view,
    custom,
    container,
    content,
    onConfirm,
    onClose,
    confirmText,
    isViewClose,
    isClose,
    top,
    bottom,
  } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [view]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    dispatch({ type: CLOSE_MODAL });
  }, [onConfirm, dispatch]);

  const handleClose = useCallback(() => {
    if (isClose) {
      if (onClose) {
        onClose();
      }
      dispatch({ type: CLOSE_MODAL });
    }
  }, [dispatch, isClose, onClose]);

  if (!view) {
    return null;
  }

  return (
    <div className="Modal_container">
      <div className="Modal_dialog" onClick={handleClose}></div>
      {isClose && (
        <AiOutlineClose
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "30px",
            height: "30px",
            color: "#fff",
            cursor: "pointer",
          }}
        />
      )}
      <div className="Modal_content">
        {custom && container}
        {!custom && (
          <div className="modal">
            <div className="infoContainer">{content}</div>
            <div className="buttonContainer">
              {isViewClose && (
                <button
                  className="close"
                  onClick={handleClose}
                  style={{ maringRight: "5px" }}
                >
                  취소
                </button>
              )}
              <button onClick={handleConfirm}>
                {confirmText ? confirmText : "확인"}
              </button>
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
          width: 30px;
          height: 30px;
          color: #fff;
          cursor: pointer;
        }
        .Modal_container .Modal_dialog {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 0;
        }
        .Modal_container .Modal_content {
          position: relative;
          z-index: 1;
        }

        .Modal_container .Modal_content .modal {
          width: 450px;
          background-color: #fff;
          border-radius: 10px;
        }

        .Modal_container .Modal_content .modal .infoContainer {
          padding: 50px;
          font-size: 18px;
          line-height: 30px;
          text-align: center;
          font-weight: 700;
        }

        .Modal_container .Modal_content .modal .buttonContainer {
          margin: 0 auto;
          width: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 30px;
        }

        .Modal_container .Modal_content .modal .buttonContainer button.close {
          background-color: #757575;
          margin-right: 10px;
        }

        .Modal_container .Modal_content .modal .buttonContainer button {
          width: 135px;
          height: 60px;
          background-color: #f38400;
          border-radius: 10px;
          border: none;
          color: #fff;
          font-size: 18px;
          font-weight: 400;
          cursor: pointer;
          display: block;
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
