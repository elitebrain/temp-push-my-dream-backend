import React from "react";
import Helmet from "react-helmet";
import VoteMainContainer from "containers/Vote/VoteMainContainer";

const Vote = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 투표 목록</title>
        <meta name="description" content="푸쉬 마이 드림 | 투표 목록" />
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content="khanteum,푸쉬 마이 드림,투표 목록" />
        <meta property="og:title" content="푸쉬 마이 드림 | 투표 목록" />
        <meta property="og:description" content="푸쉬 마이 드림 | 투표 목록" />
        {/* <meta property="og:image" content={vote.vote_cover_image_mobile} /> */}
        {/* <meta property="og:url" content="" /> */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <VoteMainContainer />
    </>
  );
};

export default Vote;
