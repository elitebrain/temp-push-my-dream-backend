import React, { useState, useEffect } from "react";

import { noticeApi } from "shared/api";
import NoticeComponent from "components/Notice/NoticeComponent";

const limit = 5;

const NoticeContainer = () => {
  const [noticeIsPinList, setNoticeIsPinList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [noticeCount, setNoticeCount] = useState(0);
  useEffect(() => {
    _getNotice(0);
  }, []);
  const _getNotice = (offset) => {
    noticeApi.get("/", { params: { offset, limit } }).then((res) => {
      if (res.data) {
        setNoticeIsPinList(res.data.noticeIsPinList);
        setNoticeList(res.data.noticeList);
        setNoticeCount(res.data.noticeCount);
      }
    });
  };
  return (
    <NoticeComponent
      noticeIsPinList={noticeIsPinList}
      noticeList={noticeList}
      noticeCount={noticeCount}
      getNotice={_getNotice}
      limit={limit}
    />
  );
};

export default NoticeContainer;
