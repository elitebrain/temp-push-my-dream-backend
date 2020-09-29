import React, { useState, useEffect } from "react";

import { commonApi } from "shared/api";
import { findSearchStringValue } from "shared/functions";

import ChargingCompleteComponent from "components/Charging/ChargingCompleteComponent";

const ChargingCompleteContainer = () => {
  const [pgLog, setPgLog] = useState({});
  useEffect(() => {
    const pgLogNo = findSearchStringValue(location.search, "pgLogNo");
    console.log("pgLogNo", pgLogNo);
    if (pgLogNo) {
      commonApi.get(`/pg-log?pgLogNo=${pgLogNo}`).then((res) => {
        if (res.data) {
          setPgLog(res.data);
        }
      });
    }
  }, []);
  console.log("pgLog", pgLog);
  return <ChargingCompleteComponent pgLog={pgLog} />;
};

export default ChargingCompleteContainer;
