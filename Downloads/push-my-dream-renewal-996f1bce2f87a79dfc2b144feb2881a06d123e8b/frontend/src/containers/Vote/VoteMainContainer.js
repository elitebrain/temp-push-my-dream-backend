import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import VoteMain from "components/Vote/VoteMain";
import { voteApi } from "shared/api";
import { getError } from "shared/functions";
import { OPEN_MODAL } from "store/reducers/modal";

const VoteMainContainer = () => {
  const dispatch = useDispatch();
  const [voteList, setVoteList] = useState([]);

  useEffect(() => {
    async function getVoteList() {
      try {
        const result = await voteApi.get("/");

        if (result.status === 200) {
          setVoteList(result.data.voteList);
        }
      } catch (error) {
        dispatch({ type: OPEN_MODAL, data: { content: getError(error) } });
      }
    }

    getVoteList();
  }, [dispatch]);

  return <VoteMain voteList={voteList} />;
};

export default VoteMainContainer;
