import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";

import arrowDownPurple from "public/assets/image/arrow_down(purple).png";
import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import NoticeModal from "./NoticeModal";
import { dateToDotYYMD, findSearchStringValue } from "shared/functions";
import LoadingCircle from "components/Common/CssIcons/LoadingCircle";
import TitleHeader from "components/Common/TitleHeader";

const NoticeComponent = (props) => {
  const {
    noticeIsPinList,
    noticeList,
    noticeCount,
    getNotice,
    loading,
  } = props;
  const [notice, setNotice] = useState({});
  const [noticeNo, setNoticeNo] = useState(null);
  useEffect(() => {
    window.addEventListener("popstate", () => {});
  }, []);
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
    window.addEventListener("popstate", () => {
      _closeNoticeModal();
    });
  };
  const _closeNoticeModal = () => {
    setNotice({});
    document.querySelector("body").style.overflow = "auto";
    window.removeEventListener("popstate", () => {
      _closeNoticeModal();
    });
  };
  const _closeNoticeModalWithRouterBack = () => {
    setNotice({});
    document.querySelector("body").style.overflow = "auto";
    window.removeEventListener("popstate", () => {
      _closeNoticeModal();
    });
    Router.back();
  };
  const _handleMore = () => {
    getNotice(noticeList.length);
  };
  const _handleNotice = (noticeNo) => {
    setNoticeNo((prevState) => (prevState === noticeNo ? null : noticeNo));
  };
  useEffect(() => {
    if (location) {
      const noticeNo = findSearchStringValue(location.search, "noticeNo");
      if (noticeNo) {
        setNoticeNo(parseInt(noticeNo, 10));
      }
    }
  }, [location]);
  console.log("loading ", loading);
  return (
    <>
      <TitleHeader>공지사항</TitleHeader>
      {/* <div className="container_header">
        <div className="wrapper_header">
          <div className="title">공지사항</div>
        </div>
      </div> */}
      <Body
        style={{
          boxSizing: "border-box",
          height: "100%",
          paddingBottom: "0",
        }}
      >
        <div className="container_body">
          <Content>
            <div className="wrapper_body">
              <ol>
                {noticeIsPinList &&
                  noticeIsPinList.map((notice, i) => (
                    // <Link href="#" key={notice.notice_no}>
                    //   {/* <li onClick={() => _openNoticeModal(notice)}> */}
                    //   <li onClick={() => _handleNotice(notice.notice_no)}>
                    //     <div className="notice_stamp">
                    //       <span>
                    //         {dateToDotYYMD(new Date(notice.created_at))}
                    //       </span>
                    //     </div>
                    //     <div className="notice_title">{notice.title}</div>
                    //   </li>
                    // </Link>
                    <React.Fragment key={notice.notice_no}>
                      <li onClick={() => _handleNotice(notice.notice_no)}>
                        <div className="notice_stamp">
                          <span>
                            {dateToDotYYMD(new Date(notice.created_at))}
                          </span>
                        </div>
                        <div className="notice_title">{notice.title}</div>
                      </li>
                      {noticeNo === notice.notice_no &&
                      notice.gubun === "image" ? (
                        <div className="bottom">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: notice.contents,
                            }}
                          />
                          {notice.url && (
                            <div className="link">
                              <a href={notice.url} target="blank">
                                {notice.url}
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        noticeNo === notice.notice_no && (
                          <div className="bottom">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: notice.contents,
                              }}
                            />
                          </div>
                        )
                      )}
                    </React.Fragment>
                  ))}
                {noticeList &&
                  noticeList.map((notice, i) => (
                    // <Link href="#" key={notice.notice_no}>
                    //   {/* <li onClick={() => _openNoticeModal(notice)}> */}
                    //   <li onClick={() => _handleNotice(notice.notice_no)}>
                    //     <div className="notice_stamp">
                    //       <span>
                    //         {dateToDotYYMD(new Date(notice.created_at))}
                    //       </span>
                    //       <div className="notice_title">{notice.title}</div>
                    //     </div>
                    //   </li>
                    // </Link>
                    <React.Fragment key={notice.notice_no}>
                      <li onClick={() => _handleNotice(notice.notice_no)}>
                        <div className="notice_stamp">
                          <span>
                            {dateToDotYYMD(new Date(notice.created_at))}
                          </span>
                        </div>
                        <div className="notice_title">{notice.title}</div>
                      </li>
                      {noticeNo === notice.notice_no &&
                      notice.gubun === "image" ? (
                        <div className="bottom">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: notice.contents,
                            }}
                          />
                          {notice.url && (
                            <div className="link">
                              <a href={notice.url} target="blank">
                                {notice.url}
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        noticeNo === notice.notice_no && (
                          <div className="bottom">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: notice.contents,
                              }}
                            />
                          </div>
                        )
                      )}
                    </React.Fragment>
                  ))}
              </ol>
              {loading ? (
                <div className="more">
                  <LoadingCircle borderColor="#8048ff" />
                </div>
              ) : (
                noticeCount > noticeList.length && (
                  <div className="more" onClick={() => _handleMore()}>
                    <img src={arrowDownPurple} alt="arrow_down_purple" />
                    <span>More</span>
                  </div>
                  // <Button
                  //   className="bg_transparent border_solid_white"
                  //   style={{
                  //     fontSize: "14px",
                  //     marginTop: "38px",
                  //     color: "#8048ff",
                  //     border: "none",
                  //   }}
                  //   handleClick={() => _handleMore()}
                  // >
                  //   More
                  // </Button>
                )
              )}
            </div>
          </Content>
        </div>
        {notice.title && (
          <NoticeModal
            notice={notice}
            closeNoticeModal={_closeNoticeModalWithRouterBack}
          />
        )}
      </Body>
      <style jsx>{`
        .container_header {
          position: relative;
          background-color: #141418;
          overflow: hidden;
        }
        .wrapper_header {
          padding-top: 50px;
          width: 100%;
          text-align: center;
          height: 77px;
          line-height: 77px;
          font-size: 21px;
          font-weight: 700;
          color: #fff;
        }
        .container_body {
          position: relative;
        }
        .wrapper_body {
          color: #b2b2b2;
        }
        ol {
          background: linear-gradient(180deg, #2f3354 0%, #040221 93.28%);
          min-height: calc(100vh - 101px);
          width: calc(100% + 40px);
          margin-left: -20px;
          padding: 0 20px;
          box-sizing: border-box;
        }
        ol > li {
          display: inline-block;
          padding-top: 25px;
          width: 100%;
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
        }
        .notice_title {
          text-align: left !important;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .notice_stamp {
          font-size: 10px;
        }
        .notice_stamp > span {
          font-size: 12px;
          color: #808080;
        }
        .more {
          margin-top: 38px;
          font-size: 14px;
          color: #8048ff;
          text-align: center;
        }
        .more > img,
        .more > span {
          display: inline-block;
          vertical-align: middle;
        }
        .more > img {
          width: 15px;
          height: 10px;
          margin-right: 8px;
        }
        .bottom {
          width: calc(100% + 20px);
          padding: 20px 0 30px;
          padding-right: 20px;
          box-sizing: border-box;
          word-break: break-all;
          font-size: 13px;
          line-height: 16px;
        }
        .bottom img {
          width: 100%;
          height: auto;
        }
        .bottom .link {
          margin-top: 20px;
        }
        .bottom .link > a {
          color: #007aff;
          text-decoration: none;
        }
        .bottom .link > a:hover {
          text-decoration: underline;
        }
      `}</style>
      <style jsx global>{`
        .bottom img {
          max-width: 100%;
        }
      `}</style>
    </>
  );
};

NoticeComponent.propTypes = {
  noticeIsPinList: PropTypes.array,
  noticeList: PropTypes.array,
  noticeCount: PropTypes.number,
  getNotice: PropTypes.func,
  loading: PropTypes.bool,
};

export default NoticeComponent;
