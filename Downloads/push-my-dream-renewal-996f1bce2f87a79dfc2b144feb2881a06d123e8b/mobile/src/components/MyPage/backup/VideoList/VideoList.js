import React, { useState, useContext, useCallback } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { MyPageContext } from "containers/User/backup/MyPageContainer";
import Video from "components/Common/Video";

import ContentHeader from "components/Common/ContentHeader";

const VideoList = () => {
  const dispatch = useDispatch();
  const {
    onToggleFlagByVideoNo,
    onRemoveVideo,
    selectedVideoNo,
    handleMenu,
  } = useContext(MyPageContext);
  const { myVideoList } = useSelector((state) => state.video);
  // const [selectedVideoNo, setSelectedVideoNo] = useState(null);

  // const _handleMenu = useCallback(videoNo => {
  //   setSelectedVideoNo(prevState => {
  //     if (prevState === videoNo) {
  //       return null;
  //     } else {
  //       return videoNo;
  //     }
  //   });
  // }, []);

  const _handleUploadLink = useCallback(() => {
    // if (myVideoList.length > 0) {
    //   dispatch({
    //     type: OPEN_MODAL,
    //     data: {
    //       content: "현재 영상은 한 개만 업로드가 가능합니다."
    //     }
    //   });
    // } else {
    //   Router.push("/upload");
    // }
    Router.push("/upload");
  }, [myVideoList, Router]);

  return (
    <div className="video_list">
      <div className="list">
        <ContentHeader
          title="등록한 영상"
          count={myVideoList ? myVideoList.length : 0}
          style={{ paddingTop: "49px" }}
        />
        {myVideoList &&
          myVideoList.map((video, i) => (
            <Video
              key={video.video_no}
              videoNo={video.video_no}
              thumbnail={video.thumbnail}
              description={video.description}
              title={video.title}
              countView={video.count_view}
              countLike={video.count_like}
              mypage
              isViewCategory
              handleMenu={handleMenu}
              selectedVideoNo={selectedVideoNo}
              flag={video.flag}
              onToggleFlagByVideoNo={onToggleFlagByVideoNo}
              onRemoveVideo={onRemoveVideo.bind(this, video.video_no)}
              STATUS={video.STATUS}
              category={video.category_level2_no}
              idx={i}
            />
          ))}
      </div>
      <style jsx>{`
        .video_list .title_video_length .title {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          line-height: 30px;
          margin-right: 10px;
        }
        .video_list .title_video_length .length {
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          display: inline-block;
          vertical-align: bottom;
        }
        .video_list .list {
          padding-bottom: 71px;
        }
      `}</style>
    </div>
  );
};

export default VideoList;
