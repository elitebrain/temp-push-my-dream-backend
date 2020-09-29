import React from "react";
import Helmet from "react-helmet";
import ParticipationContainer from "containers/Contest/ParticipationContainer";

const Participation = () => {
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 | 참가 하기</title>
      </Helmet>
      <ParticipationContainer />
    </>
  );
};

export default Participation;
