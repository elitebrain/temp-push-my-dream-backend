import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { MAIN_BLACK_COLOR, BLACK_COLOR } from "shared/constants/colors";

import CommentContainer from "containers/CommentContainer";

import Avatar from "components/Common/Avatar";
import Layout from "components/Layout/Layout";
import VideoView from "./VideoView";
import UserProfile from "./UserProfile";
import MenuList from "./MenuList";
import HeaderBlockButton from "./HeaderBlockButton";
import BestUserList from "components/Common/RankerList";

const ViewVideoComponent = ({
  videoRef,
  currentVideo = {
    video_no: 754,
    is_open: 1,
    category_level1_no: 3,
    category_level2_no: 6,
    category_level3_no: 2,
    description:
      "그리스신화에 나오는 이카루스에 영감을 얻어서 쓴 곡 입니다. 원래 전해져 내려오는 내용을 재해석 하여 듣는 사람들에게 힘과 위로를 전하고픈 마음을 담아 썼습니다.",
    title: "[ EMERGENZA 2020 참가 영상 ]",
    thumbnail:
      "https://khanteum-bucket001.kr.object.ncloudstorage.com/v/754/1584129320826_000005.jpg",
    countLikeVideo: 32,
    countViewVideo: 451,
    url_480p:
      "https://khanteum-bucket001.kr.object.ncloudstorage.com/v/754/480p.mp4",
    url_1080p:
      "https://khanteum-bucket001.kr.object.ncloudstorage.com/v/754/1080p.mp4",
    created_at: "2020-03-13T19:56:08.000Z",
    team_name: "FeSquad",
    USER: {
      user_no: 462,
      user_name: "서주원",
      nickname: "fesquad",
      user_photo:
        "https://kr.object.ncloudstorage.com/khanteum-bucket001/homepage/default_user.png",
    },
    active_log_no: null,
    countComment: 52,
  },
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isViewHeader, setIsViewHeader] = useState(false);

  useEffect(() => {
    let resizeEvent = (e) => {
      setIsViewHeader(e.srcElement.innerWidth > 1440);
    };

    window.addEventListener("resize", resizeEvent);

    setIsViewHeader(window.innerWidth > 1440);
    setIsLoaded(true);

    return function cleanuo() {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const onToggleBestUserList = useCallback(() => {
    setIsViewHeader((prev) => !prev);
  }, []);

  return (
    isLoaded && (
      <Layout whiteText footerNone rootDarkBlack isNoViewHeader={!isViewHeader}>
        {currentVideo ? (
          <div className="container">
            <BestUserList
              isView={isViewHeader}
              list={Array.apply(this, new Array(10))}
              renderItem={(user, index) => (
                <Avatar
                  key={index + 1}
                  width="50px"
                  height="50px"
                  photo={"http://via.placeholder.com/500x300"}
                  rank={index + 1}
                  style={{ marginRight: "10px", display: "inline-block" }}
                />
              )}
            >
              <div className="best_user_list_title">Best 10</div>
            </BestUserList>
            <div className="main_content">
              <UserProfile />
              <VideoView currentVideo={currentVideo} />
              <CommentContainer />
              <MenuList />
              <HeaderBlockButton
                isViewHeader={isViewHeader}
                onClick={onToggleBestUserList}
              />
            </div>
          </div>
        ) : (
          <div className="empty_body" />
        )}
        <style jsx>{`
          .main_content {
            /* width: 1200px; */
            width: 1275px;
            height: 758px;
            background-color: ${BLACK_COLOR};
            margin: 0 auto;
            position: relative;
          }
          @media (max-width: 1440px) {
            .main_content {
              height: 750px;
            }
          }
          .empty_body {
            height: calc(100vh - 216px);
            background-color: ${MAIN_BLACK_COLOR};
          }
          .container {
            width: 100%;
            min-width: 1400px;
            /* height: 100vh; */
            /* padding-top: 100px; */
            height: auto;
            background-color: ${MAIN_BLACK_COLOR};
            overflow: hidden;
          }
          .view_video_content_left {
            vertical-align: top;
            display: inline-block;
            width: 1365px;
            margin-right: 30px;
          }
          .view_video_content_right {
            display: inline-block;
          }
          /* @media (max-width: 1440px) {
            .container {
              width: 100%;
              min-width: 1400px;
              height: auto;
              background-color: ${MAIN_BLACK_COLOR};
              overflow: hidden;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              padding-top: 0;
            }
          } */
          .best_user_list_title {
          font-size: 26px;
          font-weight: 600;
          color: #878792;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        `}</style>
      </Layout>
    )
  );
};

ViewVideoComponent.propTypes = {
  video: PropTypes.object,
  commentList: PropTypes.array,
  countComment: PropTypes.number,
  likeVideoList: PropTypes.array,
};

export default ViewVideoComponent;
