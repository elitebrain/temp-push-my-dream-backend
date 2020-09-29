import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import PushNotice from "components/Common/UserProfile/UserInfoWrapper/PushNotice";
import PushDetail from "components/Common/UserProfile/UserInfoWrapper/PushDetail";

import { userApi } from "shared/api";

const UserPushContainer = ({ isPush, userNo, category4No }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [exPush, setExPush] = useState(false);
  const [myRank, setMyRank] = useState(null);
  const [totalPush, setTotalPush] = useState(null);
  const [producerRankList, setProducerRankList] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    if (userNo) {
      if (!isCancelled) {
        if (category4No) {
          setIsLoaded(false);
          fetchSeasonRankByUser();
        } else {
          setIsLoaded(true);
        }
      }
    }

    async function fetchSeasonRankByUser() {
      try {
        if (!isCancelled) {
          const {
            data: { exPush: _expush, myRank, total_push, producerRankList },
          } = await userApi.get(
            `/${userNo}/ranks/season/${category4No}/producer`,
            {
              params: {
                limit: 3,
              },
              withCredentials: true,
            }
          );

          // 받은 푸쉬가 존재하면 프로듀서 정보도 같이 가져온다.
          if (_expush) {
            if (!isCancelled) {
              setExPush(_expush);
              setMyRank(myRank);
              setTotalPush(total_push);
              setProducerRankList(producerRankList);
            }
          } else {
            if (!isCancelled) {
              setExPush(_expush);
            }
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.log("error", isCancelled);
          console.error(error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoaded(true);
        }
      }
    }

    return function cleanup() {
      isCancelled = true;
    };
  }, [category4No, userNo]);

  return (
    <div className="UserPushContainer">
      {isLoaded &&
        (exPush ? (
          <PushDetail
            isPush={isPush}
            myRank={myRank}
            totalPush={totalPush}
            producerRankList={producerRankList}
            category4No={category4No}
          />
        ) : (
          <PushNotice isPush={isPush} category4No={category4No} />
        ))}
      <style jsx>{`
        .UserPushContainer {
          height: 120px;
          background: linear-gradient(180deg, #2f3354 -27.85%, #040221 68.61%);
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

UserPushContainer.propTypes = {
  userNo: PropTypes.number,
  category4No: PropTypes.number,
  isPush: PropTypes.bool,
};

export default React.memo(UserPushContainer);
