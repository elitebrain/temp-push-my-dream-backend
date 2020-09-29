import React from "react";
import PropTypes from "prop-types";

const List = ({ id, list, preItem, renderItem, column, empty, style }) => {
  const listClassName = `list${Boolean(column) ? " column" : ""}`;

  return (
    <div id={id} className={listClassName} style={style}>
      {list && Boolean(list.length) && preItem}
      {list && list.filter((item) => item).map(renderItem)}
      {list && Boolean(!list.length) && empty}
      <style jsx>{`
        .list.column {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

List.propTypes = {
  id: PropTypes.string,
  preItem: PropTypes.node,
  list: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  column: PropTypes.bool,
  empty: PropTypes.node,
  style: PropTypes.object,
};

export default List;
