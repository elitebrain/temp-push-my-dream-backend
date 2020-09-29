import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";
import arrowDownWhite from "public/assets/image/arrow_down_white.png";
import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import InfiniteLogo from "components/Common/InfiniteLogo";
import NoticeModal from "./NoticeModal";
import { dateToDotYYMDHM } from "shared/functions";
import Button from "components/Common/Button";
// import Pagination from "components/Common/Pagination";

const NoticeComponent = (props) => {
  const { noticeIsPinList, noticeList, noticeCount, getNotice, limit } = props;
  const [notice, setNotice] = useState({});
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const pageLength = Math.ceil(noticeCount / limit);
    const arr = [];
    for (let i = 0; i < pageLength; i++) {
      arr.push(i + 1);
    }
    setPages(arr);
  }, [noticeCount]);
  const _openNoticeModal = (notice) => {
    setNotice({
      title: notice.title,
      contents: notice.contents,
      gubun: notice.gubun,
      photo: notice.photo,
      url: notice.url,
      created_at: notice.created_at,
      admin_name: notice.admin_name,
    });
    document.querySelector("body").style.overflow = "hidden";
  };
  const _closeNoticeModal = () => {
    setNotice({});
    document.querySelector("body").style.overflow = "auto";
  };
  const _handlePage = (page) => {
    setCurrentPage(page);
    getNotice((page - 1) * limit);
  };
  return (
    <Layout>
      <Body>
        <div className="container_header">
          <Content>
            <div className="wrapper_header">
              <div className="breadcrumb">
                <span>HOME</span>
                <img
                  src={arrow_right_ico}
                  alt="right_arrow"
                  width="8px"
                  height="13px"
                />
                <span>NOTICE</span>
              </div>
              <div className="title">공지사항</div>
            </div>
            <InfiniteLogo
              style={{
                width: "528px",
                height: "265px",
                top: "115px",
                zIndex: -1,
                right: "-82px",
              }}
              width="528"
              height="265"
            />
          </Content>
        </div>
      </Body>
      <Body>
        <div className="container_body">
          <Content>
            <div className="wrapper_body">
              <ol>
                {noticeIsPinList &&
                  noticeIsPinList.map((notice, i) => (
                    <li
                      key={notice.notice_no}
                      onClick={() => _openNoticeModal(notice)}
                    >
                      <span>공지</span>
                      <span className="text_left">{notice.title}</span>
                      <span>
                        {dateToDotYYMDHM(new Date(notice.created_at))}
                      </span>
                    </li>
                  ))}
                {noticeList &&
                  noticeList.map((notice, i) => (
                    <li
                      key={notice.notice_no}
                      onClick={() => _openNoticeModal(notice)}
                    >
                      <span className="list_dot" />
                      {/* <span>{notice.notice_no}</span> */}
                      <span className="text_left">{notice.title}</span>
                      <span>
                        {dateToDotYYMDHM(new Date(notice.created_at))}
                      </span>
                    </li>
                  ))}
              </ol>
              {noticeCount > noticeList.length && (
                <Button
                  className="bg_transparent border_solid_white"
                  style={{
                    width: "130px",
                    height: "53px",
                    fontSize: "15px",
                    display: "block",
                    margin: "0 auto",
                    marginTop: "45px",
                  }}
                  handleClick={() => _handleMore()}
                >
                  더보기
                  <img
                    src={arrowDownWhite}
                    alt="arrow_down_white"
                    style={{ marginLeft: "9px" }}
                  />
                </Button>
              )}
              {/* <Pagination
                pages={pages}
                currentPage={currentPage}
                handlePage={_handlePage}
              /> */}
            </div>
          </Content>
        </div>
        {notice.title && (
          <NoticeModal notice={notice} closeNoticeModal={_closeNoticeModal} />
        )}
      </Body>
      <style jsx>{`
        .container_header {
          position: relative;
          background-color: #141418;
          height: 320px;
          overflow: hidden;
        }
        .wrapper_header {
          padding-top: 150px;
          width: 100%;
        }
        .breadcrumb {
          color: #fff;
          font-size: 15px;
          text-align: right;
        }
        .breadcrumb > span,
        .breadcrumb > img {
          display: inline-block;
        }
        .breadcrumb > img {
          margin: 0 20px;
        }
        .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          margin-bottom: 83px;
        }
        .container_body {
          position: relative;
          background-color: #1e1e25;
          padding-top: 55px;
          padding-bottom: 150px;
        }
        .wrapper_body {
          margin-bottom: 30px;
          color: #b2b2b2;
        }
        ol > li {
          display: inline-block;
          padding: 30px 0;
          padding-left: 12px;
          width: 100%;
          border-bottom: 1px solid #39394a;
          overflow: hidden;
        }
        li > span {
          display: inline-block;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
          padding: 0 12px;
          box-sizing: border-box;
          font-size: 16px;
          color: #fff;
        }
        li > span:last-child {
          color: #878792;
          float: right;
        }
        li .list_dot {
          background-color: #ff9000;
          display: inline-block;
          width: 5px;
          height: 5px;
          padding: 0;
          border-radius: 50%;
        }
        .notice_title {
          text-align: left !important;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 15px;
        }
        .notice_stamp {
          font-size: 10px;
        }
      `}</style>
    </Layout>
  );
};

NoticeComponent.propTypes = {
  noticeIsPinList: PropTypes.array,
  noticeList: PropTypes.array,
  noticeCount: PropTypes.number,
};

export default NoticeComponent;
