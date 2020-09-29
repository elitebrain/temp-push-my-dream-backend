import React from "react";

const ContentLong = props => {
  const { children, style } = props;
  return (
    <div className="wrapper_contentLong" style={style}>
      {children}
      <style jsx>{`
          .wrapper_contentLong {
            width: 1800px;
            margin: 0 auto;
          }
        `}</style>
    </div>
  );
};

export default ContentLong;
