import React, { useState } from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import VideoItem from "components/Common/VideoItem";
import BestUserAside from "components/Common/BestUserAside";

import AllVideoList from "components/Main/common/AllVideoList";
import VideoList from "components/Main/common/VideoList";
import BannerComponent from "components/Main/common/Banner/BannerComponent";

const hotVideoList = [
  {
    video_no: 250,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "최근 Dead Rock Working Fest에서 공연한 Breath입니다.\n스래쉬메탈의 리프와 보컬의 나레이션이 포인트인 하드락입니다.",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/250/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/250/1579960214019_000005.jpg",
    created_at: "2020-01-25T13:50:55.000Z",
    USER: {
      user_no: 83,
      user_name: "양승원",
      nickname: "포세컨즈",
      COUNT: { count_follower: 1 },
    },
    COUNT: { count_comment: 18, count_like: 67, count_view: 1168 },
  },
  {
    video_no: 343,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "밴드반대의 자작곡 'Burn'은 가식을 벗어던지고 스스로를 진심으로 불태우기를 요구하는 곡입니다. 원테이크로 촬영하였습니다.",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/343/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/343/1581252436262_000005.jpg",
    created_at: "2020-02-09T12:49:32.000Z",
    USER: {
      user_no: 48,
      user_name: "천진우",
      nickname: "천진우",
      COUNT: { count_follower: 0 },
    },
    COUNT: { count_comment: 17, count_like: 40, count_view: 1084 },
  },
  {
    video_no: 395,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "안녕하세요 밴드 세번째 입니다. \n본영상은 2020년2월15일 공연을 영상 촬영을 하여 현장 분위기와 그리고 영상 편집을 통하여 곡 소개와 가사를 집어 넣어 편집을 하였습니다.  ",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/395/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/395/1581939770447_000005.jpg",
    created_at: "2020-02-17T11:43:06.000Z",
    USER: {
      user_no: 471,
      user_name: "오지훈",
      nickname: "밴드세번째",
      COUNT: { count_follower: 7 },
    },
    COUNT: { count_comment: 26, count_like: 54, count_view: 975 },
  },
  {
    video_no: 595,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description: "Chacha - 사과먹은 벌레",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/595/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/595/1582914653017_000005.jpg",
    created_at: "2020-02-28T18:31:25.000Z",
    USER: {
      user_no: 865,
      user_name: "조용신",
      nickname: "Chacha",
      COUNT: { count_follower: 4 },
    },
    COUNT: { count_comment: 36, count_like: 53, count_view: 965 },
  },
  {
    video_no: 775,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "liar \r\n익숙함에 속아 오래된 사랑을 지키기 위한 거짓말을 담았습니다.",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/775/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/775/1584276549334_000005.jpg",
    created_at: "2020-03-15T12:49:20.000Z",
    USER: {
      user_no: 1228,
      user_name: "문성혁",
      nickname: "밴드이세계",
      COUNT: { count_follower: 0 },
    },
    COUNT: { count_comment: 3, count_like: 34, count_view: 891 },
  },
  {
    video_no: 755,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "엉망진창인 세상에서 지쳐있는 사람들이 마주해 서로를 알아보고 마음을 교감한다. 하지만 같은 공감점 하나에 의지하여 이어나가는 그들은 그만큼 위태로운 관계이다.",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/755/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/755/1584164138575_000005.jpg",
    created_at: "2020-03-14T05:35:56.000Z",
    USER: {
      user_no: 1206,
      user_name: "강예모",
      nickname: "예지夢 (예지몽)",
      COUNT: { count_follower: 7 },
    },
    COUNT: { count_comment: 30, count_like: 75, count_view: 869 },
  },
  {
    video_no: 757,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "Southpaw의 자작곡 '마지막 이후' 입니다.\nmetalcore를 지향하는 밴드의 성향을 담은 곡으로써 \n자아실현을 위해 불안했던 과거에서 벗어나기 위한 의지를 표현했습니다.",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/757/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/757/1585104054330_000005.jpg",
    created_at: "2020-03-14T05:50:01.000Z",
    USER: {
      user_no: 374,
      user_name: "이승규",
      nickname: "싸포",
      COUNT: { count_follower: 0 },
    },
    COUNT: { count_comment: 69, count_like: 81, count_view: 850 },
  },
  {
    video_no: 773,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "이 곡은 만족도 충만한 저희 인생에 가끔 찬물을 끼얹는 사람들에게 내 인생이니 간섭마라 라는 메세지를 담은 곡 입니다. 맛있는 음식엔 날파리가 꼬이기 마련이죠 재밌게 봐주세요!",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/773/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/773/1584270155584_000005.jpg",
    created_at: "2020-03-15T11:02:53.000Z",
    USER: {
      user_no: 1278,
      user_name: "최동찬",
      nickname: "대동여지도",
      COUNT: { count_follower: 5 },
    },
    COUNT: { count_comment: 20, count_like: 48, count_view: 693 },
  },
  {
    video_no: 754,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "그리스신화에 나오는 이카루스에 영감을 얻어서 쓴 곡 입니다. 원래 전해져 내려오는 내용을 재해석 하여 듣는 사람들에게 힘과 위로를 전하고픈 마음을 담아 썼습니다.",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/754/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/754/1584129320826_000005.jpg",
    created_at: "2020-03-13T19:56:08.000Z",
    USER: {
      user_no: 462,
      user_name: "서주원",
      nickname: "fesquad",
      COUNT: { count_follower: 2 },
    },
    COUNT: { count_comment: 80, count_like: 37, count_view: 668 },
  },
  {
    video_no: 622,
    status_no: 6,
    flag: 0,
    title: "[ EMERGENZA 2020 참가 영상 ]",
    description:
      "1page - 모월 (미발표 자작곡)\r\n모월 팀 5명이 모두 작곡에 참여한 곡입니다.\r\n모월 멤버 모두가 항상 꿈꿔온 음악적 이상향을 녹여낸 곡입니다.\r\n잘들어주세요!",
    url_1080p:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/622/1080p.mp4",
    thumbnail:
      "https://khancomes-bucket001.kr.object.ncloudstorage.com/v/622/1583662856948_000005.jpg",
    created_at: "2020-03-08T10:26:40.000Z",
    USER: {
      user_no: 150,
      user_name: "김규완",
      nickname: "perfact___stars",
      COUNT: { count_follower: 1 },
    },
    COUNT: { count_comment: 31, count_like: 45, count_view: 627 },
  },
];

const CategoryIndex = (props) => {
  const { bannerList, hotRef, onScroll } = props;

  const [bannerIdx, setBannerIdx] = useState(0);

  return (
    <Layout transparent className="whiteBg">
      <BannerComponent bannerList={bannerList} bannerIdx={bannerIdx} />
      <div className="main_index_container">
        <div className="container">
          <div className="content_main">
            <BestUserAside />
            <div className="video_list_container">
              <VideoList
                title="Hot Video"
                ref={hotRef}
                list={hotVideoList}
                isLoaded
                mainLong
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
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
                list={hotVideoList}
                isLoaded
                mainShort
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
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
                list={hotVideoList}
                isLoaded
                mainShort
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
                    main
                    // column={3}
                    horizontalList
                    isViewInfo
                    followIcon
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
                style={{ clear: "both" }}
                // isLoaded={isLoadedMoreHotVideo}
                onScroll={onScroll.bind(this, "hot")}
                ItemComponent={
                  <VideoItem
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
      <style jsx>{`
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

CategoryIndex.propTypes = {
  bannerList: PropTypes.array,
  toptenList: PropTypes.array,
  officialVideoList: PropTypes.array,
  newVideoList: PropTypes.array,
  hotVideoList: PropTypes.array,
};

export default CategoryIndex;
