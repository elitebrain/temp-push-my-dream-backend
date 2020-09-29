import React, { useState, useEffect } from "react";

import { noticeApi } from "shared/api";
import NoticeComponent from "components/Notice/NoticeComponent";

const limit = 10;
const type = "notice";

const NoticeContainer = () => {
  const [noticeIsPinList, setNoticeIsPinList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [noticeCount, setNoticeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    _getNotice(0); 
  }, []);
  const _getNotice = (offset = 0) => {
    setLoading(true);
    noticeApi.get("/", { params: { offset, limit, type } }).then((res) => {
      if (res.data) {
        console.log("res.data", res.data);
        setNoticeIsPinList(res.data.noticeIsPinList);
        setNoticeList((prevState) => prevState.concat(res.data.noticeList));
        setNoticeCount(res.data.noticeCount);
        setLoading(false);
      }
    });
  };
  return (
    <NoticeComponent
      noticeIsPinList={noticeIsPinList}
      noticeList={noticeList}
      noticeCount={noticeCount}
      getNotice={_getNotice}
      loading={loading}
    />
  );
};

export default NoticeContainer;
