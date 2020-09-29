import React from "react";
import Router from "next/router";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";

import arrow_left from "public/assets/icon/arrow_left(white).svg";
import mobile_video_add_img from "public/assets/image/mobile_video_add_img.png";
import Body from "components/Layout/Body";
import ProFile from "components/MyPage/ProFile/ProFile";
import Noti from "./Noti/Noti";
import VideoList from "./VideoList/VideoList";

const MyPageComponent = (props) => {
  return (
    <Layout>
      <div
        className="container"
        style={{
          paddingTop: "50px",
          height: "50px",
          backgroundColor: "#141418",
        }}
      >
        <div className="mypage_title">
          <span className="back_ico" onClick={() => Router.back()}>
            <img src={arrow_left} alt="arrow_left" width="100%" height="100%" />
          </span>
          <span className="title">마이페이지</span>
        </div>
      </div>
      <div className="container" style={{ overflow: "hidden" }}>
        <Body>
          <div className="wrapper">
            <Content>
              <ProFile />
              <Noti />
              <VideoList />
              <div
                className="video_add_circle_ico"
                onClick={() => Router.push("/upload")}
              >
                <img
                  src={mobile_video_add_img}
                  alt="mobile_video_add_img"
                  width="100%"
                  height="100%"
                />
              </div>
            </Content>
          </div>
        </Body>
      </div>
      <style jsx>{`
        .container,
        .wrapper {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
        }
        .wrapper {
          background-color: #1e1e25;
          padding-top: 30px;
          min-height: calc(100vh - 332px);
        }
        .container .mypage_title {
          position: relative;
          background-color: #141418;
        }
        .container .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
        }
        .mypage_title {
          height: 50px;
          position: relative;
          margin-bottom: 17px;
        }
        .mypage_title span {
          display: inline-block;
        }
        .mypage_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 20px;
          transform: translateY(-50%);
          top: 50%;
        }
        .mypage_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        }
        .video_add_circle_ico {
          width: 61px;
          height: 61px;
          margin: 0 auto;
          padding-bottom: 30px;
          /* position: fixed;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1; */
        }
      `}</style>
    </Layout>
  );
};

export default MyPageComponent;
