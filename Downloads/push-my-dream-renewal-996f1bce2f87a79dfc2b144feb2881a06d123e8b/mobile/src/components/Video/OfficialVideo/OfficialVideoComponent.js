import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import arrowDownWhite from "public/assets/image/arrow_down_white.png";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import ContentHeader from "components/Common/ContentHeader";
import Video from "components/Common/Video";
import Button from "components/Common/Button";
import BannerComponent from "components/Common/BannerComponent";
import EmptyVideo from "components/Common/EmptyVideo";

const OfficialVideoComponent = (props) => {
  const {
    officialVideoList,
    officialVideoCount,
    banner,
    handleMore,
    category,
  } = props;
  const [activeIdx, setActiveIdx] = useState(0);
  // db data 연결하기 전 더보기 테스트용 tempList
  const [tempList, setTempList] = useState([]);
  useEffect(() => {
    setTempList(officialVideoList);
  }, [officialVideoList]);
  const _handleSort = (idx) => {
    setActiveIdx(idx);
  };

  console.log(officialVideoList);
  return (
    <Layout>
      <BannerComponent
        categoryNo={banner.categoryNo}
        category={banner.category}
        desc={banner.desc}
        startDate={banner.startDate}
        endDate={banner.endDate}
        url={banner.url}
        isOfficial
        className="official"
      />
      <div className="container">
        <Content style={{ paddingBottom: "150px" }}>
          <ContentHeader
            title="공식 영상"
            count={officialVideoCount}
            activeIdx={activeIdx}
            handleSort={_handleSort}
            mobileSelect
          />
          {officialVideoList && officialVideoList.length > 0 ? (
            officialVideoList.map((video, i) => (
              <Video
                key={video.video_no}
                videoNo={video.video_no}
                thumbnail={video.thumbnail}
                description={video.description}
                title={video.title}
                countView={video.count_view}
                countLike={video.count_like}
                listGubun="official"
                idx={i}
                category={category}
              />
            ))
          ) : (
            <EmptyVideo />
          )}
          {officialVideoList.length < officialVideoCount && (
            <div className="more_btn">
              <Button
                className="bg_transparent border_solid_white"
                handleClick={handleMore}
                style={{ width: "130px", height: "53px", fontSize: "15px" }}
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
          background-color: #1e1e25;
          overflow: hidden;
        }
        .more_btn {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

OfficialVideoComponent.propTypes = {
  officialVideoList: PropTypes.array,
  officialVideoCount: PropTypes.number,
  banner: PropTypes.object,
};

export default OfficialVideoComponent;
