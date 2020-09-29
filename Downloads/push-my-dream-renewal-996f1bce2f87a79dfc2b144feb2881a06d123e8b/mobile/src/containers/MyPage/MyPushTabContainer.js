import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import MyPushTab from "components/MyPage/MyPageIndex/MyProfileTab/MyPushTab";
import { userApi } from "shared/api";

const usePushTab = ({ tab, category3No, category4No, setIsLoading }) => {
  const { user_no, isLoggedIn } = useSelector((state) => state.user);
  const [myProducer, setMyProducer] = useState(null);
  const [receivePush, setReceivePush] = useState(null);
  const [myPushs, setMyPushs] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      if (tab === "myProducer") {
        fetchMyProducers();
      } else if (tab === "receivePush") {
        fetchReceivePush();
      } else if (tab === "myPush") {
        fetchMyPush();
      }
    }

    // 나의 프로듀서 조회;
    async function fetchMyProducers() {
      try {
        if (category4No) {
          const result = await userApi.get(
            `/${user_no}/ranks/season/${category4No}/producer`
          );

          setMyProducer(result.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setMyProducer(null);
        setIsLoading(false);
      }
    }

    // 내가 받은 푸쉬 조회;
    async function fetchReceivePush() {
      try {
        if (category3No) {
          const result = await userApi.get(
            `/${user_no}/push/${category3No}/receive`,
            {}
          );

          setReceivePush(result.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setReceivePush(null);
        setIsLoading(false);
      }
    }

    // 내가 한 푸쉬 조회
    async function fetchMyPush() {
      try {
        const result = await userApi.get(`/me/push/open`, {
          withCredentials: true,
        });

        setMyPushs(result.data.myPushs);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setMyPushs([]);
        setIsLoading(false);
      }
    }
  }, [tab, category3No, category4No, isLoggedIn]);

  return [myProducer, receivePush, myPushs];
};

const MyPushTabContainer = ({ category3No, category4No }) => {
  const [tab, setTab] = useState("myProducer");
  const [isLoading, setIsLoading] = useState(true);

  const [myProducer, receivePush, myPushs] = usePushTab({
    tab,
    category3No,
    category4No,
    setIsLoading,
  });

  useEffect(() => {
    setIsLoading(true);
  }, [category3No, category4No]);

  // 탭 클릭
  const onClickTab = useCallback((_tab) => {
    setTab(_tab);
    setIsLoading(true);
  }, []);

  return (
    <MyPushTab
      tab={tab}
      isLoading={isLoading}
      onClickTab={onClickTab}
      myProducer={myProducer}
      receivePush={receivePush}
      myPushs={myPushs}
    />
  );
};

MyPushTabContainer.propTypes = {
  category3No: PropTypes.number,
  category4No: PropTypes.number,
};

export default MyPushTabContainer;
