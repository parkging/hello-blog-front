import { Link as Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function PostViewerHeader({ post, jwt }) {
  const { postId } = useParams();
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
          {jwt ? (
            <div>
              <Link
                type="button"
                className="btn btn-secondary"
                to={`/post/${postId}/edit`}
              >
                수정하기
              </Link>
            </div>
          ) : (
            ""
          )}
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
