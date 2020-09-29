import React, { useCallback } from "react";

import Router from "next/router";

// import emergenza_schedule from "public/assets/image/emergenza_schedule.png";
import emergenza_schedule from "public/assets/image/emergenza_schedule_new.png";
import Button from "components/Common/Button";

const ScheduleImg = () => {
  const onLocationEmergenzaApply = useCallback(() => {
    Router.push("/emergenza/apply");
  }, [Router]);

  return (
    <>
      <div className="schedule_img_container">
        <div className="schedule_img" />
        <div className="schedule_notice">※ 일정은 추후 변경될 수 있습니다.</div>

        <Button
          style={{
            width: "305px",
            height: "60px",
            margin: "0 auto",
            display: "block"
          }}
          onClick={onLocationEmergenzaApply}
        >
          ONLINE 예선 참여 하기
        </Button>
      </div>
      <style jsx>{`
        .schedule_img_container {
          width: 100%;
          background-color: rgb(30, 30, 37);
          padding-top: 80px;
        }
        .schedule_img {
          width: 1200px;
          height: 365px;
          margin: 0 auto;
          background-image: url(${emergenza_schedule});
          background-repeat: no-repeat;
        }
        .schedule_notice {
          text-align: right;
          width: 1200px;
          color: rgb(255, 255, 255);
          margin: 0 auto;
          margin-bottom: 80px;
        }
      `}</style>
    </>
  );
};

export default ScheduleImg;
