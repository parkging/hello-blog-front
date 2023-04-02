function BoarderHeader({ boarderName, postCount }) {
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
      <div className="col d-flex justify-content-end">
        <button
          className="btn btn-secondary my-auto me-5"
          // onClick="|location.href='@{/post/0/add}'|"
        >
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default BoarderHeader;
