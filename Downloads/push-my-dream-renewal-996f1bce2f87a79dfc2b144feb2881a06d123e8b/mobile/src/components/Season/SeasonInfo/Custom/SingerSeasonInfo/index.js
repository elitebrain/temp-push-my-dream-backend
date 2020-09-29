import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import TitleHeader from "components/Common/TitleHeader";
import Content from "components/Layout/Content";
import Banner from "components/Common/Banner";
import NewButton from "components/Common/NewButton";
import CustomSeasonContent from "./CustomSeasonContent";
import CustomSeasonTitle from "./CustomSeasonTitle";
import CustomInfo from "./CustomInfo";

import {
  BACKGROUND_BLACK_COLOR,
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  WHITE_COLOR,
  COLOR_AE46E7,
} from "shared/constants/colors";
import { OPEN_MODAL } from "store/reducers/modal";

import mr_download_image from "public/assets/image/mr_download.png";
import Link from "next/link";

const SingerSeasonInfo = ({ season }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /*
   * 참가하기 버튼 클릭 시 로그인 유무 확인
   */
  const onCheckIsLoggedIn = useCallback(
    (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "로그인 후 이용가능합니다.",
            isViewClose: false,
          },
        });
      }
    },
    [isLoggedIn, dispatch]
  );

  return (
    <>
      <TitleHeader>대회 안내</TitleHeader>
      {season && (
        <div
          className="container"
          style={{
            overflow: "hidden",
            paddingBottom: "30px",
            backgroundColor: BACKGROUND_BLACK_COLOR,
          }}
        >
          <div className="banner_container">
            <Banner banner={season.banner_mobile_url} />
          </div>
          <div className="SeasonInfo_Header">
            <CustomSeasonTitle season={season} />
            <CustomInfo title="대회기간" content="2020.09.01 - 10.31" />
            <CustomInfo
              title="참가자격"
              content="노래를 사랑하는 남녀노소 누구나! (개인 또는 팀)"
            />
            <CustomInfo
              title="참가방법"
              content="신바람 이박사의 '술이 웬수다'를 원곡 MR 활용 또는 자유롭게 편곡하여 부른 동영상(반드시 세로)을 칸테움 앱 챌린지션에 업로드"
            />
            <CustomInfo title="심사발표" content="2020.11.01" />
            <CustomInfo title="주최·주관" content="(주)칸컴스" />
            <CustomInfo
              title="후　　원"
              content="베짱이 & 빅대디 엔터테인먼트"
              style={{ paddingBottom: "20px" }}
            />
          </div>
          <Content>
            <a
              className="mr_download"
              href="https://kr.object.ncloudstorage.com/khancomes-bucket001/download/03.%20%EC%88%A0%EC%9D%B4%EC%9B%AC%EC%88%98%EB%8B%A4%20MR.zip"
              download
              target="_blank"
            >
              <img src={mr_download_image} alt="mr 다운로드" />
            </a>
            <p className="download_notice">
              ※ iOS에서는 버튼을 꾸욱~ 눌러주세요!
            </p>
            <h5 className="SeasonInfo_Main_Title">챌린지션 상세 일정</h5>
            <CustomSeasonContent>
              <div className="notice_item fs_14 lh_20">
                <div className="schedule_notice_number">
                  <span>1차 예선 챌린지션</span>
                  <span className="center_border" />
                </div>
                <p>2020.09.01(화) - 2020.09.30(수)</p>
              </div>
              <div className="notice_item fs_14 lh_20">
                <div className="schedule_notice_number">
                  <span>2차 예선 챌린지션</span>
                  <span className="center_border" />
                </div>
                <p>2020.10.01(목) - 2020.10.18(일)</p>
              </div>
              <div className="notice_item fs_14 lh_20">
                <div className="schedule_notice_number">
                  <span>본선 챌린지션</span>
                  <span className="center_border" />
                </div>
                <p>2020.10.19(월) - 2020.10.31(토)</p>
              </div>
              <fieldset>
                <legend>대국민 투표(PUSH) 기간</legend>
                <strong>2020.09.21(월) - 2020.10.31(토)</strong>
              </fieldset>
            </CustomSeasonContent>
            <h5 className="SeasonInfo_Main_Title">심사방법</h5>
            <CustomSeasonContent>
              <div className="notice_item fs_14 lh_20">
                <div className="examined_number">
                  <span>1. 예선</span>
                  <span className="center_border" />
                </div>
                <p>
                  각 챌린지션(1차, 2차) 에서 프로듀서에게 푸쉬를 가장 많이 받은
                  1, 2위 본선 진출
                </p>
              </div>
              <div className="notice_item fs_14 lh_20">
                <div className="examined_number">
                  <span>2. 본선</span>
                  <span className="center_border" />
                </div>
                <p>
                  본선에진출한 총 4인 혹은 팀 중 프로듀서에게 푸쉬를 가장 많이
                  받은 참가자가 최종 우승
                </p>
              </div>
              <div className="fs_12 lh_16" style={{ marginBottom: "10px" }}>
                <h5 className="fs_12 lh_16">
                  <span className="star">*</span>푸쉬란?
                </h5>
                <p className="examined_description">
                  신개념 투표방식으로써 참가자를 응원하기 위해 충전하여 사용하는
                  투표 단위
                </p>
              </div>
              <div className="fs_12 lh_16">
                <h5 className="fs_12 lh_16">
                  <span className="star">*</span>프로듀서란?
                </h5>
                <p className="examined_description">
                  칸테움 앱에서 푸쉬를 구매하여 마음에 드는 참가자 또는 챌린지션
                  영상에 원하는 만큼 푸쉬를 하는 모든 회원
                </p>
              </div>
            </CustomSeasonContent>
            <h5 className="SeasonInfo_Main_Title">우승자 혜택</h5>
            <CustomSeasonContent>
              <p className="fs_14 lh_20">
                상금 1000만원 + 음원 녹음 및 발매 & 프로필 촬영
              </p>
            </CustomSeasonContent>
            <h5 className="SeasonInfo_Main_Title">프로듀서 혜택</h5>
            <CustomSeasonContent>
              <div className="notice_item fs_14 lh_20">
                <span className="producer_notice_number">1.</span>
                <p>
                  최종 우승자를 맞춘 프로듀서 모두에게 우승 상금의 30%를 각
                  '푸쉬' 지분에 따라 지급
                </p>
              </div>
              <div className="notice_item fs_14 lh_20">
                <span className="producer_notice_number">2.</span>
                <div>
                  <p>
                    우승자를 맞추지 못한 모든 분들에게도 본 챌린지션에서 사용한
                    푸쉬 100%를 푸쉬로 환급
                  </p>
                  <p>(기타 챌린지션 또는 오디션에 사용 가능)</p>
                </div>
              </div>
            </CustomSeasonContent>
            <h5 className="SeasonInfo_Main_Title">유의사항</h5>
            <CustomSeasonContent>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">1.</span>
                <p>본 챌린지션 참가는 칸테움 앱 가입을 해야 가능합니다.</p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">2.</span>
                <p>
                  타인 명의로 회원가입을 한 경우 챌린지션 대상에서 제외될 수
                  있습니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">3.</span>
                <p>
                  챌린지션 영상 업로드는 반드시 세로영상으로 촬영한 동영상만
                  가능합니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">4.</span>
                <p>
                  본인이 직접 부른 노래가 포함되어있지 않은 영상을 업로드할 시
                  챌린지션에서 제외됩니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">5.</span>
                <p>
                  챌린지션의 노래가 1분 미만일 경우 챌린지션에서 제외됩니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">6.</span>
                <p>
                  Tiktok, YouTube 등 타사 앱 및 플랫폼에 게시된 영상은 업로드할
                  수 없습니다. 업로드 시 당사 운영진의 판단으로 삭제될 수
                  있습니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">7.</span>
                <p>
                  음원(술이웬수다) 저작권 관련 문제로 인하여 챌린지션 영상을
                  칸테움이 아닌 타 플랫폼에 올릴 경우 문제가 발생할 수 있으며
                  법적 책임을 지게 될 수도 있습니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">8.</span>
                <p>
                  타인의 영상을 무단으로 도용할 시 챌린지션 대상에서 제외될 수
                  있습니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">9.</span>
                <p>
                  대리 업로드 및 어뷰징 행위가 발각될 경우 챌린지션 대상에서
                  제와될 수 있습니다.
                </p>
              </div>
              <div className="notice_item fs_12 lh_16">
                <span className="notice_number">10.</span>
                <p>
                  기타 사항에 대해서는 회사 이용 약관에 의거하여 처리됩니다.
                </p>
              </div>
            </CustomSeasonContent>
            <h5 className="SeasonInfo_Main_Title">문의</h5>
            <CustomSeasonContent>
              <div>
                <span className="fs_14">TEL</span>
                <span className="center_border" />
                <span className="fs_14">02.6101.9285</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="fs_14">E-mail</span>
                <span className="center_border" />
                <span className="fs_14">contact@khancomes.com</span>
              </div>
            </CustomSeasonContent>
            <Link
              href="/season/[season_no]/apply"
              as={`/season/${season.category_level3_no}/apply`}
            >
              <a className="apply_container" onClick={onCheckIsLoggedIn}>
                <NewButton
                  height="40px"
                  bgColor={BACKGROUND_BLACK_COLOR}
                  gradient
                >
                  참가 하기
                </NewButton>
              </a>
            </Link>
          </Content>
        </div>
      )}

      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
        }
        .banner_container {
          max-width: 1200px;

          margin: 0 auto;
          position: relative;
          width: 100%;

          background-size: cover;
          background-position: center center;
        }

        .mr_download {
          margin: 20px auto 10px auto;

          width: 60%;
          display: flex;
          cursor: pointer;

          justify-content: center;
        }

        .download_notice {
          font-size: 12px;
          color: ${WHITE_COLOR};
          margin-bottom: 10px;
          text-align: center;
        }

        .mr_download img {
          height: 50px;
        }

        .SeasonInfo_Header {
          max-width: 1200px;

          margin: 0 auto;
          box-sizing: border-box;
          width: 100%;
          padding: 40px 20px 0 20px;
          background-image: ${GRADIENT_2F3354_040221(180)};
        }
        .SeasonInfo_Main_Title {
          font-size: 14px;
          line-height: 20px;
          color: ${COLOR_696C8C};
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .schedule_notice_number {
          flex-basis: 120px;
          flex-shrink: 0;

          display: flex;
          justify-content: space-between;
        }

        .examined_number {
          flex-shrink: 0;
        }

        .star {
          margin-right: 10px;
        }

        .examined_description {
          margin-left: 15px;
        }

        .center_border {
          width: 0px;
          height: 12px;
          border: 0.7px solid ${COLOR_AE46E7};
          margin-left: 6px;
          margin-right: 6px;
          margin-top: 2px;
        }

        .notice_item {
          display: flex;
          margin-bottom: 5px;
        }

        .notice_item:last-of-type {
          margin-bottom: 0px;
        }

        .producer_notice_number {
          flex-basis: 17px;
          flex-shrink: 0;
        }

        .notice_number {
          flex-basis: 20px;
          flex-shrink: 0;
        }

        .lh_16 {
          line-height: 16px;
        }

        .lh_18 {
          line-height: 18px;
        }

        .lh_20 {
          line-height: 20px;
        }

        .fs_12 {
          color: ${WHITE_COLOR};
          font-size: 12px;
        }

        .fs_14 {
          color: ${WHITE_COLOR};
          font-size: 14px;
        }

        .fs_16 {
          color: ${WHITE_COLOR};
          font-size: 16px;
        }

        .apply_container {
          margin-top: 40px;
          display: inline-block;
          width: 100%;
        }

        fieldset {
          margin-top: 10px;
          text-align: center;
          border-width: 2px;
          border-left: 0px;
          border-right: 0px;
          border-bottom: 0px;
          border-style: dashed;
          border-color: ${COLOR_AE46E7};
        }

        fieldset legend {
          font-size: 14px;
          font-weight: bold;
          padding: 0 15px;
          color: ${COLOR_AE46E7};
        }

        fieldset strong {
          display: inline-block;
          margin-top: 10px;
          font-size: 14px;
          font-weight: bold;
          color: ${WHITE_COLOR};
        }
      `}</style>
    </>
  );
};

export default SingerSeasonInfo;
