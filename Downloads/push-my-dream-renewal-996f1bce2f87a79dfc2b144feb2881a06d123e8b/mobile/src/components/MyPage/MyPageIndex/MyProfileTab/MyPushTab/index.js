import React from "react";
import PropTypes from "prop-types";

import Loader from "components/Common/Loader";

import MyProducerTab from "./MyProducerTab";
import MyUsedPushTab from "./MyUsedPushTab";
import ReceivePushTab from "./ReceivePushTab";
import Tabs from "./Tabs";
import Content from "components/Layout/Content";
import { COLOR_696C8C } from "shared/constants/colors";

const MyPushTab = ({
  myProducer,
  receivePush,
  myPushs,
  isLoading,
  tab,
  onClickTab,
}) => {
  return (
    <div className="MyPushTab">
      {/* 탭 메뉴 */}
      <Content>
        <Tabs tab={tab} onClickTab={onClickTab} />
      </Content>
      {/* 바디 */}
      {isLoading ? (
        <div className="LoaderContainer">
          <Loader />
        </div>
      ) : (
        <div className="MyPushTab_Content">
          <Content>
            {tab === "myProducer" && <MyProducerTab myProducer={myProducer} />}
            {tab === "receivePush" && (
              <ReceivePushTab receivePush={receivePush} />
            )}
            {tab === "myPush" && <MyUsedPushTab myPushs={myPushs} />}
          </Content>
        </div>
      )}
      <style jsx>{`
        .MyPushTab {
          padding-top: 25px;
        }

        /* .MyPushTab .MyPushTab_Content {
          padding-bottom: 50px;
        } */
        .LoaderContainer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .empty {
          padding: 40px 0;
          font-size: 14px;
          line-height: 17px;
          color: ${COLOR_696C8C};
          text-align: center;
        }
      `}</style>
    </div>
  );
};

MyPushTab.propTypes = {
  tab: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  myProducer: PropTypes.object,
  myPushs: PropTypes.array,
};

export default MyPushTab;
