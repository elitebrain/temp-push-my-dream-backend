import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";

import Button from "../Button";

import share_ico from "public/assets/icon/share_ico(white).svg";
import facebookIco from "public/assets/icon/facebook_ico.svg";
import twitterIco from "public/assets/icon/twitter_ico.svg";
import kakaoIco from "public/assets/icon/kakao_ico.svg";

import linkIco from "public/assets/image/link_ico.png";
import { setSearchValueOfKey } from "shared/functions";
import { KAKAO_KEY } from "shared/constants/keys";
import { ORIGIN_SHARE_URL } from "shared/constants/variables";
import { OPEN_MODAL } from "store/reducers/modal";

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
  style,
  userNo,
  videoNo,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [view, setView] = useState(false);
  // addSearch: 공유한 주소로 접속 시 ModalUserProfile 띄우기 위한 userNo & videoNo
  let addSearch = router.asPath;
  addSearch = userNo
    ? setSearchValueOfKey(location.search, "userNo", userNo)
    : "";
  console.log("addSearch", addSearch, "videoNo", videoNo);
  if (videoNo) {
    addSearch = setSearchValueOfKey(addSearch, "videoNo", videoNo);
  }
  const sharedUrl = url ? url : `${ORIGIN_SHARE_URL}${addSearch}`;
  console.log("router", router);
  useEffect(() => {
    const ID = "kakao-sdk";
    const kakaoSdkCheck = document.getElementById(ID);

    if (!kakaoSdkCheck) {
      const kakaoSdk = document.createElement("script");
      kakaoSdk.id = ID;
      kakaoSdk.src = "//developers.kakao.com/sdk/js/kakao.min.js";

      kakaoSdk.onload = function () {
        window.Kakao.init(KAKAO_KEY);
      };

      document.head.appendChild(kakaoSdk);
    }
  }, []);

  // 공유창 출력 여부
  const onViewSharedContainer = useCallback((e) => {
    e.stopPropagation();
    console.log("g");
    setView((prev) => !prev);
  }, []);

  // 페이스북 공유
  const onSharedFacebook = useCallback(
    (e) => {
      e.stopPropagation();
      const search = {
        // u: "https://test.khanteum.com/vote/42"
        u: sharedUrl,
      };
      const stringified = queryString.stringify(search);

      console.log(`https://www.facebook.com/sharer/sharer.php?${stringified}`);

      window.open(`https://www.facebook.com/sharer/sharer.php?${stringified}`);
    },
    [router, url, sharedUrl]
  );

  // 트위터  공유
  const onSharedTwitter = useCallback(
    (e) => {
      e.stopPropagation();
      const search = {
        url: sharedUrl,
        text,
      };
      const stringified = queryString.stringify(search);
      window.open(`https://twitter.com/intent/tweet?${stringified}`);
    },
    [router, url, sharedUrl]
  );

  // 카카오 공유
  const onSharedKakao = useCallback(
    (e) => {
      // 참고 http://127.0.0.1:3030/71

      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: kakaoTitle || "",
          description: kakaoDescription.replace(/(<([^>]+)>)/gi, "") || "",
          imageUrl: kakaoImage || "",
          link: {
            mobileWebUrl: sharedUrl,
            webUrl: sharedUrl,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: sharedUrl,
              webUrl: sharedUrl,
            },
          },
        ],
      });
    },
    [router, url, kakaoTitle, kakaoDescription, kakaoImage, sharedUrl]
  );

  // 링크 복사
  const onCopyLink = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        content: "링크를 복사하였습니다.",
      },
    });
  }, [dispatch]);

  console.log(view);
  // 아이콘 일시
  return (
    <>
      {icon ? (
        <div
          className="icon_container"
          onClick={onViewSharedContainer}
          style={style}
        >
          <img
            src={share_ico}
            alt="share_ico"
            onClick={onViewSharedContainer}
          />
          {view && (
            <div className="sharedContainer">
              <div className="icon">
                <img src={kakaoIco} alt="kakao_ico" onClick={onSharedKakao} />
              </div>
              <div className="icon">
                <img
                  src={facebookIco}
                  alt="facebook_ico"
                  onClick={onSharedFacebook}
                />
              </div>
              <div className="icon">
                <img
                  src={twitterIco}
                  alt="twitter_ico"
                  onClick={onSharedTwitter}
                />
              </div>

              <div className="icon clipboard">
                <CopyToClipboard
                  text={url ? url : sharedUrl}
                  onClick={(e) => e.stopPropagation()}
                  onCopy={onCopyLink}
                >
                  <img
                    src={linkIco}
                    alt="link_ico"
                    onClick={(e) => e.stopPropagation()}
                  />
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
      ) : (
        // 버튼일시
        <div className="button_container" style={style}>
          <Button
            width="150px"
            height="40px"
            className="bg_real_black"
            handleClick={onViewSharedContainer}
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
          >
            <img
              src={share_ico}
              width="17px"
              height="19px"
              className="share_ico"
            />
            <span>공유 하기</span>
          </Button>
          {view && (
            <div className="sharedContainer">
              <div className="icon">
                <img src={kakaoIco} alt="kakao_ico" onClick={onSharedKakao} />
              </div>
              <div className="icon">
                <img
                  src={facebookIco}
                  alt="facebook_ico"
                  onClick={onSharedFacebook}
                />
              </div>
              <div className="icon">
                <img
                  src={twitterIco}
                  alt="twitter_ico"
                  onClick={onSharedTwitter}
                />
              </div>
              <div className="icon clipboard">
                <CopyToClipboard
                  text={url ? url : sharedUrl}
                  onClick={(e) => e.stopPropagation()}
                  onCopy={onCopyLink}
                >
                  <img
                    src={linkIco}
                    alt="link_ico"
                    onClick={(e) => e.stopPropagation()}
                  />
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        /* 아이콘 */

        .icon_container {
          display: inline-block;
          position: relative;
          width: 23px;
          height: 20px;
        }
        .icon_container img {
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
          width: 100%;
          height: 100%;
        }

        .icon_container .sharedContainer {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-75%);
          background-color: #fff;
          width: 250px;
          height: 65px;
          z-index: 5000;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
          border-radius: 10px;

          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .icon_container .sharedContainer .icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
        }

        .icon_container .sharedContainer .icon > img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        /* 버튼 */

        .button_container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 30px;
        }
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

        .button_container .sharedContainer {
          position: absolute;
          bottom: 120px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #fff;
          width: 250px;
          height: 65px;
          z-index: 5000;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          color: #000;

          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .button_container .sharedContainer .icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
        }

        .button_container .sharedContainer .icon > img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        /* 공통 */

        .icon_container .sharedContainer .icon.clipboard,
        .button_container .sharedContainer .icon.clipboard {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 25px;
          cursor: pointer;
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
