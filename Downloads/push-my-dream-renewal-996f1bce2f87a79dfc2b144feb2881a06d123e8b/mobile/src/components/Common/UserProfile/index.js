import React, { useEffect, useState, useRef, createContext } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import UserCategoryContainer from "containers/User/UserProfile/UserCategoryContainer";

import Body from "components/Layout/Body";
import Content from "components/Layout/Content";
import TitleHeader from "../TitleHeader";
import UserInfo from "./UserInfoWrapper/UserInfo";
import Introduction from "./UserInfoWrapper/Introduction";

import { GRADIENT_2F3354_040221, COLOR_696C8C } from "shared/constants/colors";

export const UserProfileContext = createContext();

const UserProfile = ({
  videoPage,
  currentUser,
  participations,
  category3No,
  isLoadedParticipations,
}) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const { uploaderScrollTop } = useSelector((state) => state.offset);
  const topWrapperRef = useRef();
  const [emptyHeight, setEmptyHeight] = useState(500);

  useEffect(() => {
    let timeout = null;
    if (currentUser.user_no) {
      timeout = setTimeout(() => {
        const profile = document.querySelector(
          ".wrapper_layout > .user_profile"
        );

        if (profile) {
          profile.scrollTop = uploaderScrollTop;
        }
      }, 200);
    }
    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [currentUser]);

  useEffect(() => {
    // console.log("topWrapperRef.current", topWrapperRef.current);
    if (topWrapperRef.current) {
      // console.log("topWrapperRef.current", topWrapperRef.current.offsetHeight);
      setEmptyHeight(topWrapperRef.current.offsetHeight + 257);
    }
  }, [topWrapperRef.current]);

  // const onPush = useCallback(() => {
  //   if (!isPush) {
  //     dispatch({
  //       type: OPEN_MODAL,
  //       data: {
  //         content: "현재 카테고리의 영상은 푸쉬하기가 불가능합니다.",
  //         isViewClose: false,
  //       },
  //     });
  //   } else {
  //     Router.push({
  //       pathname: "/push",
  //       query: {
  //         targetUserNo: currentUser.user_no,
  //         ref: encodeURIComponent(Router.asPath),
  //       },
  //     });
  //   }
  // }, [isPush, dispatch, currentUser, Router]);

  const _handleBack = () => {
    Router.back();
  };

  return (
    // <Layout whiteText transparent>
    // <UserProfileContext.Provider value={{ emptyHeight, season, currentUser }}>
    <UserProfileContext.Provider value={{ emptyHeight, currentUser }}>
      <Body
        style={
          !videoPage ? { paddingBottom: "50px" } : { paddingBottom: "initial" }
        }
      >
        <div className="container">
          <div
            className="container"
            style={
              !videoPage
                ? {
                    paddingTop: "50px",
                  }
                : {}
            }
          >
            <TitleHeader>프로필</TitleHeader>
          </div>
          <div
            className="container"
            style={{
              boxSizing: "border-box",
              backgroundColor: "#000",
              paddingBottom: "50px",
              minHeight: videoPage ? "100%" : "calc(100vh - 177px)",
            }}
          >
            <div className="wrapper" ref={topWrapperRef}>
              <Content style={{ padding: 0 }}>
                {Boolean(currentUser.user_no) && (
                  <>
                    <UserInfo currentUser={currentUser} />
                    <Introduction>{currentUser.introduce}</Introduction>
                  </>
                )}
              </Content>
            </div>
            {Boolean(isLoadedParticipations) && (
              <>
                {Boolean(participations.length) ? (
                  <UserCategoryContainer
                    userNo={currentUser.user_no}
                    category3No={category3No}
                    participations={participations}
                    currentUser={currentUser}
                  />
                ) : (
                  <div className="no_participations">
                    경연 참여 정보가 없습니다.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* 
        <div className="push_btn">
          <Button
            style={Object.assign(
              {},
              {
                height: "60px",
                width: "100%",
                textAlign: "center",
                borderRadius: "inherit",
              },
              !isPush ? { backgroundColor: MAIN_BLACK_BG_COLOR } : {}
            )}
            handleClick={onPush}
          >
            <img src={push_logo} alt="push_logo" width="76px" height="18px" />
          </Button>
        </div> */}
      </Body>

      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          background-color: #000;
          max-width: 1200px;
          margin: 0 auto;
        }
        .push_btn {
          position: relative;
          width: calc(100% - 60px);
          margin: 30px auto 0;
        }

        .no_participations {
          width: 100%;
          height: 80px;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};

          display: flex;
          justify-content: center;
          align-items: center;
          color: ${COLOR_696C8C};
        }
      `}</style>
    </UserProfileContext.Provider>
  );
};

UserProfile.propTypes = {
  videoPage: PropTypes.bool,
  currentUser: PropTypes.object,
  participations: PropTypes.array,
  category3No: PropTypes.number,
  isLoadedParticipations: PropTypes.bool,
};

export default UserProfile;

// {
//   currentUser.user_no && (
//     <>
//       <div className="wrapper" ref={topWrapperRef}>
//         <UserInfoWrapper
//           currentUser={currentUser}
//           handleFollow={handleFollow}
//           followingList={followingList}
//         />
//         {/* <UserVideo
//         title="등록한 영상"
//         count={currentUser ? currentUser.countVideo : 0}
//         videoList={currentUser ? currentUser.VIDEO : []}
//         currentUser={currentUser}
//       /> */}
//       </div>
//       <UserProfileTab currentUser={currentUser} handleFollow={handleFollow} />
//     </>
//   );
// }
