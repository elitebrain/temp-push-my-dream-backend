import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

import SeasonIndex from "components/Season/SeasonIndex";

import { categoryApi } from "shared/api";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const SeasonPage = ({ openedParticipationSeasons }) => {
  console.log(openedParticipationSeasons);
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 참가 신청 하기</title>
      </Helmet>
      <DynamicNewLayout transparent whiteText>
        <SeasonIndex openedParticipationSeasons={openedParticipationSeasons} />
      </DynamicNewLayout>
    </>
  );
};

SeasonPage.propTypes = {
  openedParticipationSeasons: PropTypes.array,
};

SeasonPage.getInitialProps = async (context) => {
  try {
    const {
      data: { openedParticipationSeasons },
    } = await categoryApi.get("/open/seasons");

    return {
      openedParticipationSeasons,
    };
  } catch (error) {
    console.error(error);
    return {
      openedParticipationSeasons: [],
    };
  }
};

export default SeasonPage;
