import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { BLACK_COLOR, BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

import Layout from "components/Layout/Layout";
import Footer from "components/Layout/Footer";
import Content from "components/Layout/Content";
import VideoList from "components/Common/VideoList";
import Gate from "./Gate/Gate";
import UserList from "components/Common/UserList";
import BannerContainer from "containers/BannerContainer";
import RankIndicator from "components/Common/RankIndicator";
import { INIT_CATEGORY_SCROLL } from "store/reducers/scroll";
import { INIT_CATEGORYPAGE } from "store/reducers/categoryVideo";
import {
  IMAGE_SERVER,
  THUMBNAIL_WIDTH,
  THUMBNAIL_HEIGHT,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from "shared/constants/variables";

const MainIndex = ({
  // onLikeVideo,
  onViewVideo,
  onScroll,
  hotViewRef,
  // 핫톡 주석
  // hotTalkRef,
  // hotLikeRef,
  openCategoryRef,
}) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const {
    isLoadedMoreHotViewVideo,
    // 핫톡 주석
    // isLoadedMoreHotTalkVideo,
    isLoadedMoreHotLikeVideo,
    // 뉴업로드 주석
    // isLoadedMoreNewVideo,
  } = useSelector(
    (state) => ({
      isLoadedMoreHotViewVideo: state.video.isLoadedMoreHotViewVideo,
      // 핫톡 주석
      // isLoadedMoreHotTalkVideo: state.video.isLoadedMoreHotTalkVideo,
      // isLoadedMoreHotLikeVideo: state.video.isLoadedMoreHotLikeVideo,
      // 뉴업로드 주석
      //  isLoadedMoreNewVideo: state.video.isLoadedMoreNewVideo,
    }),
    shallowEqual
  );

  const hotViewVideoList = useSelector((state) =>
    state.video.hotViewVideoList.map((video) => ({
      ...video,
      thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
    }))
  );
  // 핫톡 주석
  // const hotTalkVideoList = useSelector((state) =>
  //   state.video.hotTalkVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );
  // const hotLikeVideoList = useSelector((state) =>
  //   state.video.hotLikeVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );

  /**
   * 현재 진행중인 경연 대회 리스트
   */
  const openCategoryList = useSelector((state) =>
    state.video.openCategoryList.filter(
      (openCategory) =>
        openCategory.videoIndex && openCategory.videoIndex.length
    )
  );

  // 뉴업로드 주석
  // const newVideoList = useSelector((state) =>
  //   state.video.newVideoList.map((video) => ({
  //     ...video,
  //     thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
  //   }))
  // );

  /**
   * PUSH MY DREAM 유저 랭킹 순 리스트
   */
  const rankingList = useSelector(
    (state) => state.video.rankingList
    // state.video.rankingList.map((user) => ({
    //   ...user,
    //   user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
    // }))
  );
  // const bestAppleList = useSelector((state) =>
  //   state.video.bestAppleList.map((user) => ({
  //     ...user,
  //     user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
  //   }))
  // );

  /**
   * top proucer 리스트
   */
  const topProducerList = useSelector((state) =>
    state.video.topProducerList.map((user) => ({
      ...user,
      user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
    }))
  );

  return (
    <>
      <BannerContainer />
      <RankIndicator />
      {/* <div className="banner">
        <Banner
          banner={{
            banner_url:
              "https://kr.object.ncloudstorage.com/khancomes-bucket001/homepage/category/banner_pushmydream_710x380.jpg",
          }}
        />
      </div> */}
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
      />
      {/* <div className="container gate">
        <Content>
          <Gate
            subTitle="지상최대 밴드 경연 대회"
            title="EMERGENZA 한국 예선"
            href={`/category/[category_no]`}
            as={`/category/2`}
            isThumbnail
            list={bestEmergenzaList}
          />
        </Content>
      </div> */}

      {/* 핫톡 주석 */}
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
      /> */}
      {openCategoryList &&
        openCategoryList.map((category) => (
          <div className="container gate" key={category.category_level3_no}>
            <Content>
              <Gate
                icon={category.category_level2_gradient_icon}
                title={category.title}
                href={`/category/[category_no]`}
                as={`/category/${category.category_level3_no}`}
                // list={bestAppleList}
                list={
                  rankingList[category.category_level3_no] &&
                  rankingList[category.category_level3_no].map((user) => ({
                    ...user,
                    user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
                  }))
                }
                category3No={category.category_level3_no}
                onClick={() => {
                  dispatch({
                    type: INIT_CATEGORY_SCROLL,
                  });
                }}
              />
            </Content>
          </div>
        ))}
      {/* <div className="container gate">
        <Content>
          <Gate
            icon="https://kr.object.ncloudstorage.com/khancomes-bucket001/homepage/logo/logo_pushmydream_gradation.png"
            title="나의 재능 가치 만들기 프로젝트"
            href={`/category/[category_no]`}
            as={`/category/4`}
            list={bestAppleList}
            onClick={() => {
              dispatch({ type: INIT_CATEGORYPAGE });
              dispatch({
                type: INIT_CATEGORY_SCROLL,
              });
            }}
          />
        </Content>
      </div> */}
      {/* <VideoList
        title="핫라이크"
        ref={hotLikeRef}
        list={hotLikeVideoList}
        horizontal
        type="hotLike"
        likeIcon
        isLoaded={isLoadedMoreHotLikeVideo}
        onScroll={onScroll}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
      /> */}
      {/* <div className="V">

        </div>
        <Content style={{ marginTop: "40px" }}>
          <VoteJoin />
        </Content> */}
      <UserList title="주간 프로듀서" list={topProducerList} />
      {/* 뉴업로드 주석 */}
      {/* <VideoList
        title="뉴업로드"
        list={newVideoList}
        vertical
        type="new"
        viewIcon
        isLoaded={isLoadedMoreNewVideo}
        // onLikeVideo={onLikeVideo}
        onViewVideo={onViewVideo}
        gradientBg
        customVideoClass
      /> */}

      {openCategoryList &&
        openCategoryList.map((openCategory, index) => (
          <VideoList
            key={openCategory.category_level3_no}
            ref={openCategoryRef.current[index]}
            title={openCategory.category_level2_korean_title}
            list={openCategory.videoList.map((video) => ({
              ...video,
              thumbnail: `${IMAGE_SERVER}?file=${video.thumbnail}&size=${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}`,
            }))}
            horizontal
            type={`category-${openCategory.category_level3_no}`}
            viewIcon
            // onLikeVideo={onLikeVideo}
            onViewVideo={onViewVideo}
            onClickTitle={() => {
              Router.push(
                "/category/[category_no]",
                `/category/${openCategory.category_level3_no}`
              );
            }}
            isCategory
          />
        ))}

      <Footer />
      <style jsx>{`
        .banner {
          position: relative;
          width: 100%;
          padding-top: 50px;
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
        .container {
          width: 100%;
          height: auto;
          background-color: ${BLACK_COLOR};
          overflow: hidden;
          padding: 40px 0;
        }
        .container.gate {
          background-color: ${BACKGROUND_BLACK_COLOR};
          padding: initial;
        }
      `}</style>
    </>
  );
};

MainIndex.propTypes = {
  // onLikeVideo: PropTypes.func.isRequired,
  onViewVideo: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
};

export default MainIndex;
