import { Link as Link } from "react-router-dom";
import styles from "./Boarder.modules.css";
import { useEffect } from "react";
function Pagenation({
  category,
  pageOfFirst,
  pageOfLast,
  currentPage,
  postForPageSize,
  pageViewCount,
  postCount,
  // paginate,
}) {
  const pageNumbers = [];

  for (let i = pageOfFirst; i <= pageOfLast; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    // console.log(
    //   "category=" +
    //     category +
    //     ", pageOfFirst=" +
    //     pageOfFirst +
    //     ", pageOfLast=" +
    //     pageOfLast +
    //     ", currentPage=" +
    //     currentPage +
    //     ", postForPageSize=" +
    //     postForPageSize +
    //     ", pageViewCount=" +
    //     pageViewCount +
    //     ", postCount=" +
    //     postCount
    // );
  }, []);

  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="btn-group me-2 mt-2"
        role="group"
        aria-label="Second group"
      >
        {pageOfFirst > pageViewCount ? (
          <Link
            style={{ width: "40px" }}
            className={"btn btn-outline-secondary"}
            to={`/boarder/${category}/${pageOfFirst - 1}`}
            // onClick={() => paginate(pageOfFirst - 1)}
          >
            {"<"}
          </Link>
        ) : null}
        {pageNumbers.map((pageNum) => {
          return (
            <Link
              key={pageNum}
              style={{ width: "40px" }}
              className={
                pageNum == currentPage
                  ? "btn btn-secondary"
                  : "btn btn-outline-secondary"
              }
              to={`/boarder/${category}/${pageNum}`}
              // onClick={() => paginate(pageNum)}
            >
              {pageNum}
            </Link>
          );
        })}
        {pageOfLast < Math.ceil(postCount / postForPageSize) ? (
          <Link
            style={{ width: "40px" }}
            className={"btn btn-outline-secondary"}
            to={`/boarder/${category}/${pageOfLast + 1}`}
            // onClick={() => paginate(pageOfLast + 1)}
          >
            {">"}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Pagenation;
