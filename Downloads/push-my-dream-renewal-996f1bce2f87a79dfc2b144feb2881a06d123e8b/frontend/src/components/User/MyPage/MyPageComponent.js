import React from "react";
import Link from "next/link";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import Body from "components/Layout/Body";
import InfiniteLogo from "components/Common/InfiniteLogo";
import ProFile from "components/User/MyPage/ProFile/ProFile";
import Noti from "./Noti/Noti";
import VideoList from "./VideoList/VideoList";

import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";

const MyPageComponent = () => {
  // const { myVideoList } = props;

  // const user = useSelector(state => state.user);

  return (
    <Layout>
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="mypage_title">
          <Content
            style={{
              position: "relative",
              height: "100%",
              paddingTop: "150px",
            }}
          >
            <div className="nav">
              <span>HOME</span>
              <img
                src={arrow_right_ico}
                alt="right_arrow"
                width="8px"
                height="13px"
              />
              <span className="position">MYPAGE</span>
            </div>
            <div className="title">
              마이 페이지
              <Link href="/emergenza/apply">
                <button className="btn_application_form">
                  에머겐자 참가신청서
                </button>
              </Link>
            </div>
            <InfiniteLogo
              style={{
                width: "528px",
                height: "265px",
                bottom: "90px",
                zIndex: -1,
                right: "-82px",
              }}
              width="528"
              height="265"
            />
          </Content>
        </div>

        <Body>
          <div className="container" style={{ backgroundColor: "#1e1e25" }}>
            <Content style={{ position: "relative", paddingTop: "285px" }}>
              <ProFile />
              <Noti />
              <VideoList />
            </Content>
          </div>
        </Body>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          min-width: 1366px;
          height: auto;
          /* background-color: #1e1e25; */
          /* overflow: hidden; */
          margin: 0 auto;
          position: relative;
        }
        .container .mypage_title {
          height: 320px;
          position: relative;
          z-index: 0;
          background-color: #141418;
        }
        .container .mypage_title .content_box {
          width: 1200px;
          position: absolute;
          top: 50%;
        }
        .container .mypage_title .nav {
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          text-align: right;
        }
        .container .mypage_title .nav span {
          display: inline-block;
        }
        .container .mypage_title .nav img {
          display: inline-block;
          margin: 0 20px;
        }
        .container .mypage_title .nav .position {
          font-weight: 300;
        }
        .container .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
          margin-bottom: 83px;
        }
        .btn_application_form {
          font-size: 16px;
          margin-left: 30px;
          background-color: #000;
          border: 1px solid #fff;
          color: #fff;
          padding: 6px 12px;
        }
        .btn_application_form:hover {
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

export default MyPageComponent;
