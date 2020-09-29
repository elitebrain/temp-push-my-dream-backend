import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useRouter } from "next/router";

import MyPageIndex from "components/MyPage/MyPageIndex";

import { OPEN_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";
import { userApi } from "shared/api";

const MyPageContainer = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user);
  const user_no = useSelector((state) => state.user.user_no);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // 유저의 참가 시즌
  const [isLoadedParticipations, setIsLoadedParticipations] = useState(false);
  const [participations, setParticipations] = useState([]);

  // const [isPush, setIsPush] = useState(false); // 푸쉬 가능 여부
  // const [isParticipate, setIsParticipate] = useState(false); // 시즌 참여 여부
  // const [season, setSeason] = useState(null); // 푸쉬 가능 시즌 데이터
  // const [pushInRound, setPushInRound] = useState(null); // 내가 이번 라운드에 받은 푸쉬 정보

  useEffect(() => {
    let isCancelled = false;

    // fetchUser();
    fetchParticipateByUser();

    function onError(error) {
      console.error(error);
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

    // // 유저 정보 조회
    // async function fetchUser() {
    //   try {
    //     const {
    //       data: { user },
    //     } = await userApi.get("/info", {
    //       params: {
    //         userNo: user_no,
    //       },
    //       withCredentials: true,
    //     });

    //     if (user) {
    //       setMe(user);
    //     } else {
    //       dispatch({
    //         type: OPEN_MODAL,
    //         data: {
    //           content: "존재하지 않는 사용자 입니다.",
    //           isViewClose: false,
    //         },
    //       });
    //       Router.back();
    //     }
    //   } catch (error) {
    //     onError(error);
    //   }
    // }

    // 푸쉬 가능한지 체크
    async function fetchParticipateByUser() {
      try {
        if (!isCancelled) {
          const result = await userApi.get(`${user_no}/participate`);
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
  }, [isLoggedIn, user_no]);

  // useEffect(() => {
  //   if (isLoggedIn && season) {
  //     fetchSeasonRankByUser();
  //   }

  //   // 나에게 푸쉬한 프로듀서 정보 조회
  //   async function fetchSeasonRankByUser() {
  //     try {
  //       const result = await userApi.get(
  //         `/${user_no}/ranks/season/${season.category_level4_no}/producer`,
  //         {
  //           params: {
  //             limit: 3,
  //           },
  //           withCredentials: true,
  //         }
  //       );

  //       setPushInRound(result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, [isLoggedIn, season]);

  // 비로그인시 노출 x
  if (!isLoggedIn) {
    return null;
  }

  return (
    <MyPageIndex
      me={me}
      isLoadedParticipations={isLoadedParticipations}
      participations={participations}
    />
  );
};

export default MyPageContainer;
