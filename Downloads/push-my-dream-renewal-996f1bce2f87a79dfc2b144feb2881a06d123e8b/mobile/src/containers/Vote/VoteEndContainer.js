import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash/object";

import VoteEnd from "components/Vote/VoteMain/VoteEnd";
import { voteApi } from "shared/api";
import { OPEN_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";

const VoteEndContainer = () => {
  const dispatch = useDispatch();
  const [isLast, setIsLast] = useState(false);
  const [isLoadedVoteEndList, setLoadedVoteEndList] = useState(true);
  const [voteEndList, setVoteEndList] = useState([]);
  const [lastVoteId, setLastVoteId] = useState(0);

  useEffect(() => {
    onGetVoteEndList();
  }, []);

  // 종료된 투표 리스트 조회
  const onGetVoteEndList = useCallback(async () => {
    if (!isLast) {
      setLoadedVoteEndList(true);

      try {
        const result = await voteApi.get("/end", {
          params: {
            lastVoteId
          }
        });

        if (result.status === 200) {
          setLoadedVoteEndList(false);
          setIsLast(result.data.isLast);
          setVoteEndList([...voteEndList, ...result.data.voteEndList]);

          const lastEndVote =
            result.data.voteEndList[result.data.voteEndList.length - 1];

          if (_.has(lastEndVote, "vote_no")) {
            setLastVoteId(lastEndVote.vote_no);
          }
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: OPEN_MODAL, data: { content: getError(error) } });
      }
    }
  }, [isLast, lastVoteId, dispatch]);

  return (
    <VoteEnd
      isLast={isLast}
      isLoadedVoteEndList={isLoadedVoteEndList}
      voteEndList={voteEndList}
      onGetVoteEndList={onGetVoteEndList}
    />
  );
};

export default VoteEndContainer;
