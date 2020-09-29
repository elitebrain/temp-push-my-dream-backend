import React, { useEffect, useState, useCallback } from "react";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import MyPush from "./MyPush";
import ButtonGroup from "./ButtonGroup";
import MyPoint from "./MyPoint";
import MenuTab from "./MenuTab";
import TitleHeader from "components/Common/TitleHeader";
import Loader from "components/Common/Loader";
import MySupport from "./MySupport";

import { userApi } from "shared/api";

import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

const WalletComponent = () => {
  const [tab, setTab] = useState("push");
  const [isLoading, setIsLoading] = useState(true);
  const [push, setPush] = useState(null);
  const [point, setPoint] = useState(null);
  const [support, setSupport] = useState(null);

  useEffect(() => {
    if (tab === "push") {
      setPush(null);
      fetchPush();
    } else if (tab === "point") {
      setPoint(null);
      fetchPoint();
    } else if (tab === "support") {
      setSupport(null);
      fetchSupport();
    }

    /**
     * 푸쉬 정보 조회
     */
    async function fetchPush() {
      try {
        const result = await userApi.get("/me/push/summary", {
          withCredentials: true,
        });
        setPush(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setPush(null);
        setIsLoading(false);
      }
    }

    /**
     * 포인터 정보 조회
     */
    async function fetchPoint() {
      try {
        const result = await userApi.get("/me/point", {
          withCredentials: true,
        });

        setPoint(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setPoint(null);
        setIsLoading(false);
      }
    }

    /**
     * 후원 정보 조회
     */
    async function fetchSupport() {
      try {
        const result = await userApi.get("/me/support", {
          withCredentials: true,
        });

        setSupport(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setSupport(null);
        setIsLoading(false);
      }
    }
  }, [tab]);

  // 탭이동
  const onClickTab = useCallback(
    (_tab) => {
      if (_tab !== tab) {
        setIsLoading(true);
        setTab(_tab);
      }
    },
    [tab]
  );

  return (
    // <Layout layoutLong style={{ height: "100vh" }}>
    <>
      <TitleHeader>내 지갑</TitleHeader>
      <div
        className="container"
        style={{ overflow: "hidden", paddingBottom: "40px" }}
      >
        <Body style={{ padding: "initial" }}>
          <div className="wrapper">
            <MenuTab tab={tab} onClickTab={onClickTab} />
            {isLoading ? (
              // 로딩
              <div className="LoaderConatainer">
                <Loader />
              </div>
            ) : tab === "push" ? (
              // 내 푸쉬
              <MyPush push={push} />
            ) : tab === "point" ? (
              // 내 포인트
              <MyPoint point={point} />
            ) : (
              // 후원
              <MySupport support={support} />
            )}
          </div>
        </Body>
      </div>
      {/* <Buttongroup left="충전 내역 상세" right="PUSH 내역 상세" /> MyPush 일때 */}

      <style jsx>{`
        .LoaderConatainer {
          width: 100%;
          height: calc(100% - 220px);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .content_title {
          font-size: 18px;
          color: #fff;
          text-align: center;
          margin: 50px 0;
        }

        .container {
          background-color: ${BACKGROUND_BLACK_COLOR};
        }

        .container,
        .wrapper {
          width: 100%;
          height: auto;
          margin: 0 auto;
          position: relative;
        }
        .wrapper {
          max-width: 1200px;

          /* min-height: calc(100vh - 332px); */
        }
        .mypage_title {
          height: 50px;
          position: relative;
          margin-bottom: 17px;
        }
        .container .title {
          text-align: left;
          color: #fff;
          font-size: 50px;
          font-weight: 400;
        }
        .mypage_title span {
          display: inline-block;
        }
        .mypage_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 20px;
          transform: translateY(-50%);
          top: 50%;
        }
        .mypage_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        }
      `}</style>
    </>
  );
};

export default WalletComponent;
