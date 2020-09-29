import React from "react";
import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";

import history from "public/assets/image/history_logo.png";
import List from "./List";

const History = () => {
  return (
    <Layout>
      <Content
        style={{
          position: "relative",
          height: "50px",
          paddingTop: "100px",
          position: "relative",
          marginBottom: "10px",
        }}
      >
        <div className="title">
          {/* <img src={history} alt="history" width="100%" height="100%" /> */}
          History
        </div>
        <div className="category_list">
          <select>
            <option value="1">Push My Dream</option>
            <option value="2">Push My Dancer</option>
            <option value="3">Push My Choco</option>
          </select>
        </div>
        <div className="content_btn">
          <div className="active">
            <span>Week</span>
            <span className="underline" />
          </div>
          <div>
            <span>Month</span>
            <span className="underline" />
          </div>
          <div>
            <span>Season</span>
            <span className="underline" />
          </div>
        </div>
      </Content>
      <Body style={{ backgroundColor: "#17182B" }}>
        <div className="container">
          <Content>
            <List />
          </Content>
        </div>
      </Body>
      <style jsx>{`
        .title {
          font-size: 40px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .category_list {
          position: absolute;
          left: 180px;
          bottom: 10px;
        }
        .category_list select {
          width: 140px;
          height: 25px;
          color: #fff;
          border: none;
          background: linear-gradient(
            90deg,
            rgba(0, 241, 180, 0.5) 0%,
            rgba(213, 60, 245, 0.5) 100%
          );
          padding-left: 5px;
          border-radius: 5px;
        }
        .category_list select option[value="1"],
        .category_list select option[value="2"],
        .category_list select option[value="3"] {
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          color: black;
        }
        .content_btn {
          font-weight: bold;
          font-size: 16px;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .content_btn div {
          display: inline-block;
          margin-right: 15px;
          color: #fff;
          cursor: pointer;
        }
        .content_btn div span {
          display: block;
          margin-bottom: 3px;
        }
        .content_btn .active span:last-child {
          width: 70%;
          height: 1px;
          background-color: #fff;
          margin: 0 auto;
        }
        .container {
          height: 530px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #2f3354 0%,
            rgba(47, 51, 84, 0) 100%
          );
          background-position: center center;
          padding-top: 20px;
          overflow: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      `}</style>
    </Layout>
  );
};

export default History;
