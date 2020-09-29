import React from "react";
import CounterAnimate from "./CounterAnimate";

export default {
  title: "CounterAnimate",
  component: CounterAnimate
};

export const counter = () => (
  <CounterAnimate pushCount={Math.floor(Math.random() * 100000000)} />
);
export const mobile = () => (
  <CounterAnimate mobile pushCount={Math.floor(Math.random() * 100000000)} />
);
