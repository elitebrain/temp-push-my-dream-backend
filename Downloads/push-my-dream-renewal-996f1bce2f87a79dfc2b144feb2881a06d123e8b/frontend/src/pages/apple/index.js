import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "react-helmet";

import PopUpModal from "components/Common/Modal/PopUpModal";
import AppleContainer from "containers/Apple/AppleContainer";

import { ON_LOAD_POPUP } from "store/reducers/common";
import { OPEN_MODAL } from "store/reducers/modal";

const main = () => {
  const { isPopup } = useSelector(state => state.common);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isPopup) {
  //     dispatch({ type: ON_LOAD_POPUP });
  //     dispatch({
  //       type: OPEN_MODAL,
  //       data: {
  //         custom: true,
  //         container: <PopUpModal />,
  //         isClose: true
  //       }
  //     });
  //   }
  // }, [isPopup]);
  return (
    <>
      <Helmet>
        <title>푸쉬 마이 드림 </title>
      </Helmet>
      <AppleContainer />
    </>
  );
};

export default main;
