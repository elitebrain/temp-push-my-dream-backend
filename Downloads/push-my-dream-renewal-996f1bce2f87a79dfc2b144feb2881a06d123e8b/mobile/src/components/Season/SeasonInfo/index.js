import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import Layout from "components/Layout/Layout";
import TitleHeader from "components/Common/TitleHeader";
import Banner from "components/Common/Banner";
import SeasonTitle from "./SeasonTitle";
import Info from "./Info";
import SeasonContent from "./SeasonContent";
import NewButton from "components/Common/NewButton";
import Content from "components/Layout/Content";

import {
  BACKGROUND_BLACK_COLOR,
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
} from "shared/constants/colors";
import { OPEN_MODAL } from "store/reducers/modal";

const SeasonInfo = ({ season }) => {
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

  console.log(season);

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
          <Content>
            <div className="banner_container">
              <Banner banner={season.banner_mobile_url} />
            </div>
            <div className="SeasonInfo_Header">
              <SeasonTitle season={season} />
              <Info season={season} />
            </div>
            <div className="SeasonInfo_Main">
              <SeasonContent content={season.reward} />
              <span className="SeasonInfo_Main_Important">
                ※ 참여자와 협의한 활동 방향에 따라 구체적인 지원 방법이
                결정됩니다.
              </span>
              <h5 className="SeasonInfo_Main_Title">진행 일정</h5>
              <SeasonContent content={season.progress_schedule} />
              <h5 className="SeasonInfo_Main_Title">참가자 유의 사항</h5>
              <SeasonContent content={season.notice} />
              <Link
                href="/season/[season_no]/apply"
                as={`/season/${season.category_level3_no}/apply`}
              >
                <a
                  className="SeasonInfo_Main_Button"
                  onClick={onCheckIsLoggedIn}
                >
                  <NewButton
                    height="40px"
                    bgColor={BACKGROUND_BLACK_COLOR}
                    gradient
                  >
                    참가 하기
                  </NewButton>
                </a>
              </Link>
            </div>
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
          position: relative;
          width: 100%;

          background-size: cover;
          background-position: center center;
        }

        .SeasonInfo_Header {
          box-sizing: border-box;
          width: 100%;
          padding: 20px 20px 0 20px;
          background-image: ${GRADIENT_2F3354_040221(180)};
        }

        .SeasonInfo_Main {
          box-sizing: border-box;
          width: 100%;
          margin-top: -40px;
          padding: 0px 20px;
        }

        .SeasonInfo_Main .SeasonInfo_Main_Important {
          display: block;
          margin-top: 10px;
          font-size: 10px;
          line-height: 12px;
          color: ${COLOR_696C8C};
        }
        .SeasonInfo_Main .SeasonInfo_Main_Title {
          font-size: 14px;
          line-height: 17px;
          color: ${COLOR_696C8C};
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .SeasonInfo_Main .SeasonInfo_Main_Button {
          display: block;
          margin-top: 30px;
        }
      `}</style>
    </>
  );
};
SeasonInfo.propTypes = {
  season: PropTypes.shape({
    banner_mobile_url: PropTypes.string,
    reward: PropTypes.string,
    progress_schedule: PropTypes.string,
    notice: PropTypes.string,
    category_level3_no: PropTypes.number,
  }),
};

export default SeasonInfo;
