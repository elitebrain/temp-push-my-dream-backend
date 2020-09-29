import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import UserAwardsComponent from "components/Common/Awards/UserAwardsComponent";
import Loader from "components/Common/Loader";
import { userApi } from "shared/api";
import { COLOR_696C8C } from "shared/constants/colors";

const AwardsContainer = ({ userNo }) => {
  // 현재 참여중인 시즌이 존재한다면 true
  const [isLoading, setIsLoading] = useState(true);
  const [awardList, setAwardList] = useState([]);

  useEffect(() => {
    if (userNo) {
      setIsLoading(true);
      fetchUserAwards();
    }

    // 유저의 수상내역 조회
    async function fetchUserAwards() {
      try {
        const result = await userApi.get(`/${userNo}/awards`);

        setAwardList(result.data.awardList);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  }, [userNo]);

  // 로딩 중일 시
  if (isLoading) {
    return (
      <div className="LoaderContainer">
        <Loader />
        <style jsx>{`
          .LoaderContainer {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }

  /**
   * 시즌 미참가 시 멘트 출력
   */
  // if (!Boolean(category3No)) {
  //   return (
  //     <div className="AwardNotice">
  //       <p>참가했던 Season에서</p>
  //       <p>높은 순위를 얻었던</p>
  //       <p>기록을 보여줍니다.</p>

  //       <style jsx>{`
  //         .AwardNotice {
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center;
  //           align-items: center;
  //           width: 100%;
  //           height: 300px;
  //           text-align: center;
  //           font-size: 18px;
  //           color: ${COLOR_696C8C};
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  /**
   * 수상 내역 미존재
   */
  if (!awardList.length) {
    return (
      <div className="AwardNotice">
        수상 내역이 없습니다.
        <style jsx>{`
          .AwardNotice {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 300px;
            line-height: 300px;
            text-align: center;
            font-size: 18px;
            color: ${COLOR_696C8C};
          }
        `}</style>
      </div>
    );
  }

  return <UserAwardsComponent awardList={awardList} />;
};

AwardsContainer.propTypes = {
  userNo: PropTypes.number,
};

export default AwardsContainer;
