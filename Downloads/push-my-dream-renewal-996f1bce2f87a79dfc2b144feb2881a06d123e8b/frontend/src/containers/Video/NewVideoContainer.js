import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash/object";

import { useSelector, useDispatch } from "react-redux";

import { videoApi } from "shared/api";

import { MORE_VIDEO } from "store/reducers/offset";

import apple_banner_content from "public/assets/image/apple_banner_content.jpg";
import banner02 from "public/assets/image/banner02.jpg";
import NewVideoComponent from "components/Video/NewVideo/NewVideoComponent";

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

const NewVideoContainer = (props) => {
  const Router = useRouter();
  const [newVideoList, setNewVideoList] = useState([]);
  const [bannerList, setBannerList] = useState(bannerTemp);
  const [newVideoCount, setNewVideoCount] = useState(0);
  const { newVideoOffset } = useSelector((state) => state.offset);
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
        .get("/new", {
          params: {
            offset: 0,
            limit: newVideoOffset || 12,
            category: query.category,
          },
        })
        .then((res) => {
          if (res.data) {
            setNewVideoList(res.data.newVideoList);
            // setBannerList(bannerTemp);
            setNewVideoCount(res.data.count);
            // setOffset(res.data.offset);
            dispatch({
              type: MORE_VIDEO,
              data: {
                newVideoOffset: res.data.offset,
              },
            });
          }
        });
    }
  }, [query, Router, dispatch]);

  // useEffect(() => {
  //   videoApi
  //     .get("/new", {
  //       params: { offset: newVideoOffset }
  //     })
  //     .then(res => {
  //       if (res.data) {
  //         setNewVideoCount(res.data.count);
  //         setNewVideoList(res.data.newVideoList);
  //         // setBannerList(bannerTemp);
  //         dispatch({
  //           type: MORE_VIDEO,
  //           data: {
  //             newVideoOffset: res.data.offset
  //           }
  //         });
  //       }
  //     });
  //   return () =>
  //     dispatch({
  //       type: MORE_VIDEO,
  //       data: {
  //         newVideoOffset: 0
  //       }
  //     });
  // }, []);
  const _handleMore = () => {
    videoApi
      .get("/new", {
        params: { offset: newVideoOffset, category: query.category },
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: MORE_VIDEO,
            data: {
              newVideoOffset: res.data.offset,
            },
          });
          setNewVideoList((prevState) =>
            prevState.concat(res.data.newVideoList)
          );
        }
      });
  };
  return (
    <NewVideoComponent
      newVideoList={newVideoList}
      newVideoCount={newVideoCount}
      banner={
        bannerList.filter(
          (banner) => Number(banner.category_no) === Number(query.category)
        )[0]
      }
      handleMore={_handleMore}
    />
  );
};

NewVideoContainer.propTypes = {};

export default NewVideoContainer;
