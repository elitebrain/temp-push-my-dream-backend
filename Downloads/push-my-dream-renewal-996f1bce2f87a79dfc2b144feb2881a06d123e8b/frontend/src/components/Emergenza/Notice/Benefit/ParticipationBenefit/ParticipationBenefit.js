import React from "react";

import Image from "components/Common/Image";

import benefit_desert_img from "public/assets/image/benefit_desert.png";
import benefit_marketing_img from "public/assets/image/benefit_marketing.png";

const ParticipationBenefit = () => {
  return (
    <div className="participation_benefit">
      <div className="benefit_content_list">
        <Image
          src={benefit_desert_img}
          width="590px"
          height="275px"
          isView
          className="benefit_img"
        />
        <div className="penefit_content_">
          <div className="title">온라인예선 통과자 전원에게 드리는 혜택</div>
          <ul>
            {/* <li>1등에게 우승상금 전액 지원</li> */}
            <li>별도 안내</li>
          </ul>
          {/* <div className="noti">
            {`
            사진, 동영상 등록은 본 서비스 오픈 시점 부터
            3개월 동안의 활동 정보를 기준으로 사은품이 제공됩니다.
            `}
          </div> */}
        </div>
      </div>
      <div className="benefit_content_list">
        <Image
          src={benefit_marketing_img}
          width="590px"
          height="275px"
          isView
          className="benefit_img"
        />
        <div className="penefit_content_">
          <div className="title">활동 및 마케팅 지원</div>
          <ul>
            <li>본 서비스 활동에 필요한 노하우 지원</li>
            <li>본 서비스 베타버전 사전 참여 기회</li>
            <li>본 서비스 홍보 영상 참여</li>
            <li>{`페이스북, 인스타그램, 카카오스토리,
블로그 등 참가자 홍보 활동 지원`}</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .participation_benefit {
          width: 1200px;
          margin: 0 auto;
        }
        .participation_benefit .benefit_content_list {
          width: 590px;
          display: inline-block;
          vertical-align: top;
        }
        .participation_benefit .benefit_content_list:first-child {
          margin-right: 20px;
        }
        .participation_benefit .penefit_content_ {
          color: #fff;
          text-align: center;
          margin-top: 40px;
        }
        .participation_benefit .penefit_content_ .title {
          font-weight: bold;
          font-size: 22px;
          margin-bottom: 25px;
        }
        .participation_benefit .penefit_content_ ul li {
          list-style: none;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          line-height: 32px;
          white-space: pre-line;
        }

        .participation_benefit .penefit_content_ ul li::before {
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
        .participation_benefit .penefit_content_ .noti {
          font-size: 15px;
          color: #888888;
          line-height: 25px;
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
};

export default ParticipationBenefit;
