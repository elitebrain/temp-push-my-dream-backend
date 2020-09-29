import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { mainApi } from "shared/api";

import Layout from "components/Layout/Layout";
import VideoItem from "components/Common/VideoItem";
import BestUserAside from "components/Common/BestUserAside";

import AllVideoList from "../common/AllVideoList";
import VideoList from "../common/VideoList";
import BannerComponent from "../common/Banner/BannerComponent";
import VoteJoin from "./VoteJoin";
import UserContainer from "containers/User/UserContainer";
import { findSearchStringValue } from "shared/functions";

const hotVideoList = [];

const MainIndex = (props) => {
  const { bannerList, hotRef, onScroll } = props;
  const [hotViewVideoList, setHotViewVideoList] = useState([]);
  const [hotTalkVideoList, setHotTalkVideoList] = useState([]);
  const [newVideoList, setNewVideoList] = useState([]);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [modalUserNo, setModalUserNo] = useState(null);
  const [videoNo, setVideoNo] = useState(null);
  const _openUserModal = (userNo) => {
    setModalUserNo(userNo);
    document.querySelector("body").style.overflow = "hidden";
  };
  const _closeUserModal = () => {
    setModalUserNo(null);
    document.querySelector("body").style.overflow = "auto";
  };
  useEffect(() => {
    mainApi.get("/videos", { withCredentials: true }).then((res) => {
      setHotViewVideoList(res.data.hotViewVideoList);
      setHotTalkVideoList(res.data.hotTalkVideoList);
      setNewVideoList(res.data.newVideoList);
      const userNo = findSearchStringValue(location.search, "userNo");
      const videoNo = findSearchStringValue(location.search, "videoNo");
      if (userNo) {
        setVideoNo(videoNo || null);
        _openUserModal(userNo);
      }
    });
  }, []);

  return (
    <Layout transparent className="whiteBg">
      <BannerComponent bannerList={bannerList} bannerIdx={bannerIdx} />
      <div className="main_index_container">
        <div className="container">
          <div className="content_main">
            <BestUserAside />
            <div className="video_list_container">
              <VideoList
                title="핫뷰"
                ref={hotRef}
                list={hotViewVideoList}
                isLoaded
                mainLong
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
                    openUserModal={_openUserModal}
                    handleClick={setVideoNo}
                    isViewInfo
                    horizontalList
                    main
                    viewIcon
                    isLiked
                    // onLikeVideo={onLikeVideo}
                    // onViewVideo={onViewVideo.bind(this, "hot")}
                  />
                }
              />
              <VideoList
                title="핫톡"
                style={{ float: "left" }}
                ref={hotRef}
                list={hotTalkVideoList}
                isLoaded
                mainShort
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
                    openUserModal={_openUserModal}
                    handleClick={setVideoNo}
                    main
                    // column={3}

                    isViewInfo
                    horizontalList
                    chatIcon
                    isLiked
                    // onLikeVideo={onLikeVideo}
                    // onViewVideo={onViewVideo.bind(this, "hot")}
                  />
                }
              />
              <VideoList
                title="뉴업로드"
                style={{ float: "right", marginRight: "0" }}
                ref={hotRef}
                list={newVideoList}
                isLoaded
                mainShort
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
                    openUserModal={_openUserModal}
                    handleClick={setVideoNo}
                    main
                    // column={3}
                    horizontalList
                    isViewInfo
                    followIcon
                    isLiked
                    // onMainIndexLikeVideo={onLikeVideo}
                    // onViewVideo={onViewVideo.bind(this, "hot")}
                  />
                }
              />
              <VoteJoin />
              <VideoList
                title="Push My Dream"
                ref={hotRef}
                list={hotVideoList}
                isLoaded
                mainLong
                badgeDream
                moreButton
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
                    openUserModal={_openUserModal}
                    handleClick={setVideoNo}
                    isViewInfo
                    horizontalList
                    main
                    viewIcon
                    isLiked
                    // onLikeVideo={onLikeVideo}
                    // onViewVideo={onViewVideo.bind(this, "hot")}
                  />
                }
              />
              <VideoList
                title="Push My Dance"
                ref={hotRef}
                list={hotVideoList}
                isLoaded
                mainLong
                badgeDancer
                moreButton
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
                    openUserModal={_openUserModal}
                    handleClick={setVideoNo}
                    isViewInfo
                    horizontalList
                    main
                    viewIcon
                    isLiked
                    // onLikeVideo={onLikeVideo}
                    // onViewVideo={onViewVideo.bind(this, "hot")}
                  />
                }
              />
              <AllVideoList
                title="All Video"
                ref={hotRef}
                list={hotVideoList}
                isLoaded
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
                    openUserModal={_openUserModal}
                    handleClick={setVideoNo}
                    isViewInfo
                    horizontalList
                    viewIcon
                    isLiked
                    allVideo
                    // onLikeVideo={onLikeVideo}
                    // onViewVideo={onViewVideo.bind(this, "hot")}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
      {modalUserNo && (
        <div className="modal_rectangle">
          <div className="modal__overlay" onClick={() => _closeUserModal()} />
          <div className="modal__content modal_user_profile">
            <UserContainer userNo={modalUserNo} videoNo={videoNo} />
          </div>
        </div>
      )}
      <style jsx>{`
        .modal_user_profile {
          width: auto;
          height: auto;
          padding: 0;
          overflow: initial;
          background-color: transparent;
        }
        .main_index_container {
          position: relative;
          /* min-width: 1400px; */
          min-width: 1300px;
          width: 100%;
          /* height: 534px; */
          overflow: hidden;
          margin-top: 30px;
        }
        .container {
          width: 1275px;
          margin: 0 auto;
        }
        .content_main {
          width: 100%;
          /* width: calc(100% - 205px); */
        }
        .best_user_list_title {
          font-size: 18px;
          font-weight: 600;
          color: #878792;
          line-height: 30px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
          text-align: left;
          cursor: pointer;
        }
        .best_user_list_title span {
          display: block;
        }
        .best_user_list_title .active {
          color: #fff;
        }
        .content_main {
          display: inline-block;
          vertical-align: top;
        }
        .video_list_container {
          position: relative;
        }

        @media (max-width: 1366px) {
          .container {
            width: 950px;
            margin: 0 auto;
          }
        }
      `}</style>
    </Layout>
  );
};

MainIndex.propTypes = {
  bannerList: PropTypes.array,
  toptenList: PropTypes.array,
  officialVideoList: PropTypes.array,
  newVideoList: PropTypes.array,
  hotVideoList: PropTypes.array,
};

export default MainIndex;
