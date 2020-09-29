import React from "react";

import Layout from "components/Layout/Layout";

import arrow_left from "public/assets/icon/arrow_left(white).svg";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import ContestImage from "./ContestImage";
import Title from "./Title";
import Info from "./Info";
import Schedule from "./Schedule";
import Cautions from "./Cautions";

const InformationComponent = () => {
  return (
    <Layout style={{ height: "100vh" }}>
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
          <span className="title">대회 안내</span>
        </div>
      </div>
      <div className="container" style={{ overflow: "hidden" }}>
        <Body>
          <div className="wrapper">
            <ContestImage />
            <Title />
            <Content style={{ paddingBottom: "20px" }}>
              <Info />
              <Schedule />
              <Cautions />
            </Content>
            <button>참가 하기</button>
          </div>
        </Body>
      </div>
      <style jsx>{`
        button {
          width: 100%;
          padding: 20px 0;
          background-color: #fff;
          font-size: 25px;
          font-weight: bold;
        }
        .container,
        .wrapper {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
        }
        .wrapper {
          background-color: #1e1e25;

          /* min-height: calc(100vh - 332px); */
        }
        .mypage_title {
          height: 50px;
          position: relative;
          margin-bottom: 17px;
        }
        .container .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
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
      `}</style>
    </Layout>
  );
};

export default InformationComponent;
