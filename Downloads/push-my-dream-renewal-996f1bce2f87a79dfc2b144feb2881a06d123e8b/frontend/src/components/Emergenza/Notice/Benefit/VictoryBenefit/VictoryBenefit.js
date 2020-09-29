import React from "react";
import Image from "components/Common/Image";

import emergenza_benefit_01 from "public/assets/image/emergenza_benefit_01.png";
import emergenza_benefit_02 from "public/assets/image/emergenza_benefit_02.png";

const VictoryBenefit = () => {
  return (
    <div className="benefit_content_container">
      <div className="benefit_content_list">
        <Image
          src={emergenza_benefit_01}
          width="560px"
          height="275px"
          isView
          className="benefit_img"
        />
        <div className="penefit_content_">
          <div className="title">BAND SECTION</div>
          <ul>
            <li>세계밴드대회 결승 진출(경비지원)</li>
            <li>MBC 문화콘서트 '난장' 출연</li>
            <li>음원 래코딩 + 뮤직비디오 제작</li>
            <li>밴드 프로필 촬영 지원</li>
            <li>악기 상품</li>
            <li>상금</li>
          </ul>
        </div>
      </div>
      <div className="benefit_content_list">
        <Image
          src={emergenza_benefit_02}
          width="560px"
          height="275px"
          isView
          className="benefit_img"
        />
        <div className="penefit_content_">
          <div className="title">MUSICIAN SECTION</div>
          <ul>
            <li>베스트 보컬/기타/ 베이스/ 건반/ 드럼 각 파트별 수상</li>
            <li>악기 상품</li>
            <li>이벤트성 콜라보레이션 뮤직비디오 촬영</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .benefit_content_container {
          width: 1200px;
          margin: 0 auto;
        }
        .benefit_content_container .benefit_content_list {
          margin-bottom: 50px;
        }
        .benefit_content_container .benefit_content_list:last-child {
          margin-bottom: 0;
        }
        .benefit_content_container .penefit_content_ {
          display: inline-block;
          vertical-align: middle;
          margin-left: 50px;
        }
        .benefit_content_container .penefit_content_ .title {
          margin-bottom: 25px;
          font-size: 22px;
          font-weight: bold;
          color: #fff;
        }
        .benefit_content_container .penefit_content_ .noti {
          font-size: 15px;
          color: #888888;
          line-height: 25px;
          white-space: pre-line;
          margin-top: 15px;
          margin-left: 18px;
        }
        .benefit_content_container .penefit_content_ ul {
          list-style: none;
        }
        .benefit_content_container .penefit_content_ ul li {
          font-size: 18px;
          color: #fff;
          line-height: 32px;
        }

        .benefit_content_container .penefit_content_ ul li::before {
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
      `}</style>
    </div>
  );
};

export default VictoryBenefit;
