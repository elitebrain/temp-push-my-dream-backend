import React from "react";
import PropTypes from "prop-types";

import UserRankContainer from "containers/User/UserProfile/UserRankContainer";
import MyPushSummaryContainer from "containers/User/UserProfile/MyPushSummaryContainer";

import MyCategoryContainer from "containers/MyPage/MyCategoryContainer";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import UserInfo from "components/Common/UserProfile/UserInfoWrapper/UserInfo";
import Introduction from "components/Common/UserProfile/UserInfoWrapper/Introduction";
import MyParticipatingRound from "./MyParticipatingRound";
import MyProfileTab from "./MyProfileTab";

import gear from "public/assets/icon/gear.svg";
import settingIcon from "public/assets/image/icon_setting.png";
import { MAIN_BLACK_BG_COLOR } from "shared/constants/colors";
import TitleHeader from "components/Common/TitleHeader";
import Link from "next/link";

const MyPageIndex = ({ me, isLoadedParticipations, participations }) => {
  return (
    <Body>
      <TitleHeader
        right={
          <Link href="/mypage/edit">
            <a>
              <img
                className="Gear"
                src={settingIcon}
                alt="setting_icon"
                width="24px"
                height="24px"
              />
            </a>
          </Link>
        }
      >
        나의 프로필
      </TitleHeader>

      <div className="container main">
        <Content style={{ padding: "0" }}>
          <div className="wrapper">
            <UserInfo currentUser={me} />
            <Introduction>{me.introduce}</Introduction>
            {/* GET PUSH 및 참가 신청 버튼 */}
            {/* <MyParticipatingRou  */}
            {/* </MyParticipatingRound> */}
            {/* 잔여 푸쉬 */}
            <MyPushSummaryContainer />
          </div>
          {Boolean(isLoadedParticipations) && (
            <>
              {Boolean(participations.length) ? (
                <MyCategoryContainer
                  userNo={me.user_no}
                  participations={participations}
                  me={me}
                />
              ) : (
                <div className="no_participations">
                  경연 참여 정보가 없습니다.
                </div>
              )}
            </>
          )}
        </Content>
      </div>

      {/* <MyProfileTab
            isParticipate={isParticipate}
            isPush={isPush}
            season={season}
          /> */}

      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
        }

        .container.main {
          height: 100%;
          box-sizing: border-box;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .Gear {
          vertical-align: top;
          cursor: pointer;
        }

        .wrapper {
          margin-bottom: 10px;
        }
        /* .wrapper {
      padding-bottom: 140px;
    } */
      `}</style>
    </Body>
  );
};

MyPageIndex.propTypes = {
  me: PropTypes.object,
  handleFollow: PropTypes.func,
  isParticipate: PropTypes.bool,
  isPush: PropTypes.bool,
  season: PropTypes.object,
  pushInRound: PropTypes.object,
};

export default MyPageIndex;
