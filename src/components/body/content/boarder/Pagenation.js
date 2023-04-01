function Pagenation({
  pageOfFirst,
  pageOfLast,
  currentPage,
  postForPageSize,
  pageViewCount,
  postCount,
  paginate,
}) {
  const pageNumbers = [];
  for (let i = pageOfFirst; i <= pageOfLast; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div
        className="btn-group me-2 mt-2"
        role="group"
        aria-label="Second group"
      >
        {pageOfFirst > pageViewCount ? (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => paginate(pageOfFirst - 1)}
          >
            {"<"}
          </button>
        ) : null}
        {pageNumbers.map((pageNum) => {
          return (
            <button
              key={pageNum}
              type="button"
              style={{ width: "40px" }}
              className={
                pageNum == currentPage
                  ? "btn btn-secondary"
                  : "btn btn-outline-secondary"
              }
              onClick={() => paginate(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
        {pageOfLast < Math.ceil(postCount / postForPageSize) ? (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => paginate(pageOfLast + 1)}
          >
            {">"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Pagenation;
