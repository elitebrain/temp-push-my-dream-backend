import React, { useContext } from "react";
import { EmergenzaContext } from "components/Emergenza/Notice/EmergenzaNoticeComponent";

const BenefitMenu = () => {
  const { benefitMenu, setBenefitMenu } = useContext(EmergenzaContext);

  return (
    <div className="benefit_menu">
      <div
        className={`menu_btn ${benefitMenu === 1 ? "insert" : ""}`}
        onClick={() => setBenefitMenu(1)}
      >
        수상 혜택
      </div>
      <div
        className={`menu_btn ${benefitMenu === 2 ? "insert" : ""}`}
        onClick={() => setBenefitMenu(2)}
      >
        참여 혜택
      </div>
      <div
        className={`menu_btn ${benefitMenu === 3 ? "insert" : ""}`}
        onClick={() => setBenefitMenu(3)}
      >
        참여 방법
      </div>
      <style jsx>{`
        .benefit_menu {
          background-color: rgb(30, 30, 37);
          padding-top: 80px;
          text-align: center;
          margin-bottom: 35px;
        }
        .benefit_menu .menu_btn {
          width: 398px;
          /* width: 440px; */
          height: 60px;
          line-height: 60px;
          display: inline-block;
          color: #fff;
          background-color: #15151a;
          text-align: center;
          font-size: 18px;
          cursor: pointer;
        }
         {
          /* .benefit_menu .menu_btn:nth-child(2) {
            border-left: 2px solid #111115;
            border-right: 2px solid #111115;
          } */
        }

        .benefit_menu .menu_btn:hover,
        .benefit_menu .insert {
          background-color: #f38400;
        }
      `}</style>
    </div>
  );
};

export default BenefitMenu;
