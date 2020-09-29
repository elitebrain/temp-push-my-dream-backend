import React, { useState, useEffect } from "react";
import Layout from "components/Layout/Layout";

const CheckAgent = () => {
  const [userAgent, setUserAgent] = useState("");
  const [appName, setAppName] = useState("");
  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
    setAppName(window.navigator.appName);
    document.querySelector("body").style.background = "#fff";
  }, []);
  return (
    <Layout>
      <div className="container">
        <div>UserAgent : {userAgent}</div>
        <div>appName : {appName}</div>
      </div>
      <style jsx>{`
        .container {
          height: calc(100vh - 202px);
          background-color: #fff;
          box-sizing: border-box;
          padding: 100px 20px;
        }
      `}</style>
    </Layout>
  );
};

export default CheckAgent;
