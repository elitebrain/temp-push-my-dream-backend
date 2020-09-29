import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { PushCountContext } from "components/Hoc/withPushCount";

import {
  GET_MAINPAGE_REQUEST,
  SET_VIDEOLIST_INDEX,
} from "store/reducers/video";
import { mainApi, commonApi } from "shared/api";
import { findSearchStringValue, getCookie } from "shared/functions";
import CounterAnimate from "components/Common/CounterAnimate";
import { VIDEO_INEDX_COUNT } from "shared/constants/variables";
import PopupNotice from "components/Common/PopupNotice";

const COUNTERANIMATE_DEFAULT_TIME = 0.5;
const COUNTERANIMATE_BETWEEN = 0.2;

const SplashPage = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const { totalPushCount } = useSelector((state) => state.common);
  const { user_no } = useSelector((state) => state.user);
  // pt 비디오 인덱스
  const { hotViewVideoIndex } = useSelector((state) => state.video);

  const [opacity, setOpacity] = useState(1);
  const [popupNotice, setPopupNotice] = useState([]);
  const [popupOpacity, setPopupOpacity] = useState(0);

  const { isPushLoaded, onPushLoaded } = useContext(PushCountContext);

  // isViewMainCounterAnimate
  // 메인카운터를 한번이라도 조회 했으면 다시는 안보여주기
  const time =
    COUNTERANIMATE_DEFAULT_TIME +
    COUNTERANIMATE_BETWEEN * String(totalPushCount).length;

  useEffect(() => {
    let timeOut;
    let timeOutFirst;
    // const popupNotice = [];
    if (popupNotice.length === 0) {
      timeOutFirst = setTimeout(() => {
        // setOpacity(0);
      }, time * 1000 + 1300);
      timeOut = setTimeout(() => {
        dispatch({ type: SET_VIDEOLIST_INDEX, data: hotViewVideoIndex });
        _moveToVideo();
      }, time * 1000 + 1800);
    } else {
      let existPopupNotice = false;
      for (let i = 0; i < popupNotice.length; i++) {
        const hidden = getCookie(`popup_${popupNotice[i].notice_no}`);
        if (hidden === "") {
          existPopupNotice = true;
        }
      }
      if (!existPopupNotice) {
        timeOutFirst = setTimeout(() => {
          // setOpacity(0);
          dispatch({ type: SET_VIDEOLIST_INDEX, data: hotViewVideoIndex });
        }, time * 1000 + 1300);
        timeOut = setTimeout(() => {
          _moveToVideo();
        }, time * 1000 + 1800);
      } else {
        setTimeout(() => {
          setPopupOpacity(1);
        }, time * 1000 + 1300);
      }
    }

    return function cleanup() {
      clearTimeout(timeOutFirst);
      clearTimeout(timeOut);
    };
  }, [totalPushCount, isPushLoaded, hotViewVideoIndex, Router, popupNotice]);

  const _moveToVideo = () => {
    setOpacity(0);

    const randomIndex = Math.floor(
      Math.random() * Math.min(20, hotViewVideoIndex.length)
    );
    Router.replace(
      {
        pathname: "/videos/[type]",
        query: {
          currentVideoNo: hotViewVideoIndex[randomIndex],
        },
      },
      {
        pathname: "/videos/hotView",
        query: {
          currentVideoNo: hotViewVideoIndex[randomIndex],
        },
      }
    ).then(() => {
      onPushLoaded();
    });
  };
  useEffect(() => {
    const token = findSearchStringValue(Router.asPath, "token");
    const os = findSearchStringValue(Router.asPath, "os") || "ios";
    const userNo = user_no || null;
    const data = { token, userNo, os };
    console.log("data", data);
    if (token) {
      commonApi.post("/token", data).then((res) => {
        console.log(res);
      });
    }
    _getPopupNotice();
  }, []);
  const _getPopupNotice = () => {
    commonApi.get("/popup-notice").then((res) => {
      if (res.data) {
        setPopupNotice(res.data);
        console.log(res.data);
        // getCookie(res.data)
      }
    });
  };
  console.log("popupNotice", popupNotice);
  return (
    <div className="counterAnimateBackground">
      <div className="radial_bg" />
      {/* <img className="splash" src={splashImg} alt="splash_img" /> */}
      <button
        id="hidden_btn"
        style={{ width: 0, height: 0, border: "none" }}
        onClick={() => _moveToVideo()}
      ></button>
      <CounterAnimate
        moveToVideo={_moveToVideo}
        pushCount={totalPushCount}
        defaultTime={COUNTERANIMATE_DEFAULT_TIME}
        between={COUNTERANIMATE_BETWEEN}
        slotLength={8}
        // counterColor="#222"
        counterColor="#fff"
        style={{
          width: "100%",
        }}
      />
      {popupNotice && popupNotice.length > 0 && (
        <PopupNotice
          popupNotice={popupNotice}
          handleClose={_moveToVideo}
          popupOpacity={popupOpacity}
        />
      )}
      <style jsx>{`
        .counterAnimateBackground {
          position: relative;
          width: 100%;
          height: 100vh;
          background-color: #020216;
          opacity: ${opacity};
          transition: opacity 0.5s ease-in-out;
          overflow: hidden;
        }
        .radial_bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: 100vw;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #2b2c3f 0%,
            #020216 88.02%,
            #020216 100%
          );
        }
        .splash {
          position: absolute;
          width: 100%;
          height: auto;
          left: 0;
          top: calc(50% - 100px);
          transform: translateY(-50%);
          animation: fadein 2s linear;
        }
        @keyframes fadein {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

SplashPage.getInitialProps = async (context) => {
  try {
    const {
      video: { isLoadedMain },
    } = context.store.getState();

    if (context.isServer) {
      // 쿠키는 브라우저에만 있기 떄문에 브라우저에서 서버사이드 렌더링을 할 시 쿠키를 가져와서 사용해야한다.
      const cookie = context.req.headers.cookie;

      if (cookie) {
        mainApi.defaults.headers.cookie = cookie;
      }
    }

    // 메인 페이지가 로딩되지 않았을 시
    if (!isLoadedMain) {
      context.store.dispatch({
        type: GET_MAINPAGE_REQUEST,
        // payload: {
        //   limit: VIDEO_INEDX_COUNT,
        // },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default SplashPage;
