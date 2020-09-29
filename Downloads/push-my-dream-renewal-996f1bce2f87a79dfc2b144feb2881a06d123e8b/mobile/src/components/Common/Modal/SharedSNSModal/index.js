import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";

import facebookIco from "public/assets/icon/facebook_ico.svg";
import twitterIco from "public/assets/icon/twitter_ico.svg";
import kakaoIco from "public/assets/icon/kakao_ico.svg";
import instagramIco from "public/assets/image/instagram_ico.png";
import linkIco from "public/assets/image/link_ico.png";

import linkBtn from "public/assets/image/link_btn.png";
import twitterBtn from "public/assets/image/twitter_btn.png";
import facebookBtn from "public/assets/image/facebook_btn.png";
import kakaotalkBtn from "public/assets/image/kakaotalk_btn.png";

import { OPEN_MODAL } from "store/reducers/modal";
import { ORIGIN_SHARE_URL } from "shared/constants/variables";
import { KAKAO_KEY } from "shared/constants/keys";

const SharedSNSModal = ({
  url,
  text,
  kakaoTitle,
  kakaoDescription,
  kakaoImage,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const sharedUrl = url ? url : `${ORIGIN_SHARE_URL}${router.asPath}`;

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

  // 링크 복사
  const onCopyLink = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        custom: false,
        container: null,
        isViewCloseIcon: true,
        bottom: null,
        isViewClose: false,
        content: "링크를 복사하였습니다.",
      },
    });
  }, [dispatch]);

  // 페이스북 공유
  const onSharedFacebook = useCallback(
    (e) => {
      e.stopPropagation();
      const search = {
        // u: "https://test.khanteum.com/vote/42"
        u: sharedUrl,
      };
      const stringified = queryString.stringify(search);

      window.open(
        `https://www.facebook.com/sharer/sharer.php?${stringified}`,
        "_blank"
      );
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
            title: "정보 보기",
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

  return (
    <div className="shared_wrapper">
      <div className="shared_container">
        {/* <div className="title">공유하기</div> */}
        <div className="icon_container">
          <div className="icon">
            <img
              src={kakaotalkBtn}
              alt="kakaotalk_btn"
              onClick={onSharedKakao}
            />
          </div>
          <div className="icon">
            <img
              src={facebookBtn}
              alt="facebook_btn"
              onClick={onSharedFacebook}
            />
          </div>
          {/* <div className="icon">
            <img
              src={instagramIco}
              alt="instagram_ico"
              onClick={onSharedFacebook}
            />
          </div> */}
          <div className="icon">
            <img src={twitterBtn} alt="twitter_btn" onClick={onSharedTwitter} />
          </div>

          <div className="icon">
            <CopyToClipboard text={sharedUrl} onCopy={onCopyLink}>
              <img src={linkBtn} alt="copy_btn" />
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <style jsx>{`
        .shared_wrapper {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(100vw - 30px);
          background: linear-gradient(180deg, #2b2c3f 0%, #020216 100%);
          border-radius: 15px;
          max-width: 290px;
        }

        .shared_wrapper .shared_container {
          position: relative;
          height: 88px;
          padding: 0 20px;
        }

        .shared_wrapper .shared_container .title {
          width: 100%;
          height: 55px;
          line-height: 55px;
          font-size: 15px;
          font-family: "Spoqa Han Sans";
          text-align: center;
          border-bottom: 1px solid #f3f3f4;
        }

        .shared_wrapper .shared_container .icon_container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
        }

        .shared_wrapper .shared_container .icon_container .icon {
          display: inline-block;
          vertical-align: middle;
          width: 64px;
          height: 64px;
          border-radius: 10px;
          overflow: hidden;
        }

        .icon_container .icon > img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SharedSNSModal;
