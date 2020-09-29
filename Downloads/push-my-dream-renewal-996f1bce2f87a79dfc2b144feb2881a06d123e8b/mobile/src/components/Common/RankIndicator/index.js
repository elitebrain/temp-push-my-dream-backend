import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import { WHITE_COLOR, GRAY_COLOR } from "shared/constants/colors";

const RankIndicator = ({ category3No }) => {
  const linkHrefCache = useCallback(
    (userType) => {
      const query = Object.assign(
        {},
        {
          category3No,
          userType,
        }
      );

      Object.keys(query).forEach((key) =>
        query[key] === undefined ? delete query[key] : {}
      );
      return {
        pathname: "/ranking",
        query,
      };
    },
    [category3No]
  );

  const dreamerLinkHrefCache = useMemo(() => linkHrefCache("dreamer"), []);
  const producerLinkHrefCache = useMemo(() => linkHrefCache("producer"), []);

  return (
    <div className="RankIndicator">
      <Link href={dreamerLinkHrefCache}>
        <a>
          <div className="RankIndicator_Tab">
            <span>베스트 푸쉬</span>
          </div>
        </a>
      </Link>
      <Link href={producerLinkHrefCache}>
        <a>
          <div className="RankIndicator_Tab">
            <span>베스트 프로듀서</span>
          </div>
        </a>
      </Link>
      <style jsx>{`
        a {
          text-decoration: none;
        }

        .RankIndicator {
          position: fixed;
          top: 195px;
          right: -117px;
          z-index: 100;
          display: flex;
          transform: rotate(90deg);
        }

        .RankIndicator .RankIndicator_Tab {
          position: relative;
          width: 130px;
          height: 50px;
          font-size: 14px;
          line-height: 17px;
          font-weight: bold;
          text-align: center;
          color: ${WHITE_COLOR};
          border-radius: 0px 0px 10px 10px;
          background: rgba(23, 27, 28, 0.4);
          border: 1px solid ${GRAY_COLOR};
          cursor: pointer;
        }
        .RankIndicator .RankIndicator_Tab > span {
          position: absolute;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
          bottom: 8px;
          width: 100%;
          z-index: 1;
        }
        .RankIndicator .RankIndicator_Tab > span:last-child {
          letter-spacing: -0.5px;
        }
        .RankIndicator .RankIndicator_Tab:before {
          position: absolute;
          content: "";
          width: calc(100% + 2px);
          height: 70%;
          top: 0;
          right: -1px;
          background: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.6));
        }
        .RankIndicator .RankIndicator_Tab:after {
          position: absolute;
          content: "";
          width: 19px;
          height: 10px;
          bottom: -5px;
          left: 6px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(196, 196, 196, 0) 100%
          );
        }

        .RankIndicator .RankIndicator_Tab:first-of-type {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

RankIndicator.propTypes = {
  category3No: PropTypes.number,
};

export default React.memo(RankIndicator);
