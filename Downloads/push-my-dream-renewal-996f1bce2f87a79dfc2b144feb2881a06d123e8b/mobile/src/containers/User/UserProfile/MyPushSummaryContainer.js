import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

import MyPushSummary from "components/MyPage/MyPageIndex/MyPushSummary";
import { userApi } from "shared/api";

const MyPushSummaryContainer = () => {
  const { isLoggedIn, user_no } = useSelector(
    (state) => state.user,
    shallowEqual
  );
  const [isLoading, setIsLoading] = useState(true);
  const [havePush, setHavePush] = useState(0);
  const [residualPushList, setResidualPushList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMyPushSummary() {
      try {
        const result = await userApi.get("/me/push/summary", {
          withCredentials: true,
        });

        setHavePush(result.data.have_push);
        setResidualPushList(result.data.residualPushList);

        setIsLoading(false);
      } catch (error) {
        console.error();
        setIsLoading(false);
        // setError("데이터를 불러오지 못했습니다.");
      }
    }

    if (isLoggedIn) {
      fetchMyPushSummary();
    }
  }, [isLoggedIn, user_no]);

  return (
    <MyPushSummary
      isLoading={isLoading}
      havePush={havePush}
      residualPushList={residualPushList}
    />
  );
};

export default React.memo(MyPushSummaryContainer);
