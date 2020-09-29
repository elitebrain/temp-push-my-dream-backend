import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { BLACK_COLOR } from "shared/constants/colors";

import arrow_ico from "public/assets/icon/arrow_right_ico(white).svg";
import infinite_ico from "public/assets/icon/infinite_ico(black).svg";

import FindPasswordForm from "components/User/FindPassword/FindPasswordForm";
import ChangePasswordContainer from "containers/User/ChangePasswordContainer";
import ChangePassword from "./ChangePassword";

const FindPassword = ({
  isCheckPlusSuccess,
  localId,
  onCheckPlus,
  onChangeLocalId,
}) => {
  return (
    <>
      <>
        {/* <div className="container"> */}
        {isCheckPlusSuccess ? (
          <ChangePasswordContainer Component={ChangePassword} email={localId} />
        ) : (
          <FindPasswordForm
            localId={localId}
            onChangeLocalId={onChangeLocalId}
            onCheckPlus={onCheckPlus}
          />
        )}
        {/* </div> */}
      </>
      <style jsx>{`
        .container {
          padding-top: 50px;
          background-color: #1e1e25;
          padding-bottom: 30px;
        }
      `}</style>
    </>
  );
};

FindPassword.propTypes = {
  isCheckPlusSuccess: PropTypes.bool.isRequired,
  localId: PropTypes.string.isRequired,
  onCheckPlus: PropTypes.func.isRequired,
  onChangeLocalId: PropTypes.func.isRequired,
};

export default FindPassword;
