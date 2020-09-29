import React from "react";
import PropTypes from "prop-types";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import MainContentHeader from "components/Common/MainContentHeader";
import Video from "components/Common/Video";
import InfiniteLogo from "components/Common/InfiniteLogo";
import EmptyVideo from "components/Common/EmptyVideo";

const NewVideoComponent = props => {
  const { newVideoList } = props;
  return (
    <Body>
      <div className="container_new_video">
        <Content>
          <MainContentHeader
            title="참가자 영상"
            url={{
              pathname: "/video/new",
              query: {
                category: 6
              }
            }}
          />
          {newVideoList && newVideoList.length > 0 ? (
            newVideoList.map((video, i) => (
              <Video
                key={video.video_no}
                videoNo={video.video_no}
                thumbnail={video.thumbnail}
                description={video.description}
                teamName={video.team_name}
                title={video.title}
                countView={video.countViewVideo}
                countLike={video.countLikeVideo}
                className={i % 4 === 3 ? "mr_0" : ""}
                category={video.category_level2_no}
                idx={i}
              />
            ))
          ) : (
            <EmptyVideo />
          )}
        </Content>
        <InfiniteLogo />
      </div>
      <style jsx>{`
        .container_new_video {
          position: relative;
          width: 100%;
          padding-bottom: 30px;
          background-color: #292934;
        }
        .wrapper_logo {
          position: absolute;
          width: 640px;
          height: 280px;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }
        .wrapper_logo > img {
          position: absolute;
          left: 0;
          top: 0;
        }
      `}</style>
    </Body>
  );
};

NewVideoComponent.propTypes = {
  newVideoList: PropTypes.array
};

export default NewVideoComponent;
