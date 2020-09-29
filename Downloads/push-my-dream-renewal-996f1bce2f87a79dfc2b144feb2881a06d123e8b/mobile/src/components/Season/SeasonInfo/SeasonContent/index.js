import React from "react";
import PropTypes from "prop-types";

import { GRADIENT_2F3354_040221, WHITE_COLOR } from "shared/constants/colors";

const SeasonContent = ({ content, children }) => {
  return (
    <div className="SeasonContent">
      <pre>{content}</pre>

      {/* <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      /> */}
      <style jsx>{`
        .SeasonContent {
          box-sizing: border-box;
          width: 100%;
          padding: 15px;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};
          border-radius: 5px;
          color: ${WHITE_COLOR};
        }

        .SeasonContent pre {
          white-space: pre-wrap;
          font-family: "Montserrat", "Spoqa Han Sans", sans-serif;
          font-size: 12px;
          line-height: 15px;
        }
      `}</style>
    </div>
  );
};

SeasonContent.propTypes = {
  content: PropTypes.string,
};

export default SeasonContent;
