import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { commonApi } from "shared/api";

import PushLog from "components/Push/PushLog";

const PushLogContainer = () => {
  const Router = useRouter();
  const [pushLog, setPushLog] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  const _getMyPushLog = async (categoryLevel2No, startDate, endDate) => {
    setLoading(true);

    try {
      const result = await commonApi.get("/my-push-log", {
        params: {
          categoryLevel2No,
          startDate,
          endDate,
          support: Router.query.support === "true",
        },
        withCredentials: true,
      });
      setPushLog(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PushLog loading={loading} pushLog={pushLog} getMyPushLog={_getMyPushLog} />
  );
};

export default PushLogContainer;
