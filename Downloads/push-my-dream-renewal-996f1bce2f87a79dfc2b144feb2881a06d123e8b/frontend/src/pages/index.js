import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Helmet from "react-helmet";

import MainContainer from "containers/Main/MainContainer";

import { PushCountContext } from "components/Hoc/withPushCount";

import CounterAnimate from "components/Common/CounterAnimate";

import main_gate_left_img from "public/assets/image/main_gate_left.jpg";
import main_gate_right_img from "public/assets/image/main_gate_right.jpg";

import {
  COUNTERANIMATE_DEFAULT_TIME,
  COUNTERANIMATE_BETWEEN,
} from "shared/constants/variables";
import { VIEW_MAIN_COUNTER_ANIMATE } from "store/reducers/common";
import { MAIN_BLACK_COLOR } from "shared/constants/colors";

const MainGate = () => {
  const dispatch = useDispatch();
  const { totalPushCount, isViewMainCounterAnimate } = useSelector(
    (state) => state.common
  );
  const [mousePosition, setMousePosition] = useState("");

  const { isPushLoaded, onPushLoaded } = useContext(PushCountContext);

  // isViewMainCounterAnimate
  // 메인카운터를 한번이라도 조회 했으면 다시는 안보여주기
  const time = isViewMainCounterAnimate
    ? COUNTERANIMATE_DEFAULT_TIME +
      COUNTERANIMATE_BETWEEN * String(totalPushCount).length
    : 0;

  useEffect(() => {
    let timeOut;
    // 카운터에니메티어를 안보여줬으면 보여주기
    if (isViewMainCounterAnimate) {
      timeOut = setTimeout(() => {
        onPushLoaded();
        dispatch({
          type: VIEW_MAIN_COUNTER_ANIMATE,
        });
      }, time * 1000 + 500);
    } else {
      if (!isPushLoaded) {
        onPushLoaded();
      }
    }

    return function cleanup() {
      clearTimeout(timeOut);
    };
  }, [totalPushCount, isViewMainCounterAnimate, isPushLoaded]);

  if (isViewMainCounterAnimate) {
    return (
      <div className="counterAnimateBackground">
        <CounterAnimate
          pushCount={totalPushCount}
          defaultTime={COUNTERANIMATE_DEFAULT_TIME}
          between={COUNTERANIMATE_BETWEEN}
          slotLength={8}
          counterColor="#fff"
          style={{
            width: "100%",
          }}
        />
        <style jsx>{`
          .counterAnimateBackground {
            width: 100%;
            height: 100vh;
            background-color: ${MAIN_BLACK_COLOR};
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 </title>
      </Helmet>
      {/* <MainGateComponent /> */}
      <MainContainer />
    </>
  );
};

export default MainGate;
