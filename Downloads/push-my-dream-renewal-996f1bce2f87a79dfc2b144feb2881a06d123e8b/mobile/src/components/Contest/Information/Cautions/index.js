import React from "react";

const Cautions = () => {
  return (
    <div className="content_box">
      <span className="title">참가자 유의 사항</span>
      {/* <div className="content_list">
        <div className="list">
          <div className="number">1.</div>
          <div className="content">
            본선 진출은 우승시 인플루언서 활동을 약속한 Dreamer 만 가능합니다.
          </div>
        </div>
        <div className="list">
          <div className="number">2.</div>
          <div className="content">
            우승한 참여자는 (주)칸컴스와 계약 후 인플루언서 활동 을 성실히
            수행할 의무가 있습니다. 활동을 원하지 않거나 이후 활동에 불성실한
            참여자는 우승이 취소되며 이에 따른 회사와 참여한 프로듀서에 대하여
            민형사상 책임을 물을 수 있습니다.
          </div>
        </div>
        <div className="list">
          <div className="number">3.</div>
          <div className="content">
            PUSH 는 우승자의 저작인접권을 구매 하는 행위로 우승자의 저작인접권은
            (주)칸컴스와서 PUSH에 참여 한 프로듀서에게 있습니다.
          </div>
        </div>
      </div> */}
      <div className="content_list">
        <ol>
          <li>
            본선 진출은 우승시 인플루언서 활동을 약속한 Dreamer 만 가능합니다.
          </li>
          <li>
            우승한 참여자는 (주)칸컴스와 계약 후 인플루언서 활동 을 성실히
            수행할 의무가 있습니다. 활동을 원하지 않거나 이후 활동에 불성실한
            참여자는 우승이 취소되며 이에 따른 회사와 참여한 프로듀서에 대하여
            민형사상 책임을 물을 수 있습니다.
          </li>
          <li>
            PUSH 는 우승자의 저작인접권을 구매 하는 행위로 우승자의 저작인접권은
            (주)칸컴스와서 PUSH에 참여 한 프로듀서에게 있습니다.
          </li>
        </ol>
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
        ol {
          padding: 0 10px;
          word-break: keep-all;
        }
        .number {
          display: inline-block;
          vertical-align: top;
        }
        .content {
          display: inline-block;
          vertical-align: top;
        }
      `}</style>
    </div>
  );
};

export default Cautions;
