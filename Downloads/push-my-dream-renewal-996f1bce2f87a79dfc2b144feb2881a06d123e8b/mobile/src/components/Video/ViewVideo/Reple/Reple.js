import React from "react";

import video_profile_img from "public/assets/image/video_profile_img.png";

import arrow_left_ico from "public/assets/icon/arrow_left(white).svg";
import RepleList from "./RepleList/RepleList";
import Layout from "components/Layout/Layout";
import Button from "components/Common/Button";

const Reple = (props) => {
  const { setIsViewComment } = props;
  return (
    <div className="reple_container">
      <Layout className="footer_none">
        <div className="container">
          <div className="reple">
            <div className="reple_length">
              <span>댓글</span>
            </div>
            <div className="reple_list_box">
              <RepleList />
            </div>
            <div className="input_reple_box">
              <div className="input_reple_box_container">
                <span>댓글 수정중</span>
                <div className="input_reple">
                  <div className="profile_img" />
                  <div className="input_text_box">
                    <input type="text" placeholder="댓글을 입력하세요." />
                  </div>
                  <Button
                    style={{
                      width: "50px",
                      height: "42px",
                      borderRadius: "15px",
                      fontSize: "15px",
                      display: "inline-block",
                    }}
                  >
                    등록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <style jsx>{`
          .reple_container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: calc(100vh - 51px);
            background-color: rgba(0, 0, 0, 0.75);
            z-index: 100;
          }
        .reple {
          width: 100%;
          height: calc(100vh - 50px);
          display: inline-block;
          background-color: #282834;
          box-sizing: border-box;
          margin-top: 50px;
          position: relative;
          overflow:hidden;
        }
        .reple .reple_length {
          width: 100%;
          height: 77px;
          line-height: 77px;
          text-align:center;
          font-size: 21px;
          color: #fff;
          font-weight: 700;
          box-sizing: border-box;
          background-color:#141418;
          position: relative;
        }
        .reple .reple_length img{
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .reple .reple_list_box {
          width:100vw;
          /* padding-left: 20px; */
          margin-bottom: 30px;
          position: absolute;
          bottom: 125px;
        }
        .reple .input_reple_box{
          height:110px;
          background-color:#1e1e25;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          padding-bottom: 10px;
        }
        .reple .input_reple_box .input_reple_box_container{
          width: calc(100% - 20px);
          margin: 0 auto;
        }
        .reple .input_reple_box span{
          display: block;
          text-align: center;
          font-size:13px;
          font-weight:400;
          color:#f38900;
          padding:15px 0;
        }
        .reple .input_reple {
          /* width: calc(100% - 20px); */
          width: 100%;
          height: 60px;
          line-height: 60px;
          background-color: #141418;
          padding: 0 20px;
          border-radius: 15px;
          box-sizing: border-box;
        }
        .reple .input_reple .profile_img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-image: url(${video_profile_img});
          background-size: cover;
          background-position: center center;
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
        }
        .reple .input_reple .input_text_box {
          width: calc(100% - 110px);
          margin-right: 15px;
          display: inline-block;
          vertical-align: middle;
        }
        .reple .input_reple .input_text_box input {
          width:100%;
          height: 30px;
          border: none;
          position:relative;
          background-color: inherit;
          font-size: 15px;
          color: #fff;
        `}</style>
    </div>
  );
};

export default Reple;
