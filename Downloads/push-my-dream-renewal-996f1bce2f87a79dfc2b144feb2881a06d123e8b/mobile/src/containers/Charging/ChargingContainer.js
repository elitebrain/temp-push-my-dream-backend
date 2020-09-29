import React, { createContext } from "react";

import { commonApi } from "shared/api";
import { checkPcOrMobile } from "shared/functions";

import ChargingComponent from "components/Charging/ChargingComponent";

export const ChargingContext = createContext();

const ChargingContainer = () => {
  const _handleCharging = (state) => {
    // alert("충전기능은 준비중입니다.");
    commonApi.post("/charging", state).then((res) => {
      console.log("_handleCharging res", res);

      if (res.status === 200) {
        const type = checkPcOrMobile();
        if (type === "pc") {
          window.location.href = res.data.online_url;
        } else if (type === "mobile") {
          window.location.href = res.data.mobile_url;
        }
      }
    });
  };
  return (
    <ChargingContext.Provider
      value={{
        handleCharging: _handleCharging,
      }}
    >
      <ChargingComponent />
    </ChargingContext.Provider>
  );
};

export default ChargingContainer;
