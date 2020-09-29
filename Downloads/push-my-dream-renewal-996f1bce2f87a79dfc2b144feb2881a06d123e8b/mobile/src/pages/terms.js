import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import Dynamic from "next/dynamic";

import { commonApi } from "shared/api";
import { findSearchStringValue } from "shared/functions";
import LoadingCircle from "components/Common/CssIcons/LoadingCircle";
import Layout from "components/Layout/Layout";

const DynamicNewLayout = Dynamic(() => import("components/Layout/NewLayout"), {
  ssr: false,
});

const Terms = (props) => {
  const { gubunProps, modal } = props;
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState("");
  useEffect(() => {
    // const gubun = findSearchStringValue(window.location.search, "gubun");
    const gubun = Router.query.gubun;
    _getTerms(gubun);
  }, [Router]);
  const _handleTerms = useCallback((gubun) => {
    _getTerms(gubun);
  }, []);
  const _getTerms = (gubun) => {
    commonApi.get("/terms").then((res) => {
      setLoading(false);
      switch (gubun) {
        case "service":
          return setHtml(res.data[0].terms_contents);
        case "privacy":
          return setHtml(res.data[1].terms_contents);
        case "emergenza":
          return setHtml(res.data[2].terms_contents);
        case "youth":
          return setHtml(res.data[3].terms_contents);
        default:
          return setHtml(res.data[0].terms_contents);
      }
    });
  };
  return (
    <div className="container">
      {loading ? (
        <LoadingCircle />
      ) : modal ? (
        <div
          className="wrapper signup"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      ) : (
        <DynamicNewLayout transparent whiteText handleTerms={_handleTerms}>
          <div
            className="wrapper p20"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </DynamicNewLayout>
      )}

      <style jsx>{`
        .wrapper {
          background-color: #fff;
          word-break: break-all;
        }
        .wrapper.signup {
          margin: -20px;
          padding: 10px;
        }
        .wrapper.p20 {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Terms;
