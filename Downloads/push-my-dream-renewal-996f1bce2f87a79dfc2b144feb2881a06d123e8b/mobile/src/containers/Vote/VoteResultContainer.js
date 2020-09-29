import React from "react";
import PropTypes from "prop-types";

import VoteResult from "components/Vote/VoteResult";

const VoteResultContainer = ({ vote }) => {
  return <VoteResult vote={vote} />;
};

VoteResultContainer.propTypes = {
  vote: PropTypes.object
};

export default VoteResultContainer;
