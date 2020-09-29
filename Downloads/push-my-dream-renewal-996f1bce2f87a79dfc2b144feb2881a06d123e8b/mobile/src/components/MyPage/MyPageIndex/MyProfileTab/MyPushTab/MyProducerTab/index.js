import React, { useCallback } from "react";
import PropTypes from "prop-types";

import List from "components/Common/List";
import ProducerRanking from "components/Common/OrderedItem/ProducerRanking";

import { GRAY_COLOR, WHITE_COLOR, COLOR_696C8C } from "shared/constants/colors";

const MyProducerTab = ({ myProducer }) => {
  console.log(myProducer);
  const renderProducerItem = useCallback(
    (item, index) => (
      <ProducerRanking
        key={index}
        rank={item.ranking}
        profileSrc={item.USER.user_photo}
        nickname={item.USER.nickname}
        push={item.sum_push}
        ratio={item.ratio}
        big
      />
    ),
    []
  );

  return (
    <div>
      {myProducer && Boolean(myProducer.producerRankList.length) && (
        <div className="MyProducerTab_Header">
          <span className="MyProducerTab_Header_Title">프로듀서 수</span>
          <span className="MyProducerTab_Header_Count">
            {myProducer.producerRankList.length}
          </span>
        </div>
      )}
      <div className="MyProducerTab_Content">
        <List
          list={myProducer ? myProducer.producerRankList || [] : []}
          renderItem={renderProducerItem}
          empty={<div className="empty">받은 푸쉬가 없습니다.</div>}
        />
      </div>
      <style jsx>{`
        .MyProducerTab_Header .MyProducerTab_Header_Title {
          font-size: 16px;
          line-height: 20px;
          color: ${COLOR_696C8C};
        }
        .MyProducerTab_Header .MyProducerTab_Header_Count {
          font-size: 16px;
          line-height: 20px;
          margin-left: 10px;
          color: ${WHITE_COLOR};
        }

        .MyProducerTab_Content {
          padding: 20px 0;
        }
        .empty {
          text-align: center;
          color: ${COLOR_696C8C};
        }
      `}</style>
    </div>
  );
};

MyProducerTab.propTypes = {
  myProducer: PropTypes.shape({
    exPush: PropTypes.bool,
    producerRankList: PropTypes.array,
  }),
};

export default MyProducerTab;
