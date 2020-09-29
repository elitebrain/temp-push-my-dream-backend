import React from "react";

const Item = ({ psercent, title }) => {
  return (
    <div className="progress">
      <div className="bar" data-name="SVG Skill" data-percent="8=70%">
        <svg viewBox="-10 -10 220 220">
          <g fill="none" strokeWidth="9" transform="translate(100,100)">
            <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)" />
            <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)" />
            <path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)" />
            <path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)" />
            <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)" />
            <path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)" />
          </g>
        </svg>
        <svg viewBox="-10 -10 220 220">
          <path
            d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z"
            strokeDashoffset="610"
          ></path>
        </svg>
        <div className="content">
          <span className="percent">{psercent}</span>
          <span className="line" />
          <span className="title">{title}</span>
        </div>
      </div>
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="cl1"
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop stopColor="#9b6ee3" />
            <stop offset="100%" stopColor="#d53cf5" />
            {/* <stop stopColor="#e32a89" />
            <stop offset="100%" stopColor="#498a98" /> */}
          </linearGradient>
          <linearGradient
            id="cl2"
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop stopColor="#498a98" />
            <stop offset="100%" stopColor="#50eabf" />
          </linearGradient>
          <linearGradient
            id="cl3"
            gradientUnits="objectBoundingBox"
            x1="1"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop stopColor="#50eabf" />
            <stop offset="100%" stopColor="#6b57d9" />
          </linearGradient>
          <linearGradient
            id="cl4"
            gradientUnits="objectBoundingBox"
            x1="1"
            y1="1"
            x2="0"
            y2="0"
          >
            <stop stopColor="#666" />
            <stop offset="50%" stopColor="#00f1b4" />
            <stop offset="100%" stopColor="#24d3bf" />
          </linearGradient>
          <linearGradient
            id="cl5"
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="1"
            x2="0"
            y2="0"
          >
            <stop stopColor="#24d3bf" />
            <stop offset="100%" stopColor="#4faecc" />
          </linearGradient>
          <linearGradient
            id="cl6"
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop stopColor="#4faecc" />
            <stop offset="100%" stopColor="#9b6ee3" />
          </linearGradient>
        </defs>
      </svg>
      <style jsx>{`
        @keyframes load {
          0% {
            stroke-dashoffset: 0;
          }
        }
        .progress {
          position: relative;
          display: inline-block;
          padding: 0;
          text-align: center;
          margin-right: 10px;
        }
        .progress:last-child {
          margin-right: 0;
        }
        .progress .bar {
          display: inline-block;
          position: relative;
          text-align: center;
        }
        /* .progress .bar:after {
          content: attr(data-percent);
          position: absolute;
          width: 100%;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          font-size: 12px;
          text-align: center;
        } */
        .progress .bar .content {
          position: absolute;
          width: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .progress .bar .content .percent {
          display: block;
          font-weight: bold;
          color: #fff;
          font-size: 12px;
        }
        .progress .bar .content .line {
          width: 70%;
          margin: 5px auto;
          margin-top: 9px;
          height: 1px;
          display: block;
          background-color: #ae46e7;
        }
        .progress .bar .content .title {
          width: 50px;
          word-break: keep-all;
          display: block;
          margin: 0 auto;
          color: #808080;
          font-size: 10px;
          font-weight: 500;
          line-height: 10px;
          height: 20px;
        }
        .progress svg {
          width: 84px;
          height: 84px;
        }
        .progress svg:nth-child(2) {
          position: absolute;
          left: 0;
          top: 0;
          /* transform: rotate(-90deg); */
          transform: rotate(90deg);
        }
        .progress svg:nth-child(2) path {
          fill: none;
          stroke-width: 8;
          /* stroke-dasharray: 629; */
          stroke-dasharray: 830;
          stroke: #666;
          opacity: 0.9;
          animation: load 10s;
        }
        @media (max-width: 1366px) {
          .progress {
            margin-right: 0;
          }
          .progress svg {
            width: 67px;
            height: 67px;
          }
          .progress .bar .content .percent {
            font-size: 12px;
          }
          .progress .bar .content .title {
            font-size: 9px;
            width: 60px;
            line-height: 10px;
          }
          .progress .bar .content .line {
            margin: 3px auto;
          }
        }
        @media (min-width: 2560px) {
          .progress svg {
            width: 110px;
            height: 110px;
          }
          .progress .bar .content .percent {
            font-size: 20px;
          }
          .progress .bar .content .title {
            font-size: 15px;
            width: 90px;
            line-height: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Item;
