function PostViewerHeader({ post }) {
  return (
    <div className="row">
      <div className="row w-100 mt-4 d-flex">
        <div className="col flex-fill">
          <input type="hidden" id="postId" />
        </div>
        <div className="col">
          <p text="${postForm.categoryFullName}">일상/여행</p>
        </div>
        <div
          className="col d-flex justify-content-end"
          if="${session.loginMember}"
        >
          <button
            type="button"
            className="btn btn-secondary"
            // onClick="|location.href='@{{postId}/edit(postId=${postForm.postId})}'|"
          >
            수정하기
          </button>
        </div>
      </div>

      <div className="row w-100 d-flex d-none">
        <div
        // style="|background-image: url('data:${postForm.based64ThumbnailImage?.contentType};base64,${postForm.based64ThumbnailImage?.based64ImgContent}');|"
        ></div>
        <hr className="mt-2" />
      </div>

      <div className="row w-100 d-flex">
        <h2 text="${postForm.title}"> {post.title} </h2>
        <p
          className="text-muted fw-light"
          style={{ fontSize: "14px", height: "20px" }}
        >
          {`${post.memberName} · ${new Date(
            post.createDate
          ).toLocaleDateString()}`}
        </p>
        <hr className="mt-2" />
      </div>
    </div>
  );
}
export default PostViewerHeader;
