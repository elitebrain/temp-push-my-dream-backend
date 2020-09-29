import React from "react";

const ParticipationWay = () => {
  return (
    <>
      <div className="step_container">
        <div className="step01">
          <div className="step_no">step01</div>
          <div className="title">회원 가입</div>
          <div className="information">
            <ul>
              <li>
                <span>계정 생성 및 개인 정보 입력</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="step02">
          <div className="step_no">step02</div>
          <div className="title">참여 신청</div>
          <div className="information">
            <ul>
              <li>
                <span>신청서 작성 및 영상 업로드</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="step03">
          <div className="step_no">step03</div>
          <div className="title">투표 받기</div>
          <div className="information">
            <ul>
              <li>
                <span>
                  {`온라인 예선 영상 게시물을 통하여 투표 획득후
                  심사와 함께 온라인 예선 진출자 선정`}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="info_container">
          <div className="info">
            <span>
              ※ 팀명 등록후 수정 불가능. 요청시 확인후 업체에서 수정 가능
            </span>
          </div>
        </div>
        <style jsx>{`
          .step_container {
            width: 1200px;
            margin: 0 auto;
          }
          .step_container .step01 {
            width: 377px;
            height: 235px;
            background-color: #444455;
            padding-top: 40px;
            padding-left: 35px;
            border-radius: 30px;
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
          }
          .step_container .step02 {
            width: 377px;
            height: 235px;
            background-color: #39394a;
            padding-top: 40px;
            padding-left: 40px;
            border-radius: 30px;
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
          }
          .step_container .step03 {
            width: 446px;
            height: 235px;
            background-color: #444455;
            padding-top: 40px;
            padding-left: 40px;
            border-radius: 30px;
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
          }
          .step_container .step_no {
            font-size: 18px;
            font-weight: 500;
            color: #f38400;
            margin-bottom: 15px;
          }
          .step_container .title {
            font-size: 22px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 30px;
          }
          .step_container .information {
            margin-bottom: 20px;
          }
          .step_container .information ul li {
            list-style: none;
            font-size: 18px;
            line-height: 30px;
            white-space: pre-line;
            color: #fff;
          }
          .step_container .information ul li::before {
            content: "";
            background-color: #f38400;
            font-weight: bold;
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            position: relative;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            margin-right: 10px;
          }
          .step_container .information ul li span {
            display: inline-block;
            vertical-align: top;
          }
          .step_container .information ul li span:first-child {
            margin-right: 5px;
          }
          .step_container .noti {
            font-size: 15px;
            color: #b2b2b2;
            margin-left: 17px;
          }
          .step_container .info_container {
            height: 75px;
            color: #fff;
            font-size: 18px;
            border-radius: 20px;
            background-color: #282834;
            text-align: center;
            position: relative;
            margin-top: 35px;
          }
          .step_container .info_container .info {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .step_container .info_container .info span {
            display: block;
          }
        `}</style>
      </div>
    </>
  );
};

export default ParticipationWay;
