import React from "react";

const CategoryScroll = () => {
  return (
    <div className="category_scroll">
      <div className="arrow_left">◀</div>
      <div className="category">
        <div>
          <span>PUSH MY DREAM</span>
        </div>
        <div>
          <span>PUSH MY CHOCO</span>
        </div>
        <div>
          <span>PUSH MY SINGER</span>
        </div>
      </div>
      <div className="arrow_right">▶</div>
      <style jsx>{`
        .category_scroll {
          /* width: 180px; */
          position: relative;
          text-align: center;
        }
        .category_scroll .arrow_left {
          font-size: 14px;
          color: #06eeb7;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
        .category_scroll .arrow_right {
          font-size: 14px;
          color: #cd44f3;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
        .category {
          width: 140px;
          margin: 0 3px;
          overflow: auto;
          white-space: nowrap;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          display: inline-block;
          vertical-align: middle;
        }
        .category::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
        .category div {
          width: 135px;
          margin-right: 5px;
          cursor: pointer;
          display: inline-block;
          background: linear-gradient(#17182b, #17182b) padding-box,
            /*this is your grey background*/
              linear-gradient(to right, #0fe4b8, #c747f1) border-box;
          border: 1px solid transparent;
          border-radius: 5px;
          text-align: center;
        }
        .category div span {
          font-size: 14px;
          background: linear-gradient(to right, #0fe4b8, #c747f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default CategoryScroll;
