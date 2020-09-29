import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout/Layout";
import Body from "components/Layout/Body";
import Content from "components/Layout/Content";

const EmptyComponent = props => {
  const {} = props;
  return (
    <Layout>
      <Body>
        <div className="container_">
          <Content>
            <div className="wrapper_"></div>
          </Content>
        </div>
      </Body>
      <style jsx>{``}</style>
    </Layout>
  );
};

EmptyComponent.propTypes = {};

export default EmptyComponent;
