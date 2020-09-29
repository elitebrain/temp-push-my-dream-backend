import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import RankerItem from "./RankerItem/RankerItem";
import Loader from "components/Common/Loader";
import List from "components/Common/List";
import Content from "components/Layout/Content";

import { COLOR_696C8C } from "shared/constants/colors";
import {
  IMAGE_SERVER,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from "shared/constants/variables";

const RankerList = ({ isProducer, tab, isLoadedList, list, category3No }) => {
  //  최적화
  const listMemo = useMemo(
    () =>
      list.map((user) => ({
        ...user,
        user_photo: `${IMAGE_SERVER}?file=${user.user_photo}&size=${AVATAR_WIDTH}x${AVATAR_HEIGHT}`,
      })),
    [list]
  );

  const renderList = useCallback(
    (item) => (
      <RankerItem
        key={item.user_no}
        category3No={category3No}
        isProducer={isProducer}
        tab={tab}
        rank={item.ranking}
        ranker={item}
        fluctuation={item.fluctuation}
      />
    ),
    [isProducer, tab, category3No]
  );

  return isLoadedList ? (
    <div className="loader_container">
      <Loader />
      <style jsx>{`
        .loader_container {
          width: 100%;
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  ) : (
    <div className="rankList_container">
      {listMemo && listMemo.length ? (
        <List list={listMemo} renderItem={renderList} />
      ) : (
        <div className="Empty">랭킹이 존재하지 않습니다.</div>
      )}

      <style jsx>{`
        .rankList_container {
          padding-bottom: 80px;
        }

        .Empty {
          padding-top: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: ${COLOR_696C8C};
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

RankerList.propTypes = {
  isLoadedList: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  category3No: PropTypes.number,
};

export default RankerList;
