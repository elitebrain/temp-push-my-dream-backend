import React, { useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash/object";
import PropTypes from "prop-types";

import VoteResultContainer from "containers/Vote/VoteResultContainer";

import SocialMeta from "components/Common/SocialMeta/SocialMeta";

import { voteApi } from "shared/api";

const VoteResult = ({ voteNo, vote, isVoted }) => {
  const router = useRouter();

  useEffect(() => {
    // 투표를 진행하지 않았으면 투표 페이지로 이동
    if (!isVoted) {
      router.replace(`/vote/${voteNo}`);
      return;
    }

    // 투표가 존재하지않으면 투표 메인 화면으로 이동
    if (!vote) {
      router.replace("/error");
      return;
    }
  }, [router, isVoted, vote]);

  if (!isVoted && vote) {
    return (
      <SocialMeta
        title={`푸쉬 마이 드림 | ${vote.vote_title} 투표 결과 `}
        description={`${vote.vote_title} 투표 결과 | ${vote.CATEGORY.title} | ${vote.SUBCATEGORY.title}`}
        image={vote.vote_cover_image}
        keywords={`khanteum,${vote.vote_title},${vote.CATEGORY.title},${vote.SUBCATEGORY.title}`}
      />
    );
  }

  return (
    <>
      <SocialMeta
        title={`푸쉬 마이 드림 | ${vote.vote_title} | 투표 결과`}
        description={`${vote.vote_title} 투표 결과 | ${vote.CATEGORY.title} | ${vote.SUBCATEGORY.title}`}
        image={vote.vote_cover_image}
        keywords={`khanteum,${vote.vote_title},${vote.CATEGORY.title},${
          vote.SUBCATEGORY.title
        },${vote.VOTE_ITEM_LIST.map((v) => v.vote_item_title)
          .join(",")
          .toString()}`}
      />

      <VoteResultContainer vote={vote} />
    </>
  );
};

VoteResult.propTypes = {
  vote: PropTypes.shape({
    vote_title: PropTypes.string,
    vote_cover_image: PropTypes.string,
    CATEGORY: PropTypes.shape({
      title: PropTypes.string,
    }),
    SUBCATEGORY: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  voteNo: PropTypes.number,
  isVoted: PropTypes.bool,
};

VoteResult.getInitialProps = async (context) => {
  const { vote_no } = context.query;

  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const result = await voteApi.get(`/${vote_no}/result`, {
      withCredentials: true,
      ...serverCondition,
    });

    return {
      voteNo: Number(vote_no),
      vote: _.has(result, "data.vote") ? result.data.vote : null,
      isVoted: _.has(result, "data.isVoted") && result.data.isVoted,
    };
  } catch (error) {
    return { voteNo: Number(vote_no) };
  }
};

export default VoteResult;
