import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import check from "public/assets/icon/check.svg";
import check_none from "public/assets/icon/check_none.svg";
import Terms from "pages/terms";
import { useRouter } from "next/router";
import { OPEN_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";

const expandTermList = [
  { id: "termsService" },
  { id: "termsPrivacy" },
  { id: "termsCharge" },
  { id: "termsYouth" },
];

const TermsAgree = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const { termsList } = useSelector((state) => state.common);

  const [termsState, setTermState] = useState([false, false, false]);
  const [gubunProps, setGubunProps] = useState(null);

  const changeTermState = useCallback(
    (termIndex) => {
      const changeList = [...termsState];

      changeList[termIndex] = !changeList[termIndex];

      setTermState(changeList);
    },
    [termsState]
  );

  const onNext = useCallback(async () => {
    try {
      if (termsState.filter((v) => !v).length > 0) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "약관에 동의하세요.",
            isViewClose: false,
          },
        });
      }

      // 세션 등록
      await userApi.post(
        "/mobile/session/terms",
        {},
        { withCredentials: true }
      );

      Router.push("/signup/login");
    } catch (error) {
      console.error(error);
    }
  }, [Router, termsState]);

  const _termsModalOpen = (gubun) => {
    switch (gubun) {
      case "이용 약관":
        return setGubunProps("service");
      case "개인정보 처리 방침":
        return setGubunProps("privacy");
      case "에머겐자":
        return setGubunProps("emergenza");
      case "청소년 보호 정책":
        return setGubunProps("youth");
      default:
        return setGubunProps("service");
    }
  };
  const _termsModalClose = () => {
    setGubunProps(null);
  };

  return (
    <div className="terms_agree">
      <ul>
        {termsList &&
          termsList
            .filter((v, i) => i !== 2)
            .map((term, index) => ({
              ...term,
              ...expandTermList[index],
            }))
            .map((terms, termIndex) => (
              <li key={terms.terms_no} key={termIndex}>
                <div className="input_chk">
                  <input
                    type="checkbox"
                    id={terms.id}
                    checked={termsState[termIndex]}
                    onChange={changeTermState.bind(this, termIndex)}
                  />
                  <label htmlFor={terms.id}>
                    <img
                      src={termsState[termIndex] ? check : check_none}
                      alt=""
                      width="18px"
                      height="20px"
                    />
                  </label>
                  <em onClick={() => _termsModalOpen(terms.terms_gubun)}>
                    {terms.terms_gubun}
                  </em>
                  <span>에 동의합니다.(필수)</span>
                </div>
              </li>
            ))}
      </ul>
      <div className="sign_up_footer">
        <button onClick={onNext}>다음</button>
      </div>
      {gubunProps && (
        <div className="modal_rectangle">
          <div
            className="modal__overlay"
            onClick={() => _termsModalClose()}
          ></div>
          <div className="modal__content">
            <Terms gubunProps={gubunProps} />
          </div>
        </div>
      )}
      <style jsx>{`
        .terms_agree {
          width: 495px;
          margin: 0 auto;
        }

        .input_chk {
          width: 495px;
          height: 60px;
          line-height: 60px;
          background-color: #fff;
          border-radius: 20px;
          margin-bottom: 20px;
          text-align: left;
        }
        .input_chk.emergenza {
          background-color: #444455;
          color: #fff;
        }
        input[type="checkbox"] {
          opacity: 0;
        }
        em {
          font-weight: 700;
          text-decoration: underline;
          vertical-align: middle;
          margin-right: 6px;
        }
        em:hover {
          cursor: pointer;
        }
        label {
          position: relative;
          font-size: 18px;
        }
        label img {
          line-height: 20px;
          display: inline-block;
          margin-right: 23px;
          margin-left: 10px;
          vertical-align: middle;
          cursor: pointer;
        }
        label span {
          vertical-align: middle;
        }
        li {
          margin-top: 24px;
          list-style-type: none;
        }
        label {
          font-size: 18px;
        }
        .terms_box {
          padding: 6px 12px;
          background-color: #fff;
          margin: 6px 0;
          border: 1px solid #bbb;
          height: 100px;
          overflow: auto;
        }
        .sign_up_footer {
          width: 100%;
          margin-top: 48px;
          height: 55px;
          text-align: center;
        }
        .sign_up_footer > button {
          width: 87px;
          height: 45px;
          line-height: 45px;
          border-radius: 50px;
          background-color: #f38400;
          border: 0;
          color: #eee;
          font-size: 16px;
          margin-right: 20px;
          cursor: pointer;
        }
      `}</style>
      {/* DB terms TABLE terms_contents에 tag포함 데이터 저장, 
      불러온 data는 dangerouslySetInnerHTML로 tag적용
      style global 필요 */}
      <style jsx global>{`
        .article {
          color: #111;
        }
        .article h3 {
          font-size: 18px;
          margin: 12px 0;
        }
        .article p {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

TermsAgree.propTypes = {
  termsState: PropTypes.object,
  handleTermsChange: PropTypes.func,
  visible: PropTypes.bool,
  termsList: PropTypes.array,
};

export default TermsAgree;
