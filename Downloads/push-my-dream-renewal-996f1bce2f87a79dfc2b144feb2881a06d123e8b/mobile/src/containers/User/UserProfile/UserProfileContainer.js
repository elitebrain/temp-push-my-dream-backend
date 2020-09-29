import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";

import UserProfile from "components/Common/UserProfile";

import { userApi } from "shared/api";

import { DELETE_FOLLOW_REQUEST, ADD_FOLLOW_REQUEST } from "store/reducers/user";
import { OPEN_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";

const UserProfileContainer = (props) => {
  const dispatch = useDispatch();
  const { userNo, videoPage, category3No } = props;

  const [currentUser, setCurrentUser] = useState({});
  // 유저의 참가 시즌
  const [isLoadedParticipations, setIsLoadedParticipations] = useState(false);
  const [participations, setParticipations] = useState([]);
  const { followingList, isLoggedIn, isLoadingFollow } = useSelector(
    (state) => state.user
  );

  // 유저 정보 조회
  useEffect(() => {
    let isCancelled = false;

    function onError(error) {
      if (!isCancelled) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: getError(error),
            isViewClose: false,
            onConfirm() {
              Router.back();
            },
            onClose() {
              Router.back();
            },
          },
        });
      }
    }

    // 유저 정보 조회
    async function fetchUser() {
      try {
        if (!isCancelled) {
          const {
            data: { user },
          } = await userApi.get("/info", {
            params: {
              userNo,
            },
            withCredentials: true,
          });

          if (user) {
            if (!isCancelled) {
              setCurrentUser(user);
            }
          } else {
            dispatch({
              type: OPEN_MODAL,
              data: {
                content: "존재하지 않는 사용자 입니다.",
                isViewClose: false,
              },
            });
            Router.back();
          }
        }
      } catch (error) {
        if (!isCancelled) {
          onError(error);
        }
      }
    }

    // 푸쉬 가능한지 체크
    async function fetchParticipateByUser() {
      try {
        if (!isCancelled) {
          const result = await userApi.get(`${userNo}/participate`);
          console.log("fetchParticipateByUser", result.data);

          if (!isCancelled) {
            setIsLoadedParticipations(true);
            setParticipations(result.data);
          }
        }
      } catch (error) {
        if (!isCancelled) {
          onError(error);
        }
      }
    }

    setIsLoadedParticipations(false);
    fetchUser();
    fetchParticipateByUser();

    return function cleanup() {
      isCancelled = true;
    };
  }, [userNo, dispatch]);

  // 팔로우 유무 기능 버튼
  const _handleFollow = useCallback(
    async (gubun) => {
      const targetNo = currentUser.user_no;
      if (isLoggedIn) {
        // 이전 팔로우 기능이 마무리 되지 않았으면 현재 누른 팔로우 기능은 무시한다.
        if (!isLoadingFollow) {
          dispatch({
            type:
              gubun === "follow" ? ADD_FOLLOW_REQUEST : DELETE_FOLLOW_REQUEST,
            data: {
              targetNo,
            },
            success() {
              setCurrentUser((prevState) =>
                Object.assign({}, prevState, {
                  is_followed: gubun === "follow" ? 1 : 0,
                  countFollowUser:
                    gubun === "follow"
                      ? prevState.countFollowUser + 1
                      : prevState.countFollowUser - 1,
                })
              );
            },
          });
        }
      } else {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: "로그인 후 이용 가능합니다.",
            isViewClose: false,
          },
        });
      }
    },
    [isLoggedIn, currentUser, isLoadingFollow]
  );

  return (
    <UserProfile
      videoPage={videoPage}
      currentUser={currentUser}
      handleFollow={_handleFollow}
      followingList={followingList}
      participations={participations}
      category3No={Number(category3No)}
      isLoadedParticipations={isLoadedParticipations}
      // isPush={isPush}
      // isParticipateSeason={season && season.isParticipateSeason}
      // season={season}
    />
  );
};

UserProfileContainer.propTypes = {
  userNo: PropTypes.number,
  videoPage: PropTypes.bool,
  category3No: PropTypes.number,
};

export default UserProfileContainer;
