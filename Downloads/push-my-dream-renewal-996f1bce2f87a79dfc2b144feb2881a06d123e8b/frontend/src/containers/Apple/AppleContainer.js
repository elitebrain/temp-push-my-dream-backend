import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { mainApi, commonApi } from "shared/api";

import AppleComponent from "components/Apple/Index/AppleComponent";
import PopupNotice from "components/Common/PopupNotice";

const bannerTemp = [
  {
    banner_no: 1,
    date: "",
    category: "EMERGENZA 2020",
    desc: "세계 최고의 밴드에 도전하세요!"
  }
];
const AppleContainer = () => {
  const [bannerList, setBannerList] = useState([]);
  const [toptenList, setToptenList] = useState([]);
  const [officialVideoList, setOfficialVideoList] = useState([]);
  const [newVideoList, setNewVideoList] = useState([]);
  const [hotVideoList, setHotVideoList] = useState([]);
  const [popupNotice, setPopupNotice] = useState([]);
  const { scrollTop } = useSelector(state => state.offset);
  useEffect(() => {
    let timeout = setTimeout(() => {
      document.querySelector("html").scrollTop = scrollTop;
    }, 200);
    return () => clearTimeout(timeout);
  }, [scrollTop]);
  useEffect(() => {
    // live
    // 애플 카테고리는 2
    mainApi
      .get("/", {
        params: {
          category: 2
        }
      })
      .then(res => {
        if (res.data) {
          // setToptenList(res.data.toptenVideoList);
          setToptenList([]);
          setOfficialVideoList(res.data.officialVideoList);
          setNewVideoList(res.data.newVideoList);
          setHotVideoList(res.data.hotVideoList);
          setBannerList(bannerTemp);
        }
      });
    // local
    // axios.get("http://localhost:4000/api/v1/main").then(res => {
    //   if (res.data) {
    //     setToptenList([]);
    //     setNewVideoList(res.data.newVideoList.newVideoList);
    //     setHotVideoList(res.data.hotVideoList);
    //     setBannerList(bannerTemp);
    //   }
    // });
    _getPopupNotice();
  }, []);
  const _getPopupNotice = () => {
    commonApi.get("/popup-notice").then(res => {
      if (res.data) {
        setPopupNotice(res.data);
      }
    });
  };
  return (
    <>
      <AppleComponent
        bannerList={bannerList}
        toptenList={toptenList}
        officialVideoList={officialVideoList}
        newVideoList={newVideoList}
        hotVideoList={hotVideoList}
      />
      {popupNotice && popupNotice.length > 0 && (
        <PopupNotice popupNotice={popupNotice} />
      )}
    </>
  );
};

export default AppleContainer;
