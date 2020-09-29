import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import VoteItem from "components/Vote/VoteItem";
import { OPEN_MODAL } from "store/reducers/modal";
import { getError } from "shared/functions";
import { voteApi } from "shared/api";

const VoteItemContainer = ({ vote }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.common);
  const [voteList, setVoteList] = useState([]);

  // 투표 항목 체크
  const onCheckItem = useCallback(
    ({ itemNo, checked }) => {
      // 현재상태 : 체크 되어있는 상태
      if (checked) {
        setVoteList((prev) => prev.filter((v) => v !== itemNo));
      }

      // 형재상테 : 미체크 되어 있는 상태
      else {
        // 투표 최대 허용 수 체크
        // 1을 더한 이유는 항목 체크시 가정
        if (voteList.length + 1 > vote.vote_max_count) {
          return dispatch({
            type: OPEN_MODAL,
            data: {
              content: `최대 ${vote.vote_max_count}개 까지 선택 가능합니다.`,
            },
          });
        }

        setVoteList((prev) => [...prev, itemNo].sort((a, b) => a - b));
      }
    },
    [vote, voteList, dispatch]
  );

  // 투표 완료
  const onVote = useCallback(async () => {
    try {
      if (isAdmin) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "관리자 모드로 투표를 진행할 수 없습니다.",
          },
        });
      }

      // 항목이 선택되있지 않을 시
      if (!voteList.length) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "항목을 체크하고 투표를 진행해주세요.",
          },
        });
      }

      // 선택된 항목 갯수가 최소 혀용 횟수보다 작을 시
      if (vote.vote_min_count > voteList.length) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: `${vote.vote_min_count}개 이상 선택해주세요.`,
          },
        });
      }

      dispatch({
        type: OPEN_MODAL,
        data: {
          content: "투표 완료 후에는 수정이 불가능합니다.",
          isViewClose: true,
          async onConfirm() {
            const result = await voteApi.post(
              `/${vote.vote_no}`,
              { voteList, voteNo: vote.vote_no },
              { withCredentials: true }
            );

            if (result.status === 200) {
              router.replace(
                "/vote/[vote_no]/result",
                `/vote/${vote.vote_no}/result`
              );
            }
          },
        },
      });
    } catch (error) {
      dispatch({
        type: OPEN_MODAL,
        data: {
          content: getError(error),
        },
      });
    }
  }, [dispatch, isAdmin, voteList, vote, router]);

  return (
    <VoteItem
      voteList={voteList}
      vote={vote}
      onVote={onVote}
      onCheckItem={onCheckItem}
    />
  );
};

VoteItemContainer.propTypes = {
  vote: PropTypes.shape({
    vote_no: PropTypes.number,
    vote_min_count: PropTypes.number,
    vote_max_count: PropTypes.number,
  }),
};

export default VoteItemContainer;
