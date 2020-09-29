import React from "react";
import PropTypes from "prop-types";

import UserProfileContainer from "containers/User/UserProfile/UserProfileContainer";

import Layout from "components/Layout/Layout";

const User = ({ user_no, category3No }) => {
  return (
    <Layout>
      <UserProfileContainer
        userNo={Number(user_no)}
        category3No={Number(category3No)}
      />
    </Layout>
  );
};

User.getInitialProps = (context) => {
  const { user_no, category3No } = context.query;

  return { user_no, category3No };
};

User.propTypes = {
  user_no: PropTypes.string,
  category3No: PropTypes.string,
};

export default User;
