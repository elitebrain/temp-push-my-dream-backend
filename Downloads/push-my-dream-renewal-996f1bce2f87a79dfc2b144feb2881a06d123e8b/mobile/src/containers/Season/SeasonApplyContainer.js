import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import SeasonApply from "components/Season/SeasonApply";
import SeasonApplyTemp from "components/Season/SeasonApplyTemp";
import NewButton from "components/Common/NewButton";

import { OPEN_MODAL, CLOSE_MODAL } from "store/reducers/modal";
import { categoryApi } from "shared/api";
import { getError } from "shared/functions";
import {
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  WHITE_COLOR,
  COLOR_696C8C,
  GRADIENT_FFFFFF_C0C5DF,
} from "shared/constants/colors";

const SeasonApplyContainer = ({ season }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [type, setType] = useState("");
  const [isCompolete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorCode, setErrorCode] = useState(false);

  // 에러 메세지 호출
  useEffect(() => {
    if (errorMessage) {
      if (errorCode === 421) {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: (
              <p>
                이미 참가 중입니다.
                <br /> 영상을 업로드 하시겠습니까?
              </p>
            ),
            isViewClose: true,
            onConfirm() {
              Router.push("/upload");
            },
            onClose() {
              Router.back();
            },
          },
        });
      } else {
        dispatch({
          type: OPEN_MODAL,
          data: {
            content: errorMessage,
            isViewClose: false,
            onConfirm() {
              Router.back();
            },
            onClose() {
              Router.back();
            },
          },
        });
      }
    }
  }, [errorMessage, errorCode]);

  /**
   * 성공 모달에서 확인버튼 클릭
   */

  const onComplete = useCallback(() => {
    Router.push("/upload");
  }, [Router]);

  /**
   * 참가 신청
   */
  const onApplySeason = useCallback(
    (type) => {
      /**
       * 일반 사용자로 참가
       */

      let contentType = "";
      switch (type) {
        case "normal": {
          contentType = "일반 사용자";
          break;
        }
        case "artist": {
          contentType = "아티스트";
          break;
        }
        default: {
          break;
        }
      }

      dispatch({
        type: OPEN_MODAL,
        data: {
          content: `${contentType}로 대회를 참가하시겠습니까?`,

          onConfirm: (function () {
            // 중복 클리 방지 변수
            let preventDuplicateClick = false;
            return async function () {
              // 광클 방지
              if (!preventDuplicateClick) {
                preventDuplicateClick = true;

                try {
                  await categoryApi.post(
                    `/seasons/${season.category_level3_no}`,
                    { type },
                    {
                      withCredentials: true,
                    }
                  );
                  setType(contentType);
                  setIsComplete(true);
                  dispatch({
                    type: CLOSE_MODAL,
                  });
                } catch (error) {
                  console.log(error);
                  setErrorCode(
                    error && error.response && error.response.status
                  );
                  setErrorMessage(error);
                }
              }
            };
          })(),
        },
      });
    },
    [season, dispatch, season]
  );

  return isCompolete ? (
    <div className="ApplySeasonComplete">
      <div className="ApplySeasonComplete_Container">
        <div className="Title">
          <strong>{type}</strong> 로<br />
          신청 완료되었습니다.
        </div>
        <div className="Noti">
          ※ 신청 정보는 ‘나의 프로필’에서
          <br />
          수정 할 수 있습니다.
        </div>
        <div className="Button">
          <NewButton
            width="100px"
            height="40px"
            borderRadius="30px"
            bgImage={GRADIENT_FFFFFF_C0C5DF(180)}
            color={COLOR_696C8C}
            onClick={onComplete}
          >
            확인
          </NewButton>
        </div>
      </div>
      <style jsx>{`
        .ApplySeasonComplete {
          width: 100vw;
          height: 100vh;
          background-color: ${BACKGROUND_BLACK_COLOR};

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .ApplySeasonComplete_Container {
          border-radius: 10px;
          width: 280px;
          height: 300px;
          border: solid 1px transparent;
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
        }

        .ApplySeasonComplete_Container .Title {
          text-align: center;
          font-size: 16px;
          line-height: 20px;
          color: ${WHITE_COLOR};
          margin-top: 80px;
        }

        .ApplySeasonComplete_Container .Title strong {
          font-weight: bold;
        }

        .ApplySeasonComplete_Container .Noti {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
        }

        .ApplySeasonComplete_Container .Button {
          margin-top: 30px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  ) : (
    // <SeasonApply onApplySeason={onApplySeason} season={season} />
    <SeasonApplyTemp onApplySeason={onApplySeason} season={season} />
  );
};

SeasonApplyContainer.propTypes = {
  season: PropTypes.shape({
    category_level3_no: PropTypes.number,
  }),
};

export default SeasonApplyContainer;
