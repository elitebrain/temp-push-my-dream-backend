import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CategoryCircle = ({ category, style }) => {
  const [color, setColor] = useState("#fe9213");
  const { categoryList: originCategoryList } = useSelector(
    state => state.common
  );

  let categoryList = [];

  for (let categoryObject of originCategoryList) {
    // 카테고리 아이디가 존재하는 값만 푸쉬
    categoryList.push(
      ...categoryObject.CATEGORY_LEVEL2.filter(v => !!v.category_level2_no)
    );
  }

  const viewCategory = categoryList
    .filter(v => v.category_level2_no === category)
    .map(v => v.category_level2);

  useEffect(() => {
    if (category === 1) {
      setColor("#178852");
    } else if (category === 2) {
      setColor("#ff0000");
    } else if (category === 3) {
      setColor("#60028c");
    } else if (category === 4) {
      setColor("#ffc207");
    } else if (category === 5) {
      setColor("#0e72ab");
    }
  }, [category]);

  return (
    <div className="category" style={style}>
      {String(viewCategory)
        .substr(0, 1)
        .toUpperCase()}
      <div className="tooltip">
        {category === 6 ? viewCategory : `PUSH MY ${viewCategory}`}
      </div>
      <style jsx>{`
        .category {
          position: relative;
          cursor: pointer;
          width: 25px;
          height: 25px;
          background-color: #444;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 15px;
          font-weight: 700;
          color: ${color};
        }

        .category .tooltip {
          display: inline-block;
          width: 150px;

          visibility: hidden;
          background-color: black;
          color: #fff;
          text-align: center;
          padding: 5px 15px;
          border-radius: 6px;

          /* Position the tooltip text - see examples below! */
          position: absolute;
          left: 0px;
          bottom: 30px;
          z-index: 1;
        }
        .category:hover .tooltip {
          visibility: visible;
        }
      `}</style>
    </div>
  );
};

CategoryCircle.propTypes = {
  category: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  style: PropTypes.object
};

export default CategoryCircle;
