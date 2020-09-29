import React from "react";
import Helmet from "react-helmet";
import _ from "lodash/object";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import VoteItemContainer from "containers/Vote/VoteItemContainer";

import { voteApi } from "shared/api";
import LoginNotice from "components/Common/LoginNotice";
const VoteItem = ({ voteNo, vote, isVoted, isFinished }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      // 투표가 종료됬을시
      if (isFinished) {
        router.replace("/vote/[vote_no]/result", `/vote/${voteNo}/result`);
        return;
      }

      // 투표를 이미 진행하였으면 결과 페이지로 이동
      if (isVoted) {
        router.replace(`/vote/${voteNo}/result`);
        return;
      }

      // 투표가 존재하지않으면 투표 메인 화면으로 이동
      if (!vote) {
        router.replace("/vote/[vote_no]/result", `/vote/${voteNo}/result`);
        return;
      }
    }
  }, [router, isLoggedIn, isVoted, isFinished, vote, router]);

  if (isVoted || !vote || isFinished) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 투표하기</title>
        <meta
          name="description"
          content={`푸쉬 마이 드림 | ${vote.vote_title} 투표하기 `}
        />
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content={`khanteum,${vote.vote_title},${vote.CATEGORY.title},${
            vote.SUBCATEGORY.title
          },${vote.VOTE_ITEM_LIST.map((v) => v.vote_item_title)
            .join(",")
            .toString()}`}
        />
        <meta property="og:title" content={vote.vote_title} />
        <meta
          property="og:description"
          content={`${vote.vote_title} 투표하기 | ${vote.CATEGORY.title} | ${vote.SUBCATEGORY.title}`}
        />
        <meta property="og:image" content={vote.vote_cover_image} />
        <meta property="og:url" content="" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {!isLoggedIn ? <LoginNotice /> : <VoteItemContainer vote={vote} />}
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
    let result;
    if (context.isServer) {
      let serverCondition = {};
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
      result = await voteApi.get(`/${vote_no}/item`, {
        withCredentials: true,
        ...serverCondition,
      });
    } else {
      result = await voteApi.get(`/${vote_no}/item`, { withCredentials: true });
    }

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
