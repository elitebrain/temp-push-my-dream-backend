import React, { useState } from "react";
import PropTypes from "prop-types";

import check from "public/assets/icon/check.svg";
import check_none from "public/assets/icon/check_none.svg";
import Terms from "pages/terms";

const TermsAgree = (props) => {
  const {
    emergenza,
    termsState,
    handleTermsChange,
    visible,
    termsList,
  } = props;
  const [detail, setDetail] = useState(null);
  const [gubunProps, setGubunProps] = useState(null);
  const _termsModalOpen = (gubun) => {
    switch (gubun) {
      case "이용 약관":
        return setGubunProps("service");
      case "개인정보 처리 방침":
        return setGubunProps("privacy");
      case "에머겐자 이용 약관":
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
    <div className={`terms_agree${visible ? " visible" : ""}`}>
      <ul>
        {termsList &&
          termsList
            .filter((v, i) => i !== 2)
            .map((terms, termIndex) => (
              <li key={terms.terms_no} key={termIndex}>
                <div className={`input_chk${emergenza ? " emergenza" : ""}`}>
                  <input
                    type="checkbox"
                    id={terms.id}
                    value={termsState[terms.id]}
                    onChange={handleTermsChange}
                  />
                  <label htmlFor={terms.id}>
                    {termsState[terms.id] ? (
                      <img src={check} alt="" width="18px" height="20px" />
                    ) : (
                      <img src={check_none} alt="" width="18px" height="20px" />
                    )}
                  </label>
                  <em onClick={() => _termsModalOpen(terms.terms_gubun)}>
                    {terms.terms_gubun}
                  </em>
                  <span>에 동의합니다.(필수)</span>
                </div>
              </li>
            ))}
      </ul>
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
          visibility: hidden;
          height: 0;
        }
        .terms_agree.visible {
          visibility: visible;
          height: auto;
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
