import React from "react";
import {
  COLOR_00FFFF,
  FONT_WHITE_COLOR,
  COLOR_FF00FF,
} from "shared/constants/colors";

/*
  fluctuation : 증감 숫자값
  noBorder : border 유무
  absolute : absolute 유무 -> default : absolute 처리시 우측 가운데로 고정
  top = "50%" - absolute 시  top 위치 default : 50%
  right = "0" - absolute 시  right 위치 default : 0
*/
const RankerFluctuations = ({
  fluctuation,
  noBorder,
  absolute,
  top = "50%",
  right = "0",
  onClick,
  textRight,
  style,
  ...rest
}) => {
  const up = fluctuation > 0;
  const down = fluctuation < 0;
  const same = fluctuation === 0;
  const newCondition = String(fluctuation).toLowerCase() === "new";

  const outterClassName = `ranker_count${noBorder ? " no_border" : ""}${
    absolute ? " absolute" : ""
  }`;

  const innerClassName = `${up ? "ico rank_up" : ""}${
    down ? "ico rank_down" : ""
  }`;

  return (
    <div className={outterClassName} onClick={onClick} style={style} {...rest}>
      <span className={innerClassName}>
        {up ? "▲" : down ? "▼" : same ? "-" : newCondition ? "New" : "-"}
      </span>
      {(up || down) && <span>{Math.abs(fluctuation)}</span>}
      <style jsx>{`
        .ranker_count {
          color: ${FONT_WHITE_COLOR};
          font-size: 14px;

          text-align: center;
        }

        .ranker_count.no_border {
          border: none;
        }

        .ranker_count.absolute {
          min-width: 24px;
          min-height: 18px;
          position: absolute;
          top: ${top};
          right: ${right};
          transform: translateY(-50%);
          padding: 0px 8px;
        }
        .ranker_count span {
          display: inline-block;
        }
        .ranker_count .ico {
          margin-right: 5px;
        }
        .ranker_count .ico.rank_down {
          color: ${COLOR_00FFFF};
        }
        .ranker_count .ico.rank_up {
          color: ${COLOR_FF00FF};
        }
      `}</style>
    </div>
  );
};

export default RankerFluctuations;

{
  /* <div className="ranker_count ">
          <span className="ico rank_down">▼</span> <span>1</span>
        </div> */
}
