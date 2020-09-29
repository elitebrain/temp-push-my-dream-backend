import React, { useState, useCallback, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { PushCountContext } from "components/Hoc/withPushCount";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import Body from "components/Layout/Body";
import Gate from "components/Common/Gate/Gate";

import main_gate_left_img from "public/assets/image/main_gate_left.jpg";
import main_gate_right_img from "public/assets/image/main_gate_right.jpg";

import {
  COUNTERANIMATE_DEFAULT_TIME,
  COUNTERANIMATE_BETWEEN,
} from "shared/constants/variables";
import CounterAnimate from "components/Common/CounterAnimate";
import { VIEW_MAIN_COUNTER_ANIMATE } from "store/reducers/common";
import { MAIN_BLACK_COLOR } from "shared/constants/colors";

const MainGateComponent = () => {
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

  const onLeftGateEnter = useCallback(() => {
    setMousePosition("left");
  }, []);

  const onRightGateEnter = useCallback(() => {
    setMousePosition("right");
  }, []);

  const onGateLeave = useCallback(() => {
    setMousePosition("");
  }, []);

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
    <Layout transparent className="whiteBg">
      <Body>
        {isPushLoaded && (
          <div className="container" style={{ overflow: "hidden" }}>
            {/* <Content> */}
            <div className="main_gate_container">
              <Gate
                className={
                  mousePosition === "left"
                    ? "active"
                    : mousePosition === "right"
                    ? "inactive"
                    : ""
                }
                link="/emergenza"
                title=""
                buttonTitle=""
                noti=""
                //     title="EMERGENZA"
                //     buttonTitle="바로가기"
                //     noti={`세계 최대 밴드 경연 대회 에머겐자
                // 지금 도전하세요!`}
                src={main_gate_left_img}
                onMouseEnter={onLeftGateEnter}
                onMouseLeave={onGateLeave}
              />
              <Gate
                className={
                  mousePosition === "right"
                    ? "active"
                    : mousePosition === "left"
                    ? "inactive"
                    : ""
                }
                link="/dream"
                title=""
                buttonTitle=""
                noti=""
                // title="PUSH MY APPLE"
                // buttonTitle="바로가기"
                //       noti={`건강미 넘치는 당신을 응원합니다.
                // 2020 영광의 첫번째 APPLE에 도전하세요!`}
                src={main_gate_right_img}
                onMouseEnter={onRightGateEnter}
                onMouseLeave={onGateLeave}
              />
            </div>
            {/* </Content> */}
          </div>
        )}
      </Body>
      <style jsx>{`
        .container {
          width: 100%;
          min-width: 1366px;
          height: auto;
          /* background-color: #1e1e25; */
          /* overflow: hidden; */
          margin: 0 auto;
          position: relative;
        }
        .main_gate_container {
          position: relative;
          /* height: 985px; */
          height: calc(100vh - 90px);
          margin-top: 88px;
        }
      `}</style>
    </Layout>
  );
};

export default MainGateComponent;
