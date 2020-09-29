import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { videoApi } from "shared/api";

import { MORE_VIDEO } from "store/reducers/offset";

import official_banner_content_bg from "public/assets/image/official_banner_content_bg.png";
import OfficialVideoComponent from "components/Video/OfficialVideo/OfficialVideoComponent";

const bannerTemp = {
  banner_no: 1,
  category_no: 7,
  category: "OFFICIAL VIDEO",
  desc: "",
  startDate: "2020-01-01",
  endDate: "2020-01-31",
  url: official_banner_content_bg
};

const OfficialVideoContainer = props => {
  const Router = useRouter();
  const [officialVideoList, setOfficialVideoList] = useState([]);
  const [bannerList, setBannerList] = useState(bannerTemp);
  const [officialVideoCount, setOfficialVideoCount] = useState(0);
  const { officialVideoOffset, scrollTop } = useSelector(state => state.offset);
  const dispatch = useDispatch();

  const { query } = Router;

  useEffect(() => {
    // 카테고리가 없으면
    if (!_.has(query, "category")) {
      Router.replace("/");
      return;
    } else {
      videoApi
        .get("/official", {
          params: {
            offset: 0,
            category: query.category,
            limit: officialVideoOffset || 12
          }
        })
        .then(res => {
          if (res.data) {
            setOfficialVideoCount(res.data.count);
            setOfficialVideoList(res.data.officialVideoList);
            // setBannerList(bannerTemp);
            dispatch({
              type: MORE_VIDEO,
              data: {
                officialVideoOffset: res.data.offset
              }
            });
          }
        });
    }
  }, [query, Router, dispatch]);

  // useEffect(() => {
  //   videoApi
  //     .get("/new", {
  //       params: { offset: 0, limit: officialVideoOffset || 12 }
  //     })
  //     .then(res => {
  //       if (res.data) {
  //         setOfficialVideoCount(res.data.count);
  //         setNewVideoList(res.data.newVideoList);
  //         setBannerList(bannerTemp);
  //         dispatch({
  //           type: MORE_VIDEO,
  //           data: {
  //             officialVideoOffset: res.data.offset
  //           }
  //         });
  //       }
  //     });
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("html").scrollTop = scrollTop;
    }, 200);
  }, [scrollTop]);
  const _handleMore = () => {
    videoApi
      .get("/official", {
        params: { offset: officialVideoOffset, category: query.category }
      })
      .then(res => {
        if (res.data) {
          dispatch({
            type: MORE_VIDEO,
            data: {
              officialVideoOffset: res.data.offset
            }
          });
          setOfficialVideoList(prevState =>
            prevState.concat(res.data.officialVideoList)
          );
        }
      });
  };
  return (
    <OfficialVideoComponent
      officialVideoList={officialVideoList}
      officialVideoCount={officialVideoCount}
      banner={bannerTemp}
      handleMore={_handleMore}
      category={query.category}
    />
  );
};

export default OfficialVideoContainer;
