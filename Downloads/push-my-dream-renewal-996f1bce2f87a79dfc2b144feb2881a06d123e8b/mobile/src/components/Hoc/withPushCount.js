import React, { useState, useCallback, createContext } from "react";
import PropTypes from "prop-types";

export const PushCountContext = createContext();

const PushCount = ({ children }) => {
  const [isPushLoaded, setIsPushLoaded] = useState(false);

  const onPushLoaded = useCallback(() => {
    setIsPushLoaded(isPushLoaded => !isPushLoaded);
  }, []);

  return (
    <PushCountContext.Provider value={{ isPushLoaded, onPushLoaded }}>
      {children}
    </PushCountContext.Provider>
  );
};

PushCount.propTypes = {
  children: PropTypes.node
};

export default PushCount;
