import React, { useCallback } from "react";
import { useRouter } from "next/router";

import vote_join_img from "public/assets/image/vote_join_img.png";

import { EMERGENZA_VOTE_NO } from "shared/constants/variables";

const VoteJoin = () => {
  const Router = useRouter();

  const onVote = useCallback(() => {
    Router.push("/vote/[vote_no]", `/vote/${EMERGENZA_VOTE_NO}`);
  }, [Router]);

  return (
    <div className="vote_join_container" onClick={() => onVote()}>
      <div className="title_container">
        <span className="sub_title">2020 EMERGENZA FESTIVAL</span>
        <span className="title">1차 예선 투표 결과</span>
        <span className="noti">
          월드 무대에 진출할 국가 대표를 선택해주세요!
        </span>
      </div>
      <div className="vote_join_img">
        <img
          src={vote_join_img}
          alt="vote_join_img"
          width="100%"
          height="100%"
        />
      </div>
      <div className="circle" />
      <style jsx>{`
        .vote_join_container {
          width: 100%;
          height: 105px;
          background-color: #f38400;
          border-radius: 5px;
          padding: 15px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          cursor: pointer;

          transform: perspective(1px) translateZ(0);
          transition: color 0.5s;
        }

        .vote_join_container:hover::before {
          transform: scale(1.5);
        }

        /* .vote_join_container::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ea6c00;
          transform: scale(0);
          transition-property: transform;
          transition-duration: 0.5s;
          border-radius: 50%;
        } */

        .circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          position: absolute;
          right: -70px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #ea6c00;
        }

        .vote_join_container .title_container {
          display: inline-block;
          vertical-align: middle;
          position: relative;
          z-index: 1;
        }
        .vote_join_container .title_container .sub_title {
          font-size: 15px;
          color: #fff;
          font-weight: bold;
          display: block;
        }
        .vote_join_container .title_container .title {
          font-size: 20px;
          color: #fff;
          font-weight: bold;
          display: block;
          margin-bottom: 10px;
        }
        .vote_join_container .title_container .noti {
          font-size: 11px;
          color: #fff;
          display: block;
        }
        .vote_join_img {
          width: 45px;
          height: 54px;
          position: absolute;
          top: 50%;
          right: 40px;
          transform: translateY(-50%);
          z-index: 1;
        }
        @media (max-width: 370px) {
          .vote_join_container .title_container .sub_title {
            font-size: 13px;
            color: #fff;
            font-weight: bold;
            display: block;
          }
          .vote_join_container .title_container .title {
            font-size: 18px;
            color: #fff;
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
          }
          .vote_join_container .title_container .noti {
            font-size: 9px;
            color: #fff;
            display: block;
          }
          .vote_join_img {
            width: 45px;
            height: 54px;
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            z-index: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VoteJoin;
