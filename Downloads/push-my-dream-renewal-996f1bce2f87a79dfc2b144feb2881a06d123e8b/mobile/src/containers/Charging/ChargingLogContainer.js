import React, { useState, useEffect } from "react";

import { commonApi } from "shared/api";

import ChargingLog from "components/Charging/ChargingLog";

const ChargingLogContainer = () => {
  const [chargingLog, setChargingLog] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const _getMyChargingLog = (pgcode, startDate, endDate) => {
    setLoading(true);
    commonApi
      .get("/my-pg-log", {
        params: { pgcode, startDate, endDate },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setChargingLog(res.data);
          setLoading(false);
        }
      });
  };
  return (
    <ChargingLog
      loading={loading}
      chargingLog={chargingLog}
      getMyChargingLog={_getMyChargingLog}
    />
  );
};

export default ChargingLogContainer;
