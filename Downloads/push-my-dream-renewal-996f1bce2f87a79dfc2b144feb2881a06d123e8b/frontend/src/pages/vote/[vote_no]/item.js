import React, { useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash/object";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import VoteItemContainer from "containers/Vote/VoteItemContainer";
import SocialMeta from "components/Common/SocialMeta/SocialMeta";

import { voteApi } from "shared/api";

const VoteItem = ({ voteNo, vote, isVoted, isFinished }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isAdmin } = useSelector((state) => state.common);
  const router = useRouter();

  useEffect(() => {
    // 투표가 종료됬을시
    if (isFinished) {
      router.replace("/vote/[vote_no]/result", `/vote/${voteNo}/result`);
      return;
    }

    // 관리자가 아닌 유저 로그인 체크
    if (!isAdmin && !isLoggedIn) {
      router.replace(`/login?redirect=/vote/${voteNo}/item`);
      return;
    }

    // 투표를 이미 진행하였으면 결과 페이지로 이동
    if (isVoted) {
      router.replace("/vote/[vote_no]/result", `/vote/${voteNo}/result`);
      return;
    }

    // 투표가 존재하지않으면 투표 메인 화면으로 이동
    if (!vote) {
      router.replace("/error");
      return;
    }
  }, [router, isLoggedIn, isVoted, isFinished, vote]);

  if ((!isAdmin && !isLoggedIn) || isVoted || !vote || isFinished) {
    return null;
  }

  return (
    <>
      <SocialMeta
        title={`푸쉬 마이 드림 | ${vote.vote_title} 투표하기 `}
        description={`${vote.vote_title} 투표하기 | ${vote.CATEGORY.title} | ${vote.SUBCATEGORY.title}`}
        image={vote.vote_cover_image}
        keywords={`khanteum,${vote.vote_title},${vote.CATEGORY.title},${
          vote.SUBCATEGORY.title
        },${vote.VOTE_ITEM_LIST.map((v) => v.vote_item_title)
          .join(",")
          .toString()}`}
      />
      <VoteItemContainer vote={vote} />
    </>
  );
};

VoteItem.propTypes = {
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
  isFinished: PropTypes.bool,
};

VoteItem.getInitialProps = async (context) => {
  const { vote_no } = context.query;

  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const result = await voteApi.get(`/${vote_no}/item`, {
      withCredentials: true,
      ...serverCondition,
    });

    return {
      voteNo: Number(vote_no),
      vote: _.has(result, "data.vote") ? result.data.vote : null,
      isVoted: _.has(result, "data.isVoted") && result.data.isVoted,
      isFinished: _.has(result, "data.isFinished") && result.data.isFinished,
    };
  } catch (error) {
    return { voteNo: Number(vote_no) };
  }
};

export default VoteItem;
