import React from "react";
import PropTypes from "prop-types";

const Pagination = props => {
  const { pages, currentPage, handlePage } = props;
  return (
    <div className="pagination">
      {pages &&
        pages.map(page =>
          currentPage === page ? (
            <span
              key={page}
              className="active"
              onClick={() => handlePage(page)}
            >
              {page}
            </span>
          ) : (
            <span key={page} onClick={() => handlePage(page)}>
              {page}
            </span>
          )
        )}
      <style jsx>{`
        .pagination {
          width: 300px;
          margin: auto;
          margin-top: 20px;
        }
        .pagination > span {
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin: 0 10px;
        }
        .pagination > span:hover {
          cursor: pointer;
          color: #fff;
          text-decoration: underline;
        }
        .pagination > span.active {
          border: 1px solid #b2b2b2;
          color: #fff;
        }
        .pagination > span.active:hover {
          cursor: default;
          text-decoration: initial;
        }
      `}</style>
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.array,
  currentPage: PropTypes.number,
  handlePage: PropTypes.func
};

export default Pagination;
