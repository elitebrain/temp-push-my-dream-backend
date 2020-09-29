import React, { useState, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Link from "next/link";

import { MyPageContext } from "containers/User/MyPageContainer";
import Video from "components/Common/Video";

import add_circle_ico from "public/assets/icon/add_circle(orange).svg";
import ContentHeader from "components/Common/ContentHeader";

import { OPEN_MODAL } from "store/reducers/modal";

const VideoList = () => {
  const dispatch = useDispatch();
  const { onToggleFlagByVideoNo, onRemoveVideo } = useContext(MyPageContext);
  const { myVideoList } = useSelector(state => state.video);
  const [selectedVideoNo, setSelectedVideoNo] = useState(null);

  const _handleMenu = useCallback(videoNo => {
    setSelectedVideoNo(prevState => {
      if (prevState === videoNo) {
        return null;
      } else {
        return videoNo;
      }
    });
  }, []);

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
  // useEffect(() => {
  //   setVideoList(myInfo.VIDEO);
  //   setSelectedVideoNo(null);
  // }, [myInfo]);

  return (
    <div className="video_list">
      {/* <div className="title_video_length">
        <span className="title">등록한 영상</span>
        <span className="length">(5)</span>
      </div> */}
      <ContentHeader
        title="등록한 영상"
        count={myVideoList ? myVideoList.length : 0}
        style={{ paddingTop: "65px" }}
      />
      <div className="list">
        <div className="video_add_btn" onClick={_handleUploadLink}>
          <div className="content_box">
            <div className="add_circle_ico">
              <img
                src={add_circle_ico}
                alt="add_circle_ico"
                width="100%"
                height="100%"
              />
            </div>
            <div className="title">새 영상 추가</div>
          </div>
        </div>
        {myVideoList &&
          myVideoList.map((video, i) => (
            <React.Fragment key={video.video_no}>
              <Video
                videoNo={video.video_no}
                thumbnail={video.thumbnail}
                description={video.description}
                title={video.title}
                countView={video.count_view}
                countLike={video.count_like}
                className={i % 4 === 2 ? "mr_0" : ""}
                mypage
                isViewCateogry
                handleMenu={_handleMenu}
                selectedVideoNo={selectedVideoNo}
                flag={video.flag}
                onToggleFlagByVideoNo={onToggleFlagByVideoNo}
                onRemoveVideo={onRemoveVideo.bind(this, video.video_no)}
                STATUS={video.STATUS}
                category={video.category_level2_no}
                idx={i}
              />
              {i % 4 === 2 && <br />}
            </React.Fragment>
          ))}
      </div>
      <style jsx>{`
        .video_list .video_add_btn {
          width: 282px;
          height: 260px;
          border: 3px dashed #e1e3e4;
          border-radius: 15px;
          display: inline-block;
          vertical-align: top;
          position: relative;
          margin-right: 21px;
          box-sizing: border-box;
          cursor: pointer;
        }
        .video_list .video_add_btn .content_box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .video_list .video_add_btn .add_circle_ico {
          width: 82px;
          height: 82px;
          margin: 0 auto;
        }
        .video_list .video_add_btn .title {
          font-size: 18px;
          font-weight: 400;
          color: #f38400;
          text-align: center;
        }
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
        .list {
          padding-bottom: 90px;
        }
      `}</style>
    </div>
  );
};

export default VideoList;
