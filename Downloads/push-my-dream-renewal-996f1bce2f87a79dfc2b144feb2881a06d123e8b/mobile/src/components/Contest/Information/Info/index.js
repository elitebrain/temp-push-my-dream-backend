import React from "react";

const Info = () => {
  return (
    <div className="information_container">
      <div className="content_box">
        <span className="title">기간</span>
        <span className="content">2020.04.01 ~ 05.31</span>
      </div>
      <div className="content_box">
        <span className="title">참여자격</span>
        <span className="content">누구나</span>
      </div>
      <div className="content_box">
        <span className="title">심사기준</span>
        <span className="content">기간내 PUSH 획득 수</span>
      </div>
      <div className="content_box">
        <span className="title">우승혜택</span>
        <span className="content_list">
          <span>1.&nbsp;&nbsp;우승 PUSH의 30% 수령</span>
          <span>2.&nbsp;&nbsp;인플루언서 활동 지원</span>
          <span>3.&nbsp;&nbsp;매니지먼트 지원</span>
        </span>
      </div>
      <span className="noti">
        ※ 참여자와의 협의한 활동 방향에 따라 구체적인 지원 방법이 결정됩니다.
      </span>
      <style jsx>{`
        .information_container {
          margin-top: 20px;
        }
        .content_box {
          margin-bottom: 10px;
        }
        .content_box:last-child {
          margin-bottom: 0;
        }
        .title {
          width: 52px;
          margin-right: 20px;
          font-size: 14px;
          color: #878792;
          display: inline-block;
        }
        .content {
          font-size: 16px;
          color: #fff;
          display: inline-block;
        }
        .content_list {
          margin-top: 5px;
          font-size: 12px;
          color: #fff;
          border-radius: 5px;
          background-color: #141418;
          padding: 10px;
          display: block;
        }
        .content_list span {
          line-height: 25px;
          display: block;
        }
        .noti {
          font-size: 12px;
          color: #878792;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Info;
