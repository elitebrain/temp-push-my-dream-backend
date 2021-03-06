import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

// import banner01 from "public/assets/image/banner01.jpg" // 기존배너이미지 ;
import emergenza_banner from "public/assets/image/emergenza_banner_gold.jpg";
import copy_emergenza_banner from "public/assets/image/emergenza_banner.jpg";
import copy_apple_banner from "public/assets/image/copy_apple_banner.png";
import apple_banner from "public/assets/image/apple_banner.png";
import applebannerNotiImg from "public/assets/image/apple_banner_noti_img.png";
import bannerNotiImg from "public/assets/image/banner_noti_img.png";
import copy_emergenzaNotiImg from "public/assets/image/emergenza_img.png";
import emergenzaNotiImg from "public/assets/image/emergenza_middle_banner.png";
// import emergenzaNotiImg from "public/assets/icon/emergenza_middle_banner.svg";
import Body from "components/Layout/Body";
import Header from "components/Layout/Header";
import BannerNoti from "./BannerNoti";
import EmergenzaBanner from "./BannerContent/EmergenzaBanner";
import CopyEmergenzaBanner from "./BannerContent/CopyEmergenzaBanner";
import { APPLE_COLOR, MAIN_COLOR, WHITE_COLOR } from "shared/constants/colors";
import FadeSlider from "components/Common/FadeSlider/FadeSlider";

const BannerComponent = (props) => {
  const { bannerList, bannerIdx } = props;
  // const [bannerIdx, setBannerIdx] = useState(0);
  console.log("bannerIdx", bannerIdx);
  return (
    <Body>
      <div className="container_banner">
        <div className="banner_wrapper">
          <div className="banner emergenza_banner">
            <EmergenzaBanner />
          </div>
          <BannerNoti
            // noti="EMERGENZA 2020 한국대표 선발대회 온라인 예선 투표중(~3/31)"
            noti=""
            NotiSrc={emergenzaNotiImg}
            bgColor={WHITE_COLOR}
            className="small noti_img_shadow_w"
          />
        </div>
        {/* <div className="banner_wrapper">
          <div className="apple_banner">
            <AppleBanner bannerIdx={bannerIdx} />
          </div>
          <BannerNoti
            noti="2020 2월 첫번째 PUSH MY APPLE 진행중!"
            NotiSrc={applebannerNotiImg}
            bgColor={WHITE_COLOR}
          />
        </div> */}
        {/* <div className="banner_wrapper">
          <div className="copy_banner">
            <CopyEmergenzaBanner
              badge=""
              date=""
              category="EMERGENZA 2020"
              desc="세계 최고의 밴드에 도전하세요!"
            />
          </div>
          <BannerNoti
            noti="EMERGENZA 2020 세계밴드대회 참가신청 접수중!"
            NotiSrc={copy_emergenzaNotiImg}
            bgColor={MAIN_COLOR}
            className="small noti_img_shadow_w"
          />
        </div> */}
        {/* <div className="banner_wrapper">
          <div className="copy_apple_banner">
            <CopyAppleBanner
              badge="온라인 경영 진행중"
              date="2020 FEBRUARY 1st"
              category="PUSH MY APPLE"
              desc="2020년 영광의 첫번째 APPLE에 도전하세요!"
            />
          </div>
          <BannerNoti
            noti="2020 2월 첫번째 PUSH MY APPLE 진행중!"
            NotiSrc={bannerNotiImg}
            bgColor={APPLE_COLOR}
          />
        </div> */}
      </div>
      <style jsx>{`
        .container_banner {
          white-space: nowrap;
          overflow: hidden;
        }
        .banner_wrapper{
          display: inline-block;
          width: 100%;
          transform: translateX(${bannerIdx * -100}%);
          transition: 1s ease-in-out;
        }
        .banner {
          position: relative;
          width: 100%;
          height: 509px;
          margin-top: 88px;
          background-image: url('${emergenza_banner}');
          background-size: cover;
        }
        .copy_banner {
          position: relative;
          width: 100%;
          height: 606px;
          background-image: url('${copy_emergenza_banner}');
          background-size: cover;
        }
        .apple_banner {
          position: relative;
          width: 100%;
          height: 509px;
          margin-top:97px;
          background-image: url('${apple_banner}');
          background-size: cover;
        }
        .copy_apple_banner {
          position: relative;
          width: 100%;
          height: 606px;
          background-image: url('${copy_apple_banner}');
          background-size: cover;
        }
      `}</style>
    </Body>
  );
};

BannerComponent.propTypes = {
  bannerList: PropTypes.array,
};

export default BannerComponent;
