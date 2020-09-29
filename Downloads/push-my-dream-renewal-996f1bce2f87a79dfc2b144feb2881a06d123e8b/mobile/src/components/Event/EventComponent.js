import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import TitleHeader from "components/Common/TitleHeader";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import {
  dateToDotYYMD,
  dateToDotMD,
  findSearchStringValue,
} from "shared/functions";
import Button from "components/Common/Button";

const EventComponent = (props) => {
  const { eventPinList, eventList, eventCount, getEventList, loading } = props;
  const [noticeNo, setNoticeNo] = useState(null);
  const [pinNoticeNo, setPinNoticeNo] = useState(null);
  // const _handleEvent = (gubun, noticeNo) => {
  //   console.log("gubun, noticeNo", gubun, noticeNo);
  //   if (gubun === "pin_event") {
  //     setPinNoticeNo((prevState) => (prevState === noticeNo ? null : noticeNo));
  //     setNoticeNo(null);
  //   } else {
  //     setNoticeNo((prevState) => (prevState === noticeNo ? null : noticeNo));
  //     setPinNoticeNo(null);
  //   }
  // };
  const _handleEvent = (noticeNo) => {
    setNoticeNo((prevState) => (prevState === noticeNo ? null : noticeNo));
  };
  const _handleJoin = (eventStartTime, eventEndTime, eventUrl) => {
    // 이벤트 참여기간이 아닙니다.
    // 종료된 이벤트 입니다.
    const now = new Date();
    if (now < new Date(eventStartTime)) {
      alert("이벤트 참여 기간이 아닙니다.");
    } else if (now < new Date(eventEndTime)) {
      handleRedirectUrl(eventUrl);
    } else {
      alert("종료된 이벤트 입니다.");
    }
  };
  useEffect(() => {
    if (location) {
      const noticeNo = findSearchStringValue(location.search, "noticeNo");
      if (noticeNo) {
        setNoticeNo(parseInt(noticeNo, 10));
      }
    }
  }, [location]);
  console.log("noticeNo", noticeNo);
  return (
    <>
      <TitleHeader>이벤트</TitleHeader>
      <Body
        style={{
          boxSizing: "border-box",
          height: "100%",
          paddingBottom: "0",
        }}
      >
        <div className="container_body">
          <div className="wrapper_body">
            <ul>
              {eventPinList &&
                eventPinList.map((event) => (
                  <React.Fragment key={event.notice_no}>
                    <li
                      onClick={() => _handleEvent(event.notice_no)}
                      // onClick={() => _handleEvent("pin_event", event.notice_no)}
                    >
                      <div className="title">{event.title}</div>
                      <div>
                        <label className="label">이벤트 기간</label>
                        <span className="period">{`${
                          event.event_start_time
                            ? dateToDotYYMD(new Date(event.event_start_time))
                            : ""
                        } - ${
                          event.event_end_time
                            ? dateToDotMD(new Date(event.event_end_time))
                            : ""
                        }`}</span>
                      </div>
                      <picture className="logo">
                        <img
                          src="https://kr.object.ncloudstorage.com/khancomes-bucket001/homepage/logo/logo_pushmydream_white.png"
                          alt="logo"
                        />
                      </picture>
                    </li>
                    {/* {pinNoticeNo === event.notice_no && ( */}
                    {noticeNo === event.notice_no && (
                      <div className="event_body">
                        <picture className="event_image">
                          <img src={event.event_photo} alt="event_image" />
                        </picture>
                        <div className="footer">
                          <Button
                            style={{
                              borderRadius: "3px",
                              background:
                                "linear-gradient(to right, #00f1b4, #d53cf5",
                              width: "calc(100% - 40px)",
                              position: "relative",
                            }}
                            handleClick={() =>
                              _handleJoin(
                                event.event_start_time,
                                event.event_end_time,
                                event.event_url
                              )
                            }
                          >
                            <span
                              style={{
                                position: "absolute",
                                top: "1px",
                                left: "1px",
                                backgroundColor: "#040221",
                                width: "calc(100% - 2px)",
                                height: "calc(100% - 2px)",
                                lineHeight: "34px",
                              }}
                            >
                              참여하기
                            </span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              {eventList &&
                eventList.map((event) => (
                  <React.Fragment key={event.notice_no}>
                    <li onClick={() => _handleEvent(event.notice_no)}>
                      {/* <li onClick={() => _handleEvent("event", event.notice_no)}> */}
                      <div className="title">{event.title}</div>
                      <div>
                        <label className="label">이벤트 기간</label>
                        <span className="period">{`${
                          event.event_start_time
                            ? dateToDotYYMD(new Date(event.event_start_time))
                            : ""
                        } - ${
                          event.event_end_time
                            ? dateToDotMD(new Date(event.event_end_time))
                            : ""
                        }`}</span>
                      </div>
                      <picture className="logo">
                        <img
                          src="https://kr.object.ncloudstorage.com/khancomes-bucket001/homepage/logo/logo_pushmydream_white.png"
                          alt="logo"
                        />
                      </picture>
                    </li>
                    {noticeNo === event.notice_no && (
                      <div className="event_body">
                        <picture className="event_image">
                          <img src={event.event_photo} alt="event_image" />
                        </picture>
                        <div className="footer">
                          <Button
                            style={{
                              borderRadius: "3px",
                              background:
                                "linear-gradient(to right, #00f1b4, #d53cf5",
                              width: "calc(100% - 40px)",
                              position: "relative",
                            }}
                            handleClick={() =>
                              _handleJoin(
                                event.event_start_time,
                                event.event_end_time,
                                event.event_url
                              )
                            }
                          >
                            <span
                              style={{
                                position: "absolute",
                                top: "1px",
                                left: "1px",
                                backgroundColor: "#040221",
                                width: "calc(100% - 2px)",
                                height: "calc(100% - 2px)",
                                lineHeight: "34px",
                              }}
                            >
                              참여하기
                            </span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </ul>
          </div>
        </div>
      </Body>
      <style jsx>{`
        ul {
          background: linear-gradient(180deg, #2f3354 0%, #040221 93.28%);
          min-height: calc(100vh - 101px);
        }
        li {
          list-style-type: none;
          padding: 20px;
          position: relative;
        }
        li > picture.logo {
          position: absolute;
          display: block;
          top: 50%;
          right: 20px;
          width: 70px;
          transform: translateY(-50%);
        }
        .event_body {
          width: 100vw;
          animation: fade-in 0.5s linear;
        }
        .event_body > picture.event_image {
          position: relative;
          display: block;
          text-align: center;
        }
        picture > img {
          width: 100%;
          max-width: 400px;
          height: auto;
        }
        .title {
          color: #ac49e4;
          font-weight: 700;
          line-height: 20px;
          margin-bottom: 10px;
          font-size: 14px;
          width: calc(100% - 70px);
        }
        .label {
          display: inline-block;
          position: relative;
          color: #6d6e8d;
          padding-right: 10px;
          font-size: 12px;
        }
        .label:before {
          position: absolute;
          content: "";
          height: 100%;
          border-left: 1px solid #ac49e4;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
        .period {
          display: inline-block;
          color: #fff;
          margin-left: 10px;
          font-size: 12px;
        }
        .footer {
          height: 120px;
          background: linear-gradient(180deg, #2f3354 0%, #040221 93.28%);
          padding-top: 42px;
          box-sizing: border-box;
          max-width: 400px;
          margin: auto;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

EventComponent.propTypes = {
  eventPinList: PropTypes.array,
  eventList: PropTypes.array,
  eventCount: PropTypes.number,
  getEventList: PropTypes.func,
  loading: PropTypes.bool,
};

export default EventComponent;
