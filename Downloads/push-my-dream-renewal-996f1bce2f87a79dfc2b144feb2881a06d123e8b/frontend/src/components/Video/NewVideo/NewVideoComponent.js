import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import _ from "lodash/object";

import arrowDownWhite from "public/assets/image/arrow_down_white.png";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import ContentHeader from "components/Common/ContentHeader";
import Video from "components/Common/Video";
import Button from "components/Common/Button";
import BannerComponent from "components/Common/BannerComponent";
import EmptyVideo from "components/Common/EmptyVideo";

const NewVideoComponent = (props) => {
  const Router = useRouter();
  const { newVideoList, newVideoCount, banner, handleMore } = props;
  const [activeIdx, setActiveIdx] = useState(0);
  const _handleSort = (idx) => {
    setActiveIdx(idx);
  };

  console.log(_.get(Router, "query.category"));

  return (
    <Layout>
      <BannerComponent
        categoryNo={banner.category_no}
        category={banner.category}
        desc={banner.desc}
        startDate={banner.startDate}
        endDate={banner.endDate}
        url={banner.url}
        emergenzaStyle={
          _.has(Router, "query.category") && Number(Router.query.category) === 6
        }
        appleStyle={
          _.has(Router, "query.category") && Number(Router.query.category) === 2
        }
      />
      <div className="container">
        <Content>
          <ContentHeader
            title="참가자 영상"
            count={newVideoCount}
            activeIdx={activeIdx}
            handleSort={_handleSort}
            sort
          />
          {newVideoList && newVideoList.length > 0 ? (
            newVideoList.map((video, i) => (
              <Video
                key={video.video_no}
                videoNo={video.video_no}
                thumbnail={video.thumbnail}
                teamName={video.team_name}
                nickname={video.nickname}
                description={video.description}
                title={video.title}
                countView={video.count_view}
                countLike={video.count_like}
                className={i % 4 === 3 ? "mr_0" : ""}
                category={video.category_level2_no}
                idx={i}
              />
            ))
          ) : (
            <EmptyVideo />
          )}
          {newVideoList.length < newVideoCount && (
            <div className="more_btn">
              <Button
                className="bg_transparent border_solid_white"
                handleClick={handleMore}
              >
                더보기
                <img
                  src={arrowDownWhite}
                  alt="arrow_down_white"
                  style={{ marginLeft: "9px" }}
                />
              </Button>
            </div>
          )}
        </Content>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          min-width: 1366px;
          background-color: #1e1e25;
          overflow: hidden;
        }
        .more_btn {
          text-align: center;
          margin-bottom: 150px;
        }
      `}</style>
    </Layout>
  );
};

NewVideoComponent.propTypes = {
  newVideoList: PropTypes.array,
  newVideoCount: PropTypes.number,
  banner: PropTypes.object,
  handleMore: PropTypes.func,
};

export default NewVideoComponent;
