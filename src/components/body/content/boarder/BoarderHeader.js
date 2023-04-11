import { Link as Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function BoarderHeader({ boarderName, postCount, jwt }) {
  return (
    <div className="row">
      <h4 className="mt-4 col">
        <span text="${boardForm?.name}">
          {" "}
          {boarderName ? boarderName : "전체 글"}
        </span>
        <span className="badge rounded-pill text-bg-secondary ms-1">
          {postCount}
        </span>
      </h4>

      {jwt ? (
        <div className="col d-flex justify-content-end">
          <Link
            className="btn btn-secondary my-auto me-5"
            // onClick="|location.href='@{/post/0/add}'|"
            to={`/post/add`}
          >
            글쓰기
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BoarderHeader;
