import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaTwitterSquare,
  FaBootstrap,
} from "react-icons/fa";

import profile_img_bg from "public/assets/image/profile_img_bg.png";
import profile_badge from "public/assets/image/profile_badge.png";

import { setNumberFormat, imgOnLoad } from "shared/functions";
// import PushModal from "components/Common/Modal/PushModal";
import { GRADIENT_2F3354_040221 } from "shared/constants/colors";
// import SeasonIcon from "components/Common/SeasonIcon";

import {
  IMAGE_SERVER,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from "shared/constants/variables";

const UserInfo = ({
  currentUser: {
    user_photo,
    nickname,
    countView,
    facebook_url,
    instagram_url,
    youtube_url,
    twitter_url,
    blog_url,
  },
}) => {
  // const Router = useRouter();

  // const { user_no: me } = useSelector((state) => state.user);
  const [imgWidth, setImgWidth] = useState("100%");
  const [imgHeight, setImgHeight] = useState("auto");
  const [fontSize, setFontSize] = useState("23px");
  // const [isViewModal, setIsViewModal] = useState(false);
  // const [gubun, setGubun] = useState("");

  const _imgOnLoad = (e) => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };

  useEffect(() => {
    // fontSize 12px ~ 23px nickname 길이에 따라 설정
    if (nickname.length > 16) {
      setFontSize("12px");
    } else if (nickname.length > 5) {
      setFontSize(`${28 - nickname.length}px`);
    }
  }, [nickname]);

  /**
   * sns link 이동
   */
  const openFacebook = useCallback(() => {
    window.open(facebook_url);
  }, [facebook_url]);
  const openInstagram = useCallback(() => {
    window.open(instagram_url);
  }, [instagram_url]);
  const openYoutube = useCallback(() => {
    window.open(youtube_url);
  }, [youtube_url]);
  const openTwitter = useCallback(() => {
    window.open(twitter_url);
  }, [twitter_url]);
  const openBlog = useCallback(() => {
    window.open(blog_url);
  }, [blog_url]);

  // const _openFollowModal = (gubun) => {
  //   setIsViewModal(true);
  //   setGubun(gubun);
  //   document.querySelector("body").style.overflow = "hidden";
  // };

  // const _closeFollowModal = () => {
  //   setIsViewModal(false);
  //   setGubun("");
  //   document.querySelector("body").style.overflow = "auto";
  // };
  // const _handleConfirm = () => {
  //   handleFollow(gubun);
  //   _closeFollowModal();
  // };

  return (
    <div className="wrapper_top">
      <div className="user_photo_frame">
        <img
          src={`${IMAGE_SERVER}?file=${user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`}
          alt="user_photo"
          onLoad={_imgOnLoad}
        />
      </div>
      <div className="user_profile">
        {/* <div className="profile_top">
          <div className="badge_container">
            {isPush && (
              <div className="season">
                {season &&
                  season.CATEGORY_LEVEL2 &&
                  season.CATEGORY_LEVEL2.category_level2}
              </div>
            )}
          </div>
          {handleFollow && (
            <div className="follow_button">
              {Boolean(is_followed) ? (
                <Button
                  handleClick={() => _openFollowModal("unfollow")}
                  style={{
                    // width: "85px",
                    height: "30px",
                    fontSize: "12px",
                    padding: "0 8px",
                  }}
                >
                  <img
                    src={personFollow}
                    alt="login_white"
                    width="14px"
                    height="14px"
                    className="mr_10px va_m"
                  />
                  <span className="va_m">Following</span>
                </Button>
              ) : (
                <Button
                  className="bg_grey"
                  handleClick={() => _openFollowModal("follow")}
                  style={{
                    // width: "85px",
                    height: "30px",
                    backgroundColor: "inherit",
                    border: "1px solid #fff",
                    fontSize: "12px",
                    padding: "0 8px",
                  }}
                >
                  <img
                    src={loginMain}
                    alt="login_white"
                    width="14px"
                    height="14px"
                    className="mr_10px va_m"
                  />
                  <span className="va_m">Follow</span>
                </Button>
              )}
            </div>
          )}
        </div> */}
        <h1 className="mb_5px flex_info">
          <span className="va_m">{nickname}</span>
        </h1>
        {/* <h2 className="mb_5px">
          {user_name} 
           ({birthdate ? ymdToDotYMD(birthdate.substr(2)) : ""}) 
        </h2>*/}
        <h2 className="fc_grey">
          <span className="follower">
            <span>{countView > 1 ? "Views" : "View"}</span>
            <span>{setNumberFormat(countView ? countView : 0)}</span>
          </span>
          {/* <span className="follower">
            <span>{countLike > 1 ? "Likes" : "Like"}</span>
            <span>{setNumberFormat(countLike ? countLike : 0)}</span>
          </span> */}
          {/* <span className="follower">
            <span>{countFollowUser > 1 ? "Fans" : "Fan"}</span>
            <span>
              {setNumberFormat(countFollowUser ? countFollowUser : 0)}
            </span>
          </span> */}
        </h2>
        <div className="sns_list">
          {facebook_url && (
            <FaFacebookSquare
              className="sns_image"
              size={24}
              onClick={openFacebook}
            />
          )}
          {instagram_url && (
            <FaInstagramSquare
              className="sns_image"
              size={24}
              onClick={openInstagram}
            />
          )}
          {youtube_url && (
            <FaYoutubeSquare
              className="sns_image"
              size={24}
              onClick={openYoutube}
            />
          )}
          {twitter_url && (
            <FaTwitterSquare
              className="sns_image"
              size={24}
              onClick={openTwitter}
            />
          )}
          {blog_url && (
            <FaBootstrap className="sns_image" size={24} onClick={openBlog} />
          )}
        </div>
      </div>

      {/* <div className="Icon">
        <SeasonIcon season={season} /> */}
      {/* {season && season.isParticipateSeason && isPush && user_no !== me && (
          <Link
            href={{
              pathname: "/push",
              query: {
                targetUserNo: user_no,
                ref: encodeURIComponent(Router.asPath),
              },
            }}
          >
            <NewButton
              className="ChargingButton"
              width="65px"
              height="30px"
              fontSize="12px"
              style={{ marginTop: "10px" }}
            >
              푸쉬하기
            </NewButton>
       
          </Link>
        )} */}
      {/* </div> */}
      {/* {isViewModal && (
        <PushModal
          closePushModal={_closeFollowModal}
          cancelText="아니요"
          confirmText="네"
          handleCancel={_closeFollowModal}
          handleConfirm={_handleConfirm}
          modalHeight={270}
          btnFontSize={20}
          btnFontWeight={400}
        >
          <div className="modal_body">
            <div className="profile_img">
              <img src={user_photo} alt="profile_img" onLoad={_imgOnLoad} />
            </div>
            {is_followed ? (
              <>
                <div>
                  <span className="modal_nickname">{nickname}</span> 님의
                  팔로우를
                </div>
                <div>취소하시겠어요?</div>
              </>
            ) : (
              <>
                <div>{nickname} 님을 팔로우</div>
                <div>하시겠어요?</div>
              </>
            )}
          </div>
        </PushModal>
      )} */}
      <style jsx>{`
        .nickname {
          font-size: ${fontSize};
        }
        h1 {
          font-size: 18px;
          font-weight: bold;
        }
        h2 {
          font-size: 13px;
        }
        .flex_info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .flex_info .Icon {
          display: inline-block;
          vertical-align: middle;
        }

        .mr_10px {
          margin-right: 10px;
        }
        .va_m {
          vertical-align: middle;
        }
        .mb_10px {
          margin-bottom: 10px;
        }
        .mb_5px {
          margin-bottom: 5px;
        }
        .fc_grey {
          color: #878792;
        }
        .wrapper_top {
          background-image: ${GRADIENT_2F3354_040221(180)};
          padding: 20px;
          color: #fff;
        }
        .wrapper_top .user_photo_frame {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 15px;
          background-image: url(${profile_img_bg});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
        .user_photo_frame > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .user_profile {
          width: calc(100% - 145px);
        }
        .user_profile .badge_container {
          width: calc(100% - 91px);
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        .user_profile .badge_container .season {
          font-size: 13px;
          color: #f38400;
          font-weight: 500;
          display: inline-block;
        }

        .user_profile .badge_container .badge {
          width: 20px;
          height: 20px;
          line-height: 20px;
          background-image: url(${profile_badge});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          text-align: center;
          font-size: 12px;
          font-weight: bold;
          display: inline-block;
          margin-right: 5px;
        }
        .user_profile .badge_container .badge.badge:last-child {
          margin-right: 0;
        }
        .user_profile .profile_top {
          height: 36px;
          position: relative;
        }
        .user_profile .profile_top .follow_button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .wrapper_top > img,
        .wrapper_top > div {
          display: inline-block;
          vertical-align: top;
        }
        .wrapper_bottom {
          width: 100%;
          margin-top: 70px;
          border-radius: 10px;
          background-color: #141418;
          color: #fff;
          font-size: 13px;
        }
        .wrapper_bottom > p {
          white-space: pre-line;
          line-height: 20px;
          padding: 20px 20px;
        }
        .sns_group {
          display: inline-block;
          vertical-align: middle;
        }
        .sns_group > a {
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-left: 7px;
        }
        .sns_group > a > img {
          width: 100%;
          height: 100%;
        }
        .follower {
          font-size: 9px;
          position: relative;
          margin-right: 24px;
        }
        .follower > span:first-child {
          margin-right: 5px;
          font-size: 10px;
        }
        .follower > span:last-child {
          font-size: 12px;
          font-weight: 400;
          color: #fff;
        }
        .follower:last-child {
          margin-right: 0;
        }
        .modal_body {
          text-align: center;
          font-size: 15px;
          color: #fff;
        }
        .modal_body .profile_img {
          position: relative;
          width: 79px;
          height: 79px;
          margin: 27px auto 25px;
          border-radius: 50%;
          overflow: hidden;
        }
        .profile_img > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .modal_nickname {
          font-weight: 700;
          color: #ae46e7;
        }
        :global(.ChargingButton) {
          background: linear-gradient(
                179.04deg,
                rgb(47, 51, 84) -53.29%,
                rgb(4, 2, 33) 203.27%
              )
              padding-box padding-box,
            linear-gradient(90deg, rgb(0, 241, 180) 0%, rgb(213, 60, 245) 100%)
              border-box border-box;
          border: 1px solid transparent !important;
        }
        /* .user_title {
          height: 30px;
          position: relative;
          margin-bottom: 17px;
        }
        .user_title span {
          display: inline-block;
        }
        .user_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 0;
          transform: translateY(-50%);
          top: 50%;
        }
        .user_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        } */

        .sns_list {
          margin-top: 6px;
        }
        .sns_list :global(.sns_image) {
          margin-right: 5px;
          cursor: pointer;
        }

        @media (max-width: 320px) {
          .follower {
            margin-right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

UserInfo.propTypes = {
  currentUser: PropTypes.shape({
    user_no: PropTypes.number,
    user_photo: PropTypes.string,
    nickname: PropTypes.string,
    countFollowUser: PropTypes.number,
    countLike: PropTypes.number,
    countView: PropTypes.number,
    is_followed: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    facebook_url: PropTypes.string,
    instagram_url: PropTypes.string,
    youtube_url: PropTypes.string,
    twitter_url: PropTypes.string,
    blog_url: PropTypes.string,
  }),
};

export default UserInfo;
