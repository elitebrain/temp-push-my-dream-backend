import React, { useState } from "react";
import Terms from "pages/terms";

const Footer = (props) => {
  const { footerNone } = props;
  const [gubunProps, setGubunProps] = useState(null);
  const _termsModalOpen = (gubun) => {
    setGubunProps(gubun);
  };
  const _termsModalClose = () => {
    setGubunProps(null);
  };
  return (
    <div className={`container_footer ${footerNone ? "footerNone" : ""}`}>
      <div className="wrapper_footer">
        <div className="terms">
          <span onClick={() => _termsModalOpen("service")}>이용약관</span>
          <span onClick={() => _termsModalOpen("privacy")}>
            개인정보처리방침
          </span>
          <span onClick={() => _termsModalOpen("emergenza")}>
            에머겐자 이용약관
          </span>
          <span onClick={() => _termsModalOpen("youth")}>청소년보호정책</span>
        </div>
        <div className="content">
          <span>(주)칸컴스</span>
          <span>
            주소: 서울시 구로구 디지털로 32가길 25 티타운 빌딩 301호 칸스튜디오
          </span>
          <span>대표자명: 양홍선, 류석구</span>
          <span>사업자번호: 618-81-25795</span>
        </div>
        <div className="content">
          <span>통신판매업: 제2019-서울구로-0472호</span>
          <span>이메일: contact@pushmydream.com</span>
          <span>연락처: 02-6101-9285</span>
        </div>
        <div className="content">
          <span>ⓒ2020 (주)칸컴스</span>
        </div>
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
        .container_footer {
          width: 100%;
          min-width: 1366px;
          height: 216px;
          background-color: #141418;
          box-sizing: border-box;
          border-top: 1px solid rgba(255, 255, 255, 0.4);
        }
        .container_footer.footerNone {
          display: none;
        }
        .wrapper_footer {
          width: 1200px;
          margin: auto;
        }
        .terms {
          font-size: 18px;
          color: #fff;
          padding-top: 30px;
          padding-bottom: 20px;
        }
        .terms > span {
          display: inline-block;
          margin: 0 13px;
        }
        .terms > span:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        .content {
          font-size: 15px;
          color: #b2b2b2;
          margin-bottom: 6px;
        }
        .content > span {
          position: relative;
          display: inline-block;
          padding: 0 13px;
        }
        .content > span:before {
          position: absolute;
          content: "";
          right: -1px;
          border-left: 1px solid #2b2b31;
          border-right: 1px solid #565660;
          height: 13px;
          top: 50%;
          transform: translateY(-50%);
        }
        .content > span:last-child:before {
          border-right: none;
          border-left: none;
        }
      `}</style>
    </div>
  );
};

export default Footer;
