import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
// import { FiCheckCircle } from "react-icons/ai";

import arrow from "public/assets/icon/arrow_right_ico(purple).svg";
import check_active from "public/assets/icon/terms_check_ico(black).svg";
import check_none from "public/assets/icon/terms_check_ico(gray).svg";

import Terms from "pages/terms";
import { useRouter } from "next/router";
import { OPEN_MODAL } from "store/reducers/modal";
import { userApi } from "shared/api";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

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

  // const _termsModalOpen = (gubun) => {
  //   switch (gubun) {
  //     case "이용 약관":
  //       return setGubunProps("service");
  //     case "개인정보 처리 방침":
  //       return setGubunProps("privacy");
  //     case "에머겐자 이용 약관":
  //       return setGubunProps("emergenza");
  //     case "청소년 보호 정책":
  //       return setGubunProps("youth");
  //     default:
  //       return setGubunProps("service");
  //   }
  // };

  const _termsModalOpen = (gubun) => {
    // window.onpopstate = () => _termsModalClose();
    switch (gubun) {
      case "이용 약관":
        return "/terms?gubun=service";

      case "개인정보 처리 방침":
        return "/terms?gubun=privacy";

      case "에머겐자 이용 약관":
        return "/terms?gubun=emergenza";

      case "청소년 보호 정책":
        return "/terms?gubun=youth";
      default:
        return "/terms?gubun=service";
    }
  };
  const _termsModalClose = () => {
    setGubunProps(null);
  };
  console.log("termsList", termsList);
  return (
    <div className="terms_agree">
      <div className="content">
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
                      {
                        termsState[termIndex] ? (
                          <div className="check_active">
                            <img
                              src={check_active}
                              alt=""
                              width="17px"
                              height="17px"
                            />
                          </div>
                        ) : (
                          <div className="check_none">
                            <img
                              src={check_none}
                              alt=""
                              width="17px"
                              height="17px"
                            />
                          </div>
                        )
                        // <img
                        //   src={termsState[termIndex] ? check : check_none}
                        //   alt=""
                        //   width="18px"
                        //   height="20px"
                        // />
                      }
                    </label>
                    <Link href={_termsModalOpen(terms.terms_gubun)}>
                      <span
                        className="title"
                        // onClick={() => _termsModalOpen(terms.terms_gubun)}
                      >
                        {terms.terms_gubun}
                      </span>
                    </Link>
                    <span>에 동의합니다.</span>
                    <span className="essential">(필수)</span>
                  </div>
                </li>
              ))}
        </ul>
      </div>
      <div className="sign_up_footer">
        <button onClick={onNext}>
          <span>다음</span>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
      {gubunProps && (
        <div className="modal_rectangle">
          <div
            className="modal__overlay"
            onClick={() => _termsModalClose()}
          ></div>
          <div className="modal__content push_modal">
            <Terms gubunProps={gubunProps} modal />
          </div>
        </div>
      )}
      <style jsx>{`
        .terms_agree {
          /* width: 495px; */
          width: 100%;
          margin: 0 auto;
        }
        .input_chk {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #c0c5df 86.46%,
            #c0c5df 100%
          );
          border-radius: 18px;
          margin-bottom: 20px;
          text-align: left;
          font-size: 14px;
        }

        .content {
          width: 100%;
          height: 200px;
          margin-bottom: 20px;
        }
        .input_chk.emergenza {
          background-color: #444455;
          color: #fff;
        }
        input[type="checkbox"] {
          opacity: 0;
        }
        .title {
          font-weight: bold;
          /* margin-right: 6px; */
        }
        .essential {
          color: #979cca;
        }
        .input_chk span {
          display: inline-block;
          /* text-decoration: underline; */
          vertical-align: middle;
          /* color: #3b3d55; */
          line-height: 17px;
        }
        span:hover {
          cursor: pointer;
        }
        label {
          position: relative;
          line-height: 17px;
          /* font-size: 15px; */
        }
        label div {
          width: 17px;
          height: 17px;
          line-height: 17px;
          display: inline-block;
          margin-right: 7px;
          vertical-align: middle;
          cursor: pointer;
        }
        label .check_active {
          color: #737eef;
        }
        label .check_none {
          color: #999899;
        }
         {
          /* label img {
          line-height: 10px;
          display: inline-block;
          margin-right: 7px;
          vertical-align: middle;
          cursor: pointer;
        } */
        }
        label span {
          vertical-align: middle;
        }
        li {
          margin-top: 24px;
          list-style-type: none;
        }
         {
          /* label {
          font-size: 18px;
        } */
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
          text-align: center;
        }
        .sign_up_footer > button {
          border: 0;
          color: #979cca;
          font-weight: bold;
          background: none;
          font-size: 17px;
          cursor: pointer;
        }
        .sign_up_footer > button span {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .sign_up_footer > button img {
          width: 10px;
          height: 17px;
          display: inline-block;
          vertical-align: middle;
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
