import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SeasonCounter from "components/Common/UserProfile/UserInfoWrapper/SeasonCounter";

import { userApi } from "shared/api";

const UserRankContainer = ({ userNo, category4No, style }) => {
  const [rank, setRank] = useState(null);

  // 유저의 랭크 조회
  useEffect(() => {
    let isCancelled = false;

    async function fetchRankByUser() {
      try {
        if (!isCancelled) {
          const result = await userApi.get(
            `/${userNo}/ranks/category/${category4No}`
          );
          if (!isCancelled) {
            setRank(result.data.rank);
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
        }
      }
    }

    if (userNo && category4No) {
      setRank(null);
      fetchRankByUser();
    }

    return function cleanup() {
      isCancelled = true;
    };
  }, [userNo, category4No]);

  return <SeasonCounter rank={rank} style={style} />;
};

UserRankContainer.propTypes = {
  userNo: PropTypes.number,
  category4No: PropTypes.number,
  isView: PropTypes.bool,
};

export default React.memo(UserRankContainer);
