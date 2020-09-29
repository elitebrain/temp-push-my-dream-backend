import React, { useEffect } from "react";

import { KAKAO_KEY } from "shared/constants/keys";
import { getInitMap } from "shared/functions";

import company_map_img from "public/assets/image/company_map_img.png";

import arrow_right_ico from "public/assets/icon/triangle_right_ico(orange).svg";

const CompanyMap = () => {
  // 구글맵 로드
  useEffect(() => {
    // 스크립트 동적로딩 중
    // https://devtalk.kakao.com/t/api-api/36757
    // http://apis.map.kakao.com/web/documentation/#load

    if (document || document.querySelectorAll("#google_map").length === 0) {
      const script = document.createElement("script");
      script.id = "google_map";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`;

      script.addEventListener("load", function() {
        console.log("load javascript");
        getInitMap();
      });

      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="company_map">
      <div className="company_map_container">
        <div className="left_nav">
          <div className="content_box">
            <div className="insert_ico">
              <img
                src={arrow_right_ico}
                alt="arrow_right_ico"
                width="100%"
                height="100%"
              />
            </div>
            <div className="insert comapny_name">칸스튜디오(본사)</div>
          </div>
        </div>
        <div className="right_nav">
          <div id="map" /> {/* 지도 api로 변경할 것. */}
          <div className="content">
            <ul>
              <li>주소:서울특별시 구로구 디지털로32가길 25 티타운빌딩</li>
              <li>문의:02-2486-1005</li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .company_map {
          width: 100%;
          background-color: rgb(20, 20, 24);
        }
        .company_map_container {
          width: 1200px;
          margin: 0 auto;
          padding-top: 60px;
          padding-bottom: 150px;
        }
        .company_map_container .left_nav,
        .company_map_container .right_nav {
          display: inline-block;
          vertical-align: top;
        }
        .company_map_container .left_nav {
          margin-right: 67px;
        }
        .company_map_container .left_nav .content_box {
          line-height: 54px;
          font-size: 20px;
          color: #fff;
          cursor: pointer;
        }
        .company_map_container .left_nav .content_box:hover {
          color: #f38400;
        }
        .company_map_container .left_nav .insert {
          color: #f38400;
          display: inline-block;
          vertical-align: middle;
        }
        .company_map_container .left_nav .content_box .insert_ico {
          width: 9px;
          height: 12px;
          line-height: 12px;
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
        }
        .company_map_container .left_nav .company_name {
          display: inline-block;
          vertical-align: middle;
        }
        .company_map_container .right_nav #map {
          width: 875px;
          height: 440px;
          margin-bottom: 30px;
          background-color: #fff;
        }
        .company_map_container .right_nav .content ul li {
          list-style: none;
          font-size: 16px;
          color: #fff;
          font-weight: 400;
          line-height: 30px;
        }
        .company_map_container .right_nav .content ul li::before {
          content: "";
          background-color: #f38400;
          font-weight: bold;
          display: inline-block;
          width: 5px;
          height: 5px;
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

export default CompanyMap;
