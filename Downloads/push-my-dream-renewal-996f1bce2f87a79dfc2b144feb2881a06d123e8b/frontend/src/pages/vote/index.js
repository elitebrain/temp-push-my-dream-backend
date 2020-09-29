import React from "react";
import Helmet from "react-helmet";

import VoteMainContainer from "containers/Vote/VoteMainContainer";

import SocialMeta from "components/Common/SocialMeta/SocialMeta";

const Vote = () => {
  return (
    <>
      <SocialMeta
        title={`푸쉬 마이 드림 | 투표 목록`}
        description="푸쉬 마이 드림 | 투표 목록"
        keywords="khanteum,푸쉬 마이 드림,투표 목록"
      />
      <VoteMainContainer />
    </>
  );
};

export default Vote;
