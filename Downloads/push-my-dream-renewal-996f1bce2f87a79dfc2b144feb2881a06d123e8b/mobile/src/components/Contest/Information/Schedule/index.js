import React from "react";

const Schedule = () => {
  return (
    <div className="content_box">
      <span className="title">진행 일정</span>
      <div className="content_list">
        <div className="list">
          <span className="content_title">{`< 예선 >`}</span>
          <div className="content">
            <span>2020.04.01 ~ 04.30</span>
            <span>아티스트 신청자 전원 참가</span>
          </div>
        </div>
        <div className="list">
          <span className="content_title">{`< 본선 >`}</span>
          <div className="content">
            <div className="round">
              <div className="round_title">1Round</div>
              <div className="round_content">
                <span>2020.05.01 ~ 05.07</span>
                <span>예선 Ranking 상위 100명 진출</span>
              </div>
            </div>
            <div className="round">
              <div className="round_title">2Round</div>
              <div className="round_content">
                <span>2020.05.8 ~ 05.15</span>
                <span>1Round Ranking 상위 20명 진출</span>
              </div>
            </div>
            <div className="round">
              <div className="round_title">3Round</div>
              <div className="round_content">
                <span>2020.05.16 ~ 05.23</span>
                <span>2Round Ranking 상위 5명 진출</span>
              </div>
            </div>
            <div className="round">
              <div className="round_title">Final</div>
              <div className="round_content">
                <span>2020.05.24 ~ 05.31</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .content_box {
          margin-top: 20px;
        }
        .title {
          font-size: 14px;
          color: #878792;
          display: block;
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
        .content_list .list {
          margin-bottom: 20px;
        }
        .content_list .list:last-child {
          margin-bottom: 0;
        }
        .content_title {
          margin-bottom: 5px;
          display: block;
        }
        .content {
          padding-left: 20px;
          line-height: 25px;
        }
        .round {
          margin-bottom: 10px;
        }
        .round:last-child {
          margin-bottom: 0;
        }
        .content span {
          display: block;
        }
        .round_title {
          width: 45px;
          font-size: 12px;
          color: #878792;
          display: inline-block;
          vertical-align: top;
          margin-right: 15px;
        }
        .round_content {
          font-size: 12px;
          color: #fff;
          display: inline-block;
          vertical-align: top;
        }
      `}</style>
    </div>
  );
};

export default Schedule;
