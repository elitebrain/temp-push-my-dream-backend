import React, { useMemo } from "react";

const DynamicLoader = ({ loaderColor, size }) => {
  const containerSize = useMemo(() => {
    return size;
  }, [size]);

  const loaderSize = useMemo(() => {
    return `calc(${size} * 6 / 8)`;
  }, [size]);

  const borderAndMarginSize = useMemo(() => {
    return `calc(${size} / 10)`;
  }, [size]);

  return (
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <style jsx>{`
        .loader {
          display: inline-block;
          position: relative;
          width: ${containerSize};
          height: ${containerSize};
        }
        .loader div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: ${loaderSize};
          height: ${loaderSize};
          margin: ${borderAndMarginSize};
          border: ${borderAndMarginSize} solid ${loaderColor};
          border-radius: 50%;
          animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: ${loaderColor} transparent transparent transparent;
        }
        .loader div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .loader div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .loader div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes loader {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicLoader;
