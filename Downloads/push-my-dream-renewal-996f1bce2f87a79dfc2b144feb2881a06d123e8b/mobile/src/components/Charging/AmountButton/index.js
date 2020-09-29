import React, { useMemo, useState, useCallback } from "react";
import NewButton from "components/Common/NewButton";

import circlePlus from "public/assets/icon/circle_plus(purple).svg";
import { COLOR_AE46E7 } from "shared/constants/colors";

const AmountButton = ({ children, onClick }) => {
  const [isActive, setIsAcitve] = useState(false);

  const innerClass = useMemo(
    () => `Amount${isActive ? " active" : ""}`,

    [isActive]
  );

  /**
   * 모바일용 터치 이벤트
   */
  const onTouchStart = useCallback(() => {
    console.log("ff");
    setIsAcitve(true);
  }, []);
  const onTouchEnd = useCallback(() => {
    console.log("zz");
    setIsAcitve(false);
  }, []);

  return (
    <NewButton onClick={onClick} bgColor="transparent" height="30px">
      <span
        className={innerClass}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <picture>
          <img className="circle_ico" src={circlePlus} alt="circle_plus" />
        </picture>
        <span>{children}</span>
      </span>
      <style jsx>{`
        .Amount {
          display: inline-block;
          vertical-align: middle;
          position: relative;
          font-size: 12px;
          color: #fff;
          margin: 0;
          text-align: center;
        }

        .Amount.active {
          color: ${COLOR_AE46E7};
        }

        .Amount:before {
          position: absolute;
          content: "";
          right: 0;
          bottom: 0;
          width: 0;
          height: 100%;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }
        .Amount:last-child:before {
          border: none;
        }
        .Amount > picture {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 15px;
          height: 15px;
        }
        .Amount > span {
          display: inline-block;
          vertical-align: middle;
          margin-left: 3px;
        }
      `}</style>
    </NewButton>
  );
};

export default AmountButton;
