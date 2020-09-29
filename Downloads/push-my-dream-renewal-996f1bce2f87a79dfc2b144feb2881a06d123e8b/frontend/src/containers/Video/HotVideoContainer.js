import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash/object";

import { videoApi } from "shared/api";
import { useSelector, useDispatch } from "react-redux";

import { MORE_VIDEO } from "store/reducers/offset";

import apple_banner_content from "public/assets/image/apple_banner_content.jpg";
import banner02 from "public/assets/image/banner02.jpg";
import HotVideoComponent from "components/Video/HotVideo/HotVideoComponent";

const bannerTemp = [
  {
    banner_no: 1,
    category_no: 6,
    category: "EMERGENZA 2020",
    desc: "세계 최고의 밴드에 도전하세요!",
    startDate: "2020-01-01",
    endDate: "2020-01-31",
    url: banner02,
  },
  {
    banner_no: 2,
    category_no: 2,
    category: "PUSH MY APPLE",
    desc: "2020 영광의 첫번째 APPLE에 도전하세요!",
    startDate: "2020-01-01",
    endDate: "2020-01-31",
    url: apple_banner_content,
  },
];

const HotVideoContainer = (props) => {
  const Router = useRouter();

  const [hotVideoList, setHotVideoList] = useState([]);
  const [bannerList, setBannerList] = useState(bannerTemp);
  const [hotVideoCount, setHotVideoCount] = useState(0);
  const { hotVideoOffset } = useSelector((state) => state.offset);
  const { scrollTop } = useSelector((state) => state.offset);
  const dispatch = useDispatch();
  useEffect(() => {
    let timeout = setTimeout(() => {
      document.querySelector("html").scrollTop = scrollTop;
    }, 200);
    return () => clearTimeout(timeout);
  }, [scrollTop]);

  const { query } = Router;

  useEffect(() => {
    // 카테고리가 없으면
    if (!_.has(query, "category")) {
      Router.replace("/");
      return;
    } else {
      videoApi
        .get("/hot", {
          params: {
            offset: 0,
            limit: hotVideoOffset || 12,
            category: query.category,
          },
        })
        .then((res) => {
          if (res.data) {
            setHotVideoList(res.data.hotVideoList);
            // setBannerList(bannerTemp);
            setHotVideoCount(res.data.count);
            // setOffset(res.data.offset);
            dispatch({
              type: MORE_VIDEO,
              data: {
                hotVideoOffset: res.data.offset,
              },
            });
          }
        });
    }
  }, [query, Router, dispatch]);

  // useEffect(() => {
  //   videoApi
  //     .get("/hot", {
  //       params: { offset: hotVideoOffset }
  //     })
  //     .then(res => {
  //       if (res.data) {
  //         setHotVideoList(res.data.hotVideoList);
  //         setBannerList(bannerTemp);
  //         setHotVideoCount(res.data.count);
  //         // setOffset(res.data.offset);
  //         dispatch({
  //           type: MORE_VIDEO,
  //           data: {
  //             hotVideoOffset: res.data.offset
  //           }
  //         });
  //       }
  //     });
  //   return () =>
  //     dispatch({
  //       type: MORE_VIDEO,
  //       data: {
  //         hotVideoOffset: 0
  //       }
  //     });
  // }, []);

  const _handleMore = () => {
    videoApi
      .get("/hot", {
        params: { offset: hotVideoOffset, category: query.category },
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: MORE_VIDEO,
            data: {
              hotVideoOffset: res.data.offset,
            },
          });
          setHotVideoList((prevState) =>
            prevState.concat(res.data.hotVideoList)
          );
        }
      });
  };

  // 카테고리가 없으면
  if (!_.has(query, "category")) {
    return null;
  }

  return (
    <HotVideoComponent
      hotVideoList={hotVideoList}
      hotVideoCount={hotVideoCount}
      banner={
        bannerList.filter(
          (banner) => Number(banner.category_no) === Number(query.category)
        )[0]
      }
      handleMore={_handleMore}
    />
  );
};

HotVideoContainer.propTypes = {};

export default HotVideoContainer;
