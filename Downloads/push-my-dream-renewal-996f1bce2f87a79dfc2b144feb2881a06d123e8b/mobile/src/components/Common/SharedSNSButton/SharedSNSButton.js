import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Button from "../Button";

import share_ico from "public/assets/icon/share_ico(white).svg";

import { OPEN_MODAL } from "store/reducers/modal";
import SharedSNSModal from "../Modal/SharedSNSModal";

// 버튼이면 icon을 적지 않고
// 아이콘이면 icon을 적는다

// 참조 : https://kipid.tistory.com/entry/Sharing-URI-through-SNS
const SharedSNSButton = ({
  text,
  url,
  icon,
  kakaoTitle,
  kakaoDescription,
  kakaoImage,
  children,
}) => {
  const dispatch = useDispatch();

  // 공유창 출력 여부
  const onViewSharedContainer = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({
        type: OPEN_MODAL,
        data: {
          isViewCloseIcon: false,
          custom: true,
          bottom: true,
          transparent: true,
          container: (
            <SharedSNSModal
              url={url}
              text={text}
              kakaoTitle={kakaoTitle}
              kakaoDescription={kakaoDescription}
              kakaoImage={kakaoImage}
            />
          ),
        },
      });
      // setView(prev => !prev);
    },
    [dispatch, url, text, kakaoTitle, kakaoDescription, kakaoImage]
  );

  // 아이콘 일시
  return (
    <>
      {icon ? (
        <div className="icon_container">
          {React.cloneElement(children, { onClick: onViewSharedContainer })}
        </div>
      ) : (
        // 버튼일시
        <div className="button_container">
          <Button
            handleClick={onViewSharedContainer}
            style={{
              width: "108px",
              height: "33px",
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              cursor: "pointer",
            }}
          >
            <img
              src={share_ico}
              width="13px"
              height="12px"
              className="share_ico"
            />
            <span>공유 하기</span>
          </Button>
        </div>
      )}
      <style jsx>{`
        /* 아이콘 */
        .icon_container {
          display: inline-block;
          position: relative;
        }
        /* .icon_container img {
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
          width: 15px;
          height: 15px;
        } */

        /* 버튼 */
        .button_container .share_ico {
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
        }

        .button_container .shared_ico + span {
          display: inline-block;
          vertical-align: middle;
          font-size: 13px;
        }
      `}</style>
    </>
  );
};

SharedSNSButton.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

export default SharedSNSButton;
