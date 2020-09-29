import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import PushHistoryComponent from "components/User/Profile/PushHistoryComponent";

import { userApi } from "shared/api";

// custom hooks
const useFetchList = ({ tab, userNo, category3No, category4No }) => {
  const [pushHistoryList, setPushHistoryList] = useState([]);
  const [producerList, setProducerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tab === 0) {
      fetchProducerList();
    } else if (tab === 1) {
      fetchReceivePush();
    }

    // 받은 푸쉬 조회;
    async function fetchReceivePush() {
      try {
        const result = await userApi.get(
          `/${userNo}/push/${category3No}/receive`,
          {}
        );

        setPushHistoryList(result.data.receivePushList);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setPushHistoryList([]);
        setIsLoading(false);
      }
    }

    // 프로듀서 리스트 조회
    async function fetchProducerList() {
      try {
        if (!userNo || !category4No) {
          throw new Error("userNo 또는 category4No가 필요합니다.");
        }

        const result = await userApi.get(
          `/${userNo}/ranks/season/${category4No}/producer`,
          {
            params: {
              limit: 10,
            },
          }
        );

        // exPush - 푸시가 존재하는지 ,
        // exPush가 true면 producerRankList가 존재한다.
        if (result.data.exPush) {
          setProducerList(result.data.producerRankList);
        } else {
          setProducerList([]);
        }
        setIsLoading(false);
        // if (!result.data.exPush) {
        //   setPushData(result.data);
        // }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setProducerList([]);
      }
    }
  }, [tab, userNo, category3No, category4No]);

  return [pushHistoryList, producerList, isLoading, setIsLoading];
};

useFetchList.propTypes = {
  tab: PropTypes.number,
  userNo: PropTypes.number,
  category3No: PropTypes.number,
  category4No: PropTypes.number,
};

const PushHistoryContainer = ({ currentUser, category3No, category4No }) => {
  const [tab, setTab] = useState(0);
  const [pushHistoryList, producerList, isLoading, setIsLoading] = useFetchList(
    {
      tab,
      userNo: currentUser.user_no,
      category3No,
      category4No,
    }
  );

  // 탭 클릭
  const onClickTab = useCallback((_tab) => {
    setIsLoading(true);
    setTab(_tab);
  }, []);

  return (
    <PushHistoryComponent
      tab={tab}
      onClickTab={onClickTab}
      pushHistoryList={pushHistoryList}
      producerList={producerList}
      isLoading={isLoading}
    />
  );
};

PushHistoryContainer.propTypes = {
  currentUser: PropTypes.object,
  category3No: PropTypes.number,
  category4No: PropTypes.number,
};

export default PushHistoryContainer;
