import React from "react";

const Term = ({ html }) => {
  return (
    <div className="wrapper" dangerouslySetInnerHTML={{ __html: html }}>
      <style jsx>{`
        .wrapper {
          background-color: #fff;
          padding: 20px;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
};

export default Term;
