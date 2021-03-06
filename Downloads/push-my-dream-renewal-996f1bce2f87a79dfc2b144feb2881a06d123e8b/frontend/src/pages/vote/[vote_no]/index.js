import React, { useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash/object";
import PropTypes from "prop-types";

import VoteIntro from "components/Vote/VoteIntro";
import SocialMeta from "components/Common/SocialMeta/SocialMeta";

import { voteApi } from "shared/api";
import moment from "moment";

const VoteIntroPage = ({ vote }) => {
  const router = useRouter();

  console.log(vote);

  useEffect(() => {
    if (!vote || !vote.STATUS.isOpened) {
      router.replace("/error");
      return;
    }

    if (vote.STATUS.isFinished) {
      router.replace("/vote/[vote_no]/result", `/vote/${vote.vote_no}/result`);
      return;
    }
  }, [vote, router]);

  // 투표가 존재하지않으면 투표 메인 화면으로 이동
  if (!vote || vote.STATUS.isFinished || !vote.STATUS.isOpened) {
    return null;
  }

  return (
    <>
      <SocialMeta
        title={`푸쉬 마이 드림 | ${vote.vote_title} | 투표 참여`}
        description={`${vote.vote_title} 투표하기 | ${vote.CATEGORY.title} | ${vote.SUBCATEGORY.title}`}
        image={vote.vote_cover_image}
        keywords={`khanteum,${vote.vote_title},${vote.CATEGORY.title},${vote.SUBCATEGORY.title}`}
      />
      <VoteIntro vote={vote} />
    </>
  );
};

VoteIntroPage.propTypes = {
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
};

VoteIntroPage.getInitialProps = async (context) => {
  const { vote_no } = context.query;
  try {
    let serverCondition = {};
    if (context.isServer) {
      const cookie = context.req.headers.cookie;

      if (cookie) {
        serverCondition = { headers: { cookie } };
      }
    }

    const {
      data: { vote },
    } = await voteApi.get(`/${vote_no}/summary`, {
      withCredentials: true,
      ...serverCondition,
    });

    return { vote };
  } catch (error) {
    console.error(error);
    return { voteNo: Number(vote_no) };
  }
};

export default VoteIntroPage;
