import React, { useContext } from "react";

import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";

import AddVideoIco from "./AddVideoIco/AddVideoIco";
import AddVideoInfo from "./AddVideoInfo/AddVideoInfo";
import AddVideoIntroduction from "./AddVideoIntroduction/AddVideoIntroduction";

import { UploadContext } from "containers/UploadContainer";

const AddVideoComponent = () => {
  const { onUpload } = useContext(UploadContext);
  return (
    <>
      <div className="container" style={{ paddingBottom: "75px" }}>
        <Content>
          <AddVideoIco />
          <div className="noti">
            <h5>에머겐자 참여신청을 위한 영상은</h5>
            <a href="/emergenza/apply">참여신청하기</a>
            <h5>페이지를 통해서만 등록 가능합니다.</h5>
          </div>
          <AddVideoInfo />
          <AddVideoIntroduction />
          <button onClick={onUpload}>등록</button>
        </Content>
      </div>
      <style jsx>{`
        .noti {
          width: 100%;
          margin: auto;
          margin-bottom: 20px;
          color: #aaa;
        }
        .noti > h5,
        .noti > a {
          display: inline-block;
          font-size: 16px;
        }
        .noti > a {
          color: #fff;
        }
        .container .mypage_title {
          height: 50px;
          position: relative;
          background-color: #141418;
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
        .container {
          width: 100%;
          height: auto;
          background-color: #1e1e25;
          overflow: hidden;
          margin: 0 auto;
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
        .container button {
          width: 85px;
          height: 35px;
          background-color: #f38400;
          border-radius: 50px;
          border: none;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          margin: 0 auto;
          margin-top: 30px;
          display: block;
        }
      `}</style>
    </>
  );
};

export default AddVideoComponent;
