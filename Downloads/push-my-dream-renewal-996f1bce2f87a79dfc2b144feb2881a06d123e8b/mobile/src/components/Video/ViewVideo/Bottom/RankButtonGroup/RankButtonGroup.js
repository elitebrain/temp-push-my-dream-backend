import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import SharedSNSButton from "components/Common/SharedSNSButton";
import VideoEtcModal from "components/Common/Modal/VideoEtcModal";

import facebookIco from "public/assets/icon/facebook_ico.svg";
import twitterIco from "public/assets/icon/twitter_ico.svg";
import pushIco from "public/assets/icon/push.svg";
import supportIco from "public/assets/icon/support.svg";

import heart from "public/assets/image/heart(white).png";
import heartPurple from "public/assets/image/heart(purple).png";
import chat from "public/assets/image/chat(white).png";
import share from "public/assets/image/share(white).png";
import support from "public/assets/image/support(white).png";
import push from "public/assets/image/push(white).png";

import { findSearchStringValue } from "shared/functions";

import { OPEN_MODAL } from "store/reducers/modal";
import { ORIGIN_SHARE_MOBILE_URL } from "shared/constants/variables";

import { ViewVideoContext } from "containers/Video/ViewVideoContainer";
import SupportModal from "components/Common/Modal/SupportModal";

const RankButtonGroup = (props) => {
  const {
    setIsViewComment,
    handleLike,
    currentVideo,
    isOfficial,
    isPush,
  } = props;
  const Router = useRouter();
  const dispatch = useDispatch();
  const [buttonGroupBottom, setButtonGroupBottom] = useState(0);

  const { handlePush, isViewBottom, _setIsViewComment } = useContext(
    ViewVideoContext
  );
  const { video_no: videoNo } = currentVideo;

  const [viewShared, setViewShared] = useState(false);

  /**
   * ios 체크
   */
  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      setButtonGroupBottom(20);
    }
  }, []);

  const _handleShared = (snsUrl) => {
    const url = snsUrl + location.href;
    const oldVideoNo = findSearchStringValue(location.search, "videoNo");
    url.replace(oldVideoNo, videoNo);
    window.open(url);
  };
  const _toggleViewShared = () => {
    setViewShared((prevState) => !prevState);
  };

  /**
   * 후원하기 모달창
   */
  const onViewSupportModal = useCallback(() => {
    dispatch({
      type: OPEN_MODAL,
      data: {
        custom: true,
        transparent: true,
        isViewCloseIcon: false,
        container: (
          <SupportModal
            currentVideo={currentVideo}
            setIsViewComment={setIsViewComment}
          />
        ),
      },
    });
  }, [dispatch, currentVideo]);

  const [rankButtonGroupHeight, setRankButtonGroupHeight] = useState(160);
  useEffect(() => {
    if (!isOfficial && isPush) {
      setRankButtonGroupHeight(220);
    } else {
      setRankButtonGroupHeight(160);
    }
  }, [isOfficial, isPush]);
  const [rankButtonGroupRight, setRankButtonGroupRight] = useState(20);
  useEffect(() => {
    if (isViewBottom) {
      setRankButtonGroupRight(20);
    } else {
      setRankButtonGroupRight(-100);
    }
  }, [isViewBottom]);
  return (
    <div className="rank_button_group">
      <div className="shared_group_cover" onClick={() => _toggleViewShared()} />
      <div className="shared_group">
        <div
          className="item"
          onClick={() =>
            _handleShared("https://www.facebook.com/sharer/sharer.php?u=")
          }
        >
          <div className="icon">
            <img src={facebookIco} alt="facebook_ico" />
          </div>
          <label>FACEBOOK</label>
        </div>
        <div
          className="item"
          onClick={() => _handleShared("https://twitter.com/share?url=")}
        >
          <div className="icon">
            <img src={twitterIco} alt="twitter_ico" />
          </div>
          <label>TWITTER</label>
        </div>
      </div>
      <div className="rank">
        {/* <span>-</span>
        <span>12위</span> */}
      </div>
      <SharedSNSButton
        icon
        url={ORIGIN_SHARE_MOBILE_URL + Router.asPath}
        kakaoTitle={currentVideo.title}
        kakaoDescription={currentVideo.description}
        kakaoImage={currentVideo.thumbnail}
      >
        <div className="btn">
          <img src={share} alt="share_btn" width="100%" height="100%" />
        </div>
      </SharedSNSButton>
      <div className="btn">
        <img
          src={chat}
          alt="_chat_btn"
          width="100%"
          height="100%"
          onClick={_setIsViewComment}
        />
        {/* <span>{numberWithKMB(currentVideo.countComment)}</span> */}
      </div>
      <div className="btn">
        <img
          src={currentVideo.active_log_no ? heartPurple : heart}
          alt="like_btn"
          width="100%"
          height="100%"
          onClick={handleLike}
        />
        {/* <span>{numberWithKMB(currentVideo.countLikeVideo)}</span> */}
      </div>

      <div className="btn">
        <img
          src={support}
          alt="support_btn"
          width="100%"
          height="100%"
          onClick={onViewSupportModal}
        />
        {/* <span>{numberWithKMB(currentVideo.countComment)}</span> */}
      </div>

      {/* push기능 안만들어짐 */}

      {!isOfficial && isPush && (
        <div className="btn push" onClick={(e) => handlePush(e, currentVideo)}>
          <img src={push} alt="push_icon" width="100%" height="100%" />
          {/* <span>{numberWithKMB(currentVideo.countComment)}</span> */}
        </div>

        // <div className="active_push_box">
        //   <button onClick={(e) => handlePush(e, currentVideo.USER.user_no)}>
        //     <img src={push_logo_infinite} alt="push_logo" width="48%" />
        //     {/* PUSH */}
        //   </button>
        // </div>
      )}
      {/* <div
        className={
          currentVideo.active_log_no
            ? "active_push_box"
            : "none_active_push_box"
        }
      >
        <Button
          style={{
            width: "105px",
            height: "44px",
            marginTop: "10px",
          }}
          handleClick={handleLike}
        >
          {Boolean(currentVideo.active_log_no) && (
            <img
              src={check_ico}
              alt="check_ico"
              width="15"
              height="10px"
              className="like_img"
              style={{ verticalAlign: "middle", marginRight: "5px" }}
            />
          )}
          좋아요
        </Button>
      </div> */}

      <style jsx>{`
        .rank_button_group {
          position: absolute;
          right: ${rankButtonGroupRight}px;
          bottom: ${buttonGroupBottom}px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 3;
          text-align: right;
          transition: 0.3s ease-in-out;
        }
        .shared_group_cover {
          display: ${viewShared ? "block" : "none"};
          position: absolute;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          left: 0;
          bottom: 0;
          z-index: 1;
        }
        .shared_group {
          display: ${viewShared ? "block" : "none"};
          transition: 0.3s ease-in-out;
          position: absolute;
          background-color: #fff;
          width: 278px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          border-radius: 20px;
          bottom: 50px;
          padding: 20px 12px 0;
        }
        .shared_group .item {
          display: inline-block;
          width: 69px;
          margin-bottom: 20px;
          text-align: center;
        }
        .item .icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          margin: auto;
        }
        .item .icon > img {
          width: 100%;
          height: 100%;
        }
        .item label {
          font-size: 10px;
          margin-top: 6px;
        }
        .rank_button_group .rank {
          font-size: 18px;
          color: #f38400;
          position: absolute;
          left: 20px;
          top: 5px;
        }
        .rank_button_group .rank span {
          display: inline-block;
        }
        .rank_button_group .rank span:first-child {
          margin-right: 10px;
        }
        .rank_button_group .reple_share_btn {
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
        .rank_button_group .btn {
          width: 55px;
          height: 55px;
          display: block;
          margin-bottom: 2px;

          opacity: 0.55;
        }
        .rank_button_group .btn.push {
          width: 40px;
          height: auto;

          margin-bottom: initial;
          margin-top: 12px;
        }

        .rank_button_group .btn:last-child {
          margin-right: 0px;
        }
        .rank_button_group .btn.etc {
          width: 21px;
          height: 5px;
          margin-left: 22px;
        }
        .rank_button_group .btn span {
          font-size: 10px;
          color: #fff;
          font-weight: 600;
          display: block;
          text-align: center;
        }
        .active_push_box {
          border-radius: 5px;
          position: relative;
        }
        .active_push_box > button {
          width: 100px;
          height: 40px;
          border: none;
          font-size: 14px;
          border-radius: 30px;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
        }
        .active_push_box > button > img {
          width: 72px;
        }
        .none_active_push_box {
          background-color: inherit;
          border-radius: 5px;
          padding: 11px 5px 7px 5px;
          position: absolute;
          right: 20px;
          /* top: 50%;
          transform: translateY(-50%); */
          bottom: -6px;
        }
        .active_push_box .rank_count {
          text-align: center;
          overflow: hidden;
          padding: 0 15px;
        }
        .active_push_box span {
          font-size: 13px;
          font-weight: bold;
          color: #f38400;
        }
        .active_push_box span:first-child {
          float: left;
        }
        .active_push_box span:last-child {
          float: right;
        }
      `}</style>
    </div>
  );
};

RankButtonGroup.propTypes = {
  setIsViewComment: PropTypes.func,
  handleLike: PropTypes.func,
  currentVideo: PropTypes.object,
  isOfficial: PropTypes.bool,
  isPush: PropTypes.bool,
};

export default RankButtonGroup;
