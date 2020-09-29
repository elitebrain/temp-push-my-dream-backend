import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import VideoList from "components/Common/VideoList";
import UserList from "components/Common/UserList";
import Banner from "components/Common/Banner";
import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";
import RankIndicator from "components/Common/RankIndicator";
import {
  IMAGE_SERVER,
  THUMBNAIL_WIDTH,
  THUMBNAIL_HEIGHT,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from "shared/constants/variables";

const CategoryIndex = ({
  category_no,
  // onLikeVideo,
  onViewVideo,
  onScroll,
  realtimeSurgePushRef,
  hotPushRef,
  seasonPushRef,
  // realtimeSurgeLikeRef,
  // realtimeSurgeTalkRef,
  // hotLikeRef,
  // hotViewRef,
  // hotTalkRef,
  // // seasonLikeRef,
  // seasonViewRef,
  banner,
  isPush,
}) => {
  const {
    // isLoadedMoreRealtimeSurgeLikeVideo,
    // isLoadedMoreRealtimeSurgeTalkVideo,
    // isLoadedMoreHotLikeVideo,
    // isLoadedMoreHotViewVideo,
    // isLoadedMoreHotTalkVideo,
    // isLoadedMoreSeasonLikeVideo,
    // isLoadedMoreSeasonViewVideo,
    isLoadedMoreRealtimeSurgePushVideo,
    isLoadedMoreHotPushVideo,
    isLoadedMoreSeasonPushVideo,
    isLoadedMoreNewVideo,
  } = useSelector(
    (state) => ({
      // isLoadedMoreRealtimeSurgeLikeVideo:
      // state.categoryVideo.isLoadedMoreRealtimeSurgeLikeVideo,
      // isLoadedMoreRealtimeSurgeTalkVideo:
      //   state.categoryVideo.isLoadedMoreRealtimeSurgeTalkVideo,
      // isLoadedMoreHotLikeVideo: state.categoryVideo.isLoadedMoreHotLikeVideo,
      // isLoadedMoreHotViewVideo: state.categoryVideo.isLoadedMoreHotViewVideo,
      // isLoadedMoreHotTalkVideo: state.categoryVideo.isLoadedMoreHotTalkVideo,
      // isLoadedMoreSeasonLikeVideo:
      // state.categoryVideo.isLoadedMoreSeasonLikeVideo,
      // isLoadedMoreSeasonViewVideo:
      //   state.categoryVideo.isLoadedMoreSeasonViewVideo,
      isLoadedMoreRealtimeSurgePushVideo:
        state.categoryVideo.isLoadedMoreRealtimeSurgePushVideo,
      isLoadedMoreHotPushVideo: state.categoryVideo.isLoadedMoreHotPushVideo,
      isLoadedMoreSeasonPushVideo:
        state.categoryVideo.isLoadedMoreSeasonPushVideo,
      isLoadedMoreNewVideo: state.categoryVideo.isLoadedMoreNewVideo,
    }),
    shallowEqual
  );

  const officialVideoList = useSelector((state) =>
    state.categoryVideo.officialVideoList.map((video) => ({
      ...video,
      thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
    }))
  );
  // const realtimeSurgeLikeVideoList = useSelector((state) =>
  //   state.categoryVideo.realtimeSurgeLikeVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );
  // const realtimeSurgeTalkVideoList = useSelector((state) =>
  //   state.categoryVideo.realtimeSurgeTalkVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );
  // const hotLikeVideoList = useSelector((state) =>
  //   state.categoryVideo.hotLikeVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );
  // const hotViewVideoList = useSelector((state) =>
  //   state.categoryVideo.hotViewVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );
  // const hotTalkVideoList = useSelector((state) =>
  //   state.categoryVideo.hotTalkVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );
  // const seasonLikeVideoList = useSelector((state) =>
  //   state.categoryVideo.seasonLikeVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );
  // const seasonViewVideoList = useSelector((state) =>
  //   state.categoryVideo.seasonViewVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );

  const realtimeSurgePushVideoList = useSelector((state) =>
    state.categoryVideo.realtimeSurgePushVideoList.map((video) => ({
      ...video,
      thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
    }))
  );
  const hotPushVideoList = useSelector((state) =>
    state.categoryVideo.hotPushVideoList.map((video) => ({
      ...video,
      thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
    }))
  );
  const seasonPushVideoList = useSelector((state) =>
    state.categoryVideo.seasonPushVideoList.map((video) => ({
      ...video,
      thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
    }))
  );

  const newVideoList = useSelector((state) =>
    state.categoryVideo.newVideoList.map((video) => ({
      ...video,
      thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
    }))
  );
  // const bestUsersInToday = useSelector((state) =>
  //   state.categoryVideo.bestUsersInToday.map((user) => ({
  //     ...user,
  //     user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
  //   }))
  // );
  // const rookiesInSevenDays = useSelector((state) =>
  //   state.categoryVideo.rookiesInSevenDays.map((user) => ({
  //     ...user,
  //     user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
  //   }))
  // );
  // const newbiesInSevenDays = useSelector((state) =>
  //   state.categoryVideo.newbiesInSevenDays.map((user) => ({
  //     ...user,
  //     user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
  //   }))
  // );
  // const bestProducersInSeason = useSelector((state) =>
  //   state.categoryVideo.bestProducersInSeason.map((user) => ({
  //     ...user,
  //     user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
  //   }))
  // );
  const [renderBanner, setRenderBanner] = useState(null);

  useEffect(() => {
    console.log(banner);
    if (banner) {
      if (window.innerWidth < 768) {
        setRenderBanner(banner.banner_mobile_url);
      } else {
        setRenderBanner(banner.banner_pc_url);
      }
    }

    window.addEventListener("resize", resizeEvent);

    function resizeEvent(e) {
      if (banner) {
        if (e.srcElement.innerWidth < 768) {
          setRenderBanner(banner.banner_mobile_url);
        } else {
          setRenderBanner(banner.banner_pc_url);
        }
      }
    }

    return function cleanup() {
      window.removeEventListener("resize", resizeEvent);
    };
  }, [banner]);

  return (
    <>
      <div className="bannerContainer">
        {renderBanner && <Banner banner={renderBanner} />}
      </div>
      <RankIndicator category3No={category_no} />
      <VideoList
        title="OFFICIAL VIDEO"
        list={officialVideoList}
        horizontal
        type="official"
        // likeIcon
        chatIcon
        viewIcon
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      />
      {/* <UserList
        title="오늘의 BEST 10"
        list={bestUsersInToday}
        isViewPush={isPush}
        categoryNo={category_no}
      /> */}
      {/* <VideoList
        title="실시간 급상승 LIKE"
        ref={realtimeSurgeLikeRef}
        list={realtimeSurgeLikeVideoList}
        horizontal
        type="realtimeSurgeLike"
        likeIcon
        isLoaded={isLoadedMoreRealtimeSurgeLikeVideo}
        onScroll={onScroll}
        onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      /> */}
      {/* <VideoList
        title="실시간 급상승 TALK"
        ref={realtimeSurgeTalkRef}
        list={realtimeSurgeTalkVideoList}
        horizontal
        type="realtimeSurgeTalk"
        chatIcon
        isLoaded={isLoadedMoreRealtimeSurgeTalkVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        // gradientBg
      /> */}
      {/* <UserList
        title="관심 ROOKIE 7"
        list={rookiesInSevenDays}
        isViewPush={isPush}
        categoryNo={category_no}
      /> */}
      {/* <VideoList
        title="핫라이크"
        ref={hotLikeRef}
        list={hotLikeVideoList}
        horizontal
        type="hotLike"
        likeIcon
        isLoaded={isLoadedMoreHotLikeVideo}
        onScroll={onScroll}
        onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      /> */}
      {/* <VideoList
        title="핫톡"
        ref={hotTalkRef}
        list={hotTalkVideoList}
        horizontal
        type="hotTalk"
        chatIcon
        isLoaded={isLoadedMoreHotTalkVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        // gradientBg
      />
      <VideoList
        title="핫뷰"
        ref={hotViewRef}
        list={hotViewVideoList}
        horizontal
        type="hotView"
        viewIcon
        isLoaded={isLoadedMoreHotViewVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      /> */}
      {/* <UserList
        title="기대 가득 NewBie"
        list={newbiesInSevenDays}
        categoryNo={category_no}
      /> */}
      {/* <VideoList
        title="넘사벽 Like"
        ref={seasonLikeRef}
        list={seasonLikeVideoList}
        horizontal
        type="seasonLike"
        likeIcon
        isLoaded={isLoadedMoreSeasonLikeVideo}
        onScroll={onScroll}
        onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      /> */}
      {/* <VideoList
        title="넘사벽 View"
        ref={seasonViewRef}
        list={seasonViewVideoList}
        horizontal
        type="seasonView"
        viewIcon
        isLoaded={isLoadedMoreSeasonViewVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        // gradientBg
      /> */}

      <VideoList
        title="실시간 급상승 푸쉬"
        ref={realtimeSurgePushRef}
        list={realtimeSurgePushVideoList}
        horizontal
        type="realtimeSurgePush"
        // likeIcon
        isLoaded={isLoadedMoreRealtimeSurgePushVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      />

      <VideoList
        title="핫 푸쉬"
        ref={hotPushRef}
        list={hotPushVideoList}
        horizontal
        type="hotPush"
        // likeIcon
        isLoaded={isLoadedMoreHotPushVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      />

      <VideoList
        title="넘사벽 푸쉬"
        ref={seasonPushRef}
        list={seasonPushVideoList}
        horizontal
        type="seasonPush"
        // likeIcon
        isLoaded={isLoadedMoreSeasonPushVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
      />
      {/* <UserList
        title="PRODUCER TOP 10"
        list={bestProducersInSeason}
        categoryNo={category_no}
      /> */}
      <VideoList
        title="뉴업로드"
        list={newVideoList}
        vertical
        type="new"
        chatIcon
        // likeIcon
        viewIcon
        isLoaded={isLoadedMoreNewVideo}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
        customVideoClass
      />
      <style jsx>{`
        .bannerContainer {
          position: relative;
          width: 100%;
          /* background-image: url(/_next/static/images/banner02-a112fbe….jpg); */
          background-size: cover;
          background-position: center center;
        }
        .banner span {
          color: #fff;
          font-size: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};

CategoryIndex.propTypes = {
  category_no: PropTypes.number.isRequired,
  banner: PropTypes.object,
  // onLikeVideo: PropTypes.func.isRequired,
  onViewVideo: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
  isViewPush: PropTypes.bool,
};

export default CategoryIndex;
