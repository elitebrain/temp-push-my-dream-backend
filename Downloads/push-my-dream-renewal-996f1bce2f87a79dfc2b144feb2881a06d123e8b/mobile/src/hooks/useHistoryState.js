import { useState, useCallback } from "react";
import _ from "lodash/object";

const historyStorage = ((history) => {
  history.replaceState = ((replaceState) => (state = {}, title, url) =>
    replaceState.call(history, { ...history.state, ...state }, title, url))(
    history.replaceState
  );

  const get = (key) =>
    _.has(history, `state.page`) ? history.state.page[key] : undefined;
  const set = (key, value, replace = false) => {
    const historyStatePage = _.has(history, "state")
      ? history.state.page
      : undefined;

    history.replaceState({
      page: replace ? { [key]: value } : { ...historyStatePage, [key]: value },
    });
  };

  return { set, get };
})(typeof window !== "undefined" ? window.history : {});

const useHistoryState = (initialState, key) => {
  const stateValue = historyStorage.get(key);

  const [historyState, setHistoryState] = useState(
    stateValue === undefined ? initialState : stateValue
  );

  const setState = useCallback(
    (state, replace = false) => {
      const value = state instanceof Function ? state(historyState) : state;

      setHistoryState(() => value);
      historyStorage.set(key, value, replace);
    },
    [historyState, key]
  );

  return [historyState, setState];
};

export default useHistoryState;
