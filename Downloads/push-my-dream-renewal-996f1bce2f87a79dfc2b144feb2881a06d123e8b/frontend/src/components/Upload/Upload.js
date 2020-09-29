import React, { useContext } from "react";
import Link from "next/link";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";

import arrow_right_ico from "public/assets/icon/arrow_right_ico(white).svg";
import InfiniteLogo from "components/Common/InfiniteLogo";
import UploadIco from "./UploadIco/UploadIco";
import UploadInfo from "./UploadInfo/UploadInfo";
import UploadIntroduction from "./UploadIntroduction/UploadIntroduction";
import Button from "components/Common/Button";

import { UploadContext } from "containers/UploadContainer";

const Upload = () => {
  const { onUpload } = useContext(UploadContext);

  return (
    <Layout>
      <div className="container">
        <Content>
          <div className="nav">
            <span>HOME</span>
            <img
              src={arrow_right_ico}
              alt="right_arrow"
              width="8px"
              height="13px"
            />
            <span className="position">UPLOAD</span>
          </div>
          <div className="title">동영상 등록</div>
          {/* <UploadIco /> */}
          <div className="noti">
            <h5>에머겐자 참여신청을 위한 영상은 "</h5>
            <a href="/emergenza/apply">참여신청하기</a>
            <h5>" 페이지를 통해서만 등록 가능합니다.</h5>
          </div>
          <UploadInfo />
          <UploadIntroduction />
          <button onClick={onUpload}>등록</button>
        </Content>
        <InfiniteLogo />
      </div>
      <style jsx>{`
        .noti {
          width: 600px;
          margin: auto;
          margin-bottom: 20px;
          color: #aaa;
          text-align: initial;
          word-break: keep-all;
        }
        .noti > h5,
        .noti > a {
          display: inline-block;
          font-size: 16px;
        }
        .noti > a {
          color: #aaa;
          text-decoration: initial;
        }
        .noti > a:hover {
          text-decoration: underline;
          cursor: pointer;
          color: #fff;
        }
        .container {
          width: 100%;
          height: auto;
          min-width: 1366px;
          background-color: #1e1e25;
          overflow: hidden;
          margin: 0 auto;
          padding-bottom: 170px;
          position: relative;
        }
        .container .nav {
          margin-top: 150px;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          text-align: right;
          margin-bottom: 35px;
        }
        .container .nav span {
          display: inline-block;
        }
        .container .nav img {
          display: inline-block;
          margin: 0 20px;
        }
        .container .nav .position {
          font-weight: 300;
        }
        .container .title {
          text-align: center;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
          margin-bottom: 83px;
        }
        .container button {
          width: 135px;
          height: 60px;
          background-color: #f38400;
          border-radius: 50px;
          border: none;
          color: #fff;
          font-size: 18px;
          font-weight: 400;
          margin: 0 auto;
          margin-top: 40px;
          cursor: pointer;
          display: block;
        }
      `}</style>
    </Layout>
  );
};

export default Upload;
