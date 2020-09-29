import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { userApi } from "shared/api";
import PushCompleteComponent from "components/Push/PushCompleteComponent";
import LoadingCircle from "components/Common/CssIcons/LoadingCircle";

const PushCompleteContainer = (props) => {
  const { targetUser, push, season, addPoint } = props;
  const [myProducerInfoByDreamer, setMyProducerInfoByDreamer] = useState(null);

  console.log("PushCompleteContainer props", props);
  // 푸쉬로 인한 내 프로듀서 정보 조회
  useEffect(() => {
    async function fetchMyProducerInfoByDreamer() {
      try {
        const result = await userApi.get(`/${targetUser.user_no}/push/result`, {
          params: {
            categoryLevel4No: season.category_level4_no,
          },
          withCredentials: true,
        });

        setMyProducerInfoByDreamer(result.data.myProducerInfoByDreamer);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMyProducerInfoByDreamer();
  }, [targetUser, push, season]);
  return myProducerInfoByDreamer ? (
    <PushCompleteComponent
      season={season}
      addPoint={addPoint}
      targetUser={targetUser}
      myProducerInfoByDreamer={myProducerInfoByDreamer}
      push={push}
      category4No={season.category_level4_no}
    />
  ) : (
    <LoadingCircle />
  );
};

PushCompleteContainer.propTypes = {
  targetUser: PropTypes.shape({
    user_no: PropTypes.number,
  }),
  season: PropTypes.shape({
    category_level4_no: PropTypes.number,
  }),
  push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  addPoint: PropTypes.number,
};

export default PushCompleteContainer;
