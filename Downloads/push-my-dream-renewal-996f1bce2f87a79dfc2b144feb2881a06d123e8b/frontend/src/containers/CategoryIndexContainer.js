import React, { useRef, useCallback } from "react";
import CategoryIndex from "components/Category/CategoryIndex";

const CategoryIndexContainer = () => {
  const hotRef = useRef();
  // 스크롤 이벤트
  const onScroll = useCallback((type, left, top, width) => {
    console.log(type, left, top, width);
  }, []);
  return (
    <>
      <CategoryIndex hotRef={hotRef} onScroll={onScroll} />
    </>
  );
};

export default CategoryIndexContainer;
