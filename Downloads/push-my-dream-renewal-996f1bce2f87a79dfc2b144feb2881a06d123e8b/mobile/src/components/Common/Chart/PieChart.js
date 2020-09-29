import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = (props) => {
  const {
    data,
    width,
    height,
    innerRadius,
    outerRadius,
    caption,
    title,
    titleArr,
    colors,
    text,
  } = props;
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const setColors = (i) => {
    const arr = colors;
    return arr[i];
  };
  const format = d3.format(".1f");
  useEffect(() => {
    console.log("props", props);
    const tempData = createPie(data);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(tempData);
    groupWithData.exit().remove();
    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));
    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => setColors(i));

    if (text) {
      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));
      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
        .style("fill", "white")
        .style("font-size", 10)
        .text((d) => format(d.value) + "%");
    }
  }, [data]);
  return (
    <div className="container">
      <div className="wrapper">
        <svg width={width} height={height}>
          <g ref={ref} transform={`translate(${outerRadius} ${outerRadius})`} />
        </svg>
        {caption && (
          <span style={{ color: caption.color }}>{caption.text}</span>
        )}
      </div>
      {title && (
        <div className="title" style={{ color: title.color }}>
          {title.text}
        </div>
      )}
      {titleArr && (
        <div
          className="title_array_wrapper"
          style={{ fontSize: `${14 - titleArr.length}px` }}
          // style={{ fontSize: `${11 - Math.floor(titleArr.length / 2)}px` }}
        >
          {titleArr.map((title) => (
            <div
              className="title_array"
              style={{ color: title.color }}
              key={title.no}
            >
              {title.text}
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .container {
          display: inline-block;
          vertical-align: middle;
        }
        .wrapper {
          position: relative;
          width: ${width}px;
          height: ${height}px;
          background-color: #000;
          border-radius: 50%;
          margin: auto;
        }
        .wrapper > span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
        }
        .title {
          display: inline-block;
          width: ${width}px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          margin-top: 6px;
        }
        .title_array_wrapper {
          margin-top: 15px;
          text-align: left;
          padding-left: 12px;
          font-weight: 700;
        }
        .title_array {
          display: inline-block;
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default PieChart;
