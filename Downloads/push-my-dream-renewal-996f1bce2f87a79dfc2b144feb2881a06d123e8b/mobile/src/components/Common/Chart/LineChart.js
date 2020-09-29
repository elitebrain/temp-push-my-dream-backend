import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import * as d3 from "d3";

import { numberWithKMB } from "shared/functions";

const LineChart = (props) => {
  const {
    lineData,
    barData,
    width = 300,
    height = 154,
    axisLeftCount = 10,
    axisRightCount,
    strokeWidth = 2,
    strokeColor = "#446fbe",
    svgFilter,
    axisLeftWidth = 35,
    axisRightWidth = 0,
    reverse,
  } = props;

  const lineRef = useRef();
  const rectRef = useRef();

  useEffect(() => {
    const line = d3.select(lineRef.current);
    const Line = reverse
      ? d3
          .line()
          .x(
            (value, index) =>
              index *
                ((width - axisLeftWidth - axisRightWidth) / lineData.length) +
              axisLeftWidth +
              10
          )
          .y((value) => {
            // console.log(
            //   "\n\n\n\n",
            //   (value / d3.max(lineData, (d) => d.value)) * (height - 51),
            //   height - 51
            // );
            if (value) {
              // return (
              //   height -
              //   34 -
              //   120 / axisLeftCount -
              //   (height -
              //     34 -
              //     (value / d3.max(lineData, (d) => d.value)) * (height - 34))
              // );
              return (value / d3.max(lineData, (d) => d.value)) * (height - 51);
            } else {
              return height - 31;
            }
          })
          .curve(d3.curveLinear)
      : d3
          .line()
          .x(
            (value, index) =>
              index *
                ((width - axisLeftWidth - axisRightWidth) / lineData.length) +
              axisLeftWidth +
              10
          )
          .y(
            (value) =>
              height -
              34 -
              (value / d3.max(lineData, (d) => d.value)) * (height - 34)
          )
          .curve(d3.curveLinear);
    line
      .selectAll("path")
      .data([lineData.map((v) => v.value)])
      .join("path")
      .attr("d", (value) => Line(value))
      .attr("fill", "none")
      .attr("stroke", strokeColor)
      .attr("stroke-linecap", "round")
      .attr("stroke-width", strokeWidth);
    console.log(reverse, lineData);
    // console.log(
    //   "lineRef.current",
    //   lineRef.current,
    //   d3.max(lineData, (d) => d.value)
    // );
    // const yscale = d3
    //   .scaleLinear()
    //   .domain([1, d3.max(lineData, (d) => d.value)])
    //   .range([0, 123]);
    // d3.select("#axis_left")
    //   .attr("transform", "translate(35, 0)")
    //   .attr("color", "#878792")
    //   .call(d3.axisLeft(yscale));

    let rect = null;
    if (barData) {
      console.log("barData", barData);
      rect = d3.select(rectRef.current);
      // const xAxisGroup = rect
      //   .append("g")
      //   .attr("transform", `translate(0, ${height})`); // x축 아래로 translate
      // const yAxisGroup = rect.append("g");
      const Rect = rect.selectAll("rect").data(barData);
      const y = d3
        .scaleLinear()
        // .domain([0, d3.max(lineData, (d) => d.value)])
        .domain([0, height - 34])
        .range([height - 34, 0]);
      // const min = d3.min(barData, (d) => d.value);
      // const max = d3.max(barData, (d) => d.value);
      // const extent = d3.extent(barData, (d) => d.value);
      const x = d3
        .scaleBand()
        .domain(barData.map((item) => item.date))
        .range([0, width - axisLeftWidth - axisRightWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);
      const bandWidth = x.bandwidth() / 2;
      Rect.attr("width", bandWidth)
        .attr(
          "height",
          // (d) => d.value
          (d) =>
            height -
            34 -
            y((d.value / d3.max(barData, (dd) => dd.value)) * (height - 34))
        )
        .attr("fill", "#00f1b4")
        .attr("x", (d) => x(d.date))
        .attr("y", (d) =>
          y((d.value / d3.max(barData, (dd) => dd.value)) * (height - 34))
        );
      if (axisRightCount) {
      }
      const axisBase = axisRightCount
        ? d3.max(barData, (dd) => dd.value)
        : d3.max(lineData, (dd) => dd.value);
      Rect.enter()
        .append("rect")
        .attr("width", bandWidth)
        .attr(
          "height",
          (d) => height - 34 - y((d.value / axisBase) * (height - 34))
        )
        .attr("fill", "#00f1b4")
        .attr("x", (d) => x(d.date))
        .attr("y", (d) => y((d.value / axisBase) * (height - 34)));
      // const xAxis = d3.axisBottom(x);
      // const yAxis = d3
      //   .axisLeft(y)
      //   .ticks(3)
      //   .tickFormat((d) => d + " values");
      // xAxisGroup.call(xAxis);
      // yAxisGroup.call(yAxis);
      // xAxisGroup
      //   .selectAll("text")
      //   .attr("transform", "rotate(-40)")
      //   .attr("text-anchor", "end")
      //   .attr("fill", "orange");
    }
    return () => {
      if (barData) {
        rect.selectAll("rect").remove();
      }
    };
  }, [lineData, barData, width]);

  // 좌측 좌표값 캐싱
  const renderAxisLeft = useCallback(
    (item, i) => (
      <div className="item" key={i}>
        {axisLeftCount === 1
          ? numberWithKMB(i === 0 ? lineData[0].value * 2 : lineData[0].value)
          : numberWithKMB(
              Math.round(
                d3.max(lineData, (d) => d.value) -
                  (d3.max(lineData, (d) => d.value) / (axisLeftCount - 1)) *
                    (i - 1)
              )
            )}
        <style jsx>{`
          .item {
            font-size: 10px;
            color: #878792;
            text-align: right;
            height: ${(height - 31) / axisLeftCount}px;
            line-height: ${(height - 31) / axisLeftCount}px;
          }
        `}</style>
      </div>
    ),
    [height, d3, lineData, axisLeftCount]
  );

  // 좌측 좌표값 캐싱
  const renderReverseAxisLeft = useCallback(
    (item, i) =>
      axisLeftCount === 1 ? (
        <React.Fragment key={i}>
          {axisLeftCount === i ? (
            <div className="item">{lineData[0].value === 1 ? "" : "1"}</div>
          ) : (
            <div className="item">{lineData[0].value}</div>
          )}
          <style jsx>{`
            .item {
              font-size: 10px;
              color: #878792;
              text-align: right;
              height: ${(height - 31) / axisLeftCount}px;
              line-height: ${(height - 31) / axisLeftCount}px;
            }
          `}</style>
        </React.Fragment>
      ) : (
        <React.Fragment key={i}>
          {axisLeftCount === i ? (
            <div className="item">{"1"}</div>
          ) : (
            <div className="item">
              {axisLeftCount === 1
                ? lineData[0].value
                : numberWithKMB(
                    Math.ceil(
                      d3.max(lineData, (d) => d.value) -
                        (d3.max(lineData, (d) => d.value) /
                          (axisLeftCount - 1)) *
                          i
                    ) || 1
                  )}
            </div>
          )}
          <style jsx>{`
            .item {
              font-size: 10px;
              color: #878792;
              text-align: right;
              height: ${(height - 31) / axisLeftCount}px;
              line-height: ${(height - 31) / axisLeftCount}px;
            }
          `}</style>
        </React.Fragment>
      ),
    [axisLeftCount, d3, lineData, height]
  );

  // 좌측 하단값 캐싱
  const renderAxisBottom = useCallback(
    (n, i) => (
      <div
        key={i}
        className="axis_bottom_li"
        style={{
          position: "absolute",
          display: "inline-block",
          top: "0",
          left: `${
            i === 6
              ? 29 *
                  ((width - axisLeftWidth - axisRightWidth) / lineData.length) +
                axisLeftWidth -
                30
              : i *
                  (((width - axisLeftWidth - axisRightWidth) /
                    lineData.length) *
                    5) +
                axisLeftWidth -
                30
          }px`,
        }}
      >
        <span className="item">
          {i === 6
            ? lineData[lineData.length - 1].date.substr(5).replace(/-/g, "/")
            : lineData[i * Math.floor(lineData.length / 6)].date
                .substr(5)
                .replace(/-/g, "/")}
        </span>
        <style jsx>{`
          .axis_bottom_li {
            position: absolute;
            display: inline-black;
            top: 0;
          }

          .axis_bottom_li .item {
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            color: #878792;
            text-align: initial;
            transform: rotate(45deg) translate(20%, 50%);
          }
        `}</style>
      </div>
    ),
    [width, axisLeftWidth, axisRightWidth, lineData]
  );

  const renderAxisRight = useCallback(
    (item, i) => (
      <div className="item" key={i}>
        {numberWithKMB(
          Math.round(
            d3.max(barData, (d) => d.value) -
              (d3.max(barData, (d) => d.value) / (axisRightCount - 1)) * i
          )
        )}
        <style jsx>{`
          .item {
            font-size: 10px;
            color: #878792;
            text-align: left;
            height: ${(height - 20) / axisRightCount / 2}px;
            line-height: ${(height - 20) / axisRightCount / 2}px;
          }
        `}</style>
      </div>
    ),
    [d3, barData, axisRightCount, height]
  );
  console.log("~~~~~~~~~~~~~~~~~lineData", lineData);
  return (
    <div className="container">
      <svg className="line">
        <g ref={lineRef}></g>
        {/* <g id="axis_left"></g> */}
      </svg>
      {barData && (
        <svg className="rect">
          <g ref={rectRef}></g>
        </svg>
      )}
      <div className="axis_left">
        {reverse
          ? Array.apply(null, new Array(axisLeftCount))
              .map(renderReverseAxisLeft)
              .reverse()
          : Array.apply(null, new Array(axisLeftCount)).map(renderAxisLeft)}
      </div>
      <div className="axis_bottom">
        {Array.apply(null, new Array(7)).map(renderAxisBottom)}
      </div>
      {axisRightCount && (
        <div className="axis_right">
          {Array.apply(null, new Array(axisRightCount)).map((item, i) => (
            <div className="item" key={i}>
              {numberWithKMB(
                Math.round(
                  d3.max(barData, (d) => d.value) -
                    (d3.max(barData, (d) => d.value) / (axisRightCount - 1)) * i
                )
              )}
            </div>
          ))}
          {/* {Array.apply(null, new Array(axisRightCount)).map(renderAxisRight)} */}
        </div>
      )}
      <style jsx>{`
        .container {
          position: relative;
          margin: 0 30px 0 0;
          padding-top: 20px;
          height: ${height + 20}px;
        }
        .container > svg {
          width: 100%;
          height: ${height}px;
          filter: ${svgFilter};
          padding-top: 20px;
          overflow: initial;
        }
        svg path {
          transition: 0.3s ease-in-out;
        }
        svg.line {
          position: relative;
          z-index: 1;
        }
        svg.rect {
          position: absolute;
          left: ${axisLeftWidth}px;
          bottom: 0;
        }
        .axis_left,
        .axis_right {
          position: absolute;
          bottom: 30px;
          box-sizing: border-box;
        }
        .axis_left {
          left: 0;
          width: ${axisLeftWidth}px;
          border-right: 1px solid rgba(135, 135, 146, 0.4);
          padding-right: 5px;
        }
        .axis_right {
          right: -20px;
          width: ${axisRightWidth}px;
          border-left: 1px solid rgba(135, 135, 146, 0.4);
          padding-left: 5px;
        }
        .axis_left > .item,
        .axis_right > .item {
          font-size: 10px;
          color: #878792;
        }
        .axis_left > .item {
          text-align: right;
          height: ${(height - 20) / axisLeftCount}px;
          line-height: ${(height - 20) / axisLeftCount}px;
        }
        .axis_right > .item {
          text-align: left;
          height: ${(height - 20) / axisRightCount}px;
          line-height: ${(height - 20) / axisRightCount}px;
        }
        .axis_bottom {
          position: absolute;
          left: ${axisLeftWidth}px;
          bottom: 0;
          width: calc(100% - 30px);
          height: 30px;
          border-top: 1px solid rgba(135, 135, 146, 0.4);

          text-align: initial;
        }

        @media (min-width: 425px) {
          .axis_bottom > .item {
            transform: rotate(45deg) translate(35%, 100%);
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(LineChart);
