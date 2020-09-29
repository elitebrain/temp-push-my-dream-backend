import React, { useRef, useCallback } from "react";
import MainIndex from "components/Main/MainIndex";

const MainContainer = () => {
  const hotRef = useRef();

  // 스크롤 이벤트
  const onScroll = useCallback((type, left, top, width) => {
    console.log(type, left, top, width);
  }, []);
  return (
    <>
      <MainIndex hotRef={hotRef} onScroll={onScroll} />
    </>
  );
};

export default MainContainer;
