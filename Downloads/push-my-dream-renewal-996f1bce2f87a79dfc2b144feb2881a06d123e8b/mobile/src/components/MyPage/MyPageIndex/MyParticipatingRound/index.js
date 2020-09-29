import React from "react";
import PropTypes from "prop-types";

import NoPushRound from "./NoPushRound";
import PushRound from "./PushRound";

import {
  GRADIENT_2F3354_040221,
  FONT_WHITE_COLOR,
} from "shared/constants/colors";
import Content from "components/Layout/Content";

const MyParticipatingRound = ({ pushInRound, children }) => {
  return (
    <div className="MyParticipatingRound_container">
      <div className="MyParticipatingRound_Content">
        <Content>
          <h2 className="title">GET PUSH</h2>
          {pushInRound && !pushInRound.exPush && <NoPushRound />}
          {pushInRound && pushInRound.exPush && (
            <PushRound pushInRound={pushInRound} />
          )}
        </Content>
      </div>
      {children}
      <style jsx>{`
        .NoParticipatingRound_Button {
          display: block;
          margin: 0 20px 15px 20px;
        }
        .MyParticipatingRound_Content {
          width: 100%;
          padding: 20px 0;
          margin-bottom: 20px;
          background-image: ${GRADIENT_2F3354_040221(180)};
          height: 135px;

          box-sizing: border-box;
        }

        .MyParticipatingRound_container .title {
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          color: ${FONT_WHITE_COLOR};
        }
      `}</style>
    </div>
  );
};

MyParticipatingRound.propTypes = {
  children: PropTypes.node,
  isParticipate: PropTypes.bool,
  pushInRound: PropTypes.shape({
    exPush: PropTypes.bool,
  }),
};

export default MyParticipatingRound;
