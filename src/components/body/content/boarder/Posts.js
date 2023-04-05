import { NavLink as Link } from "react-router-dom";
import styles from "./Boarder.modules.css";
function Posts({ posts, loading, error, postCount }) {
  return (
    <div className="row ">
      {loading ? null : (
        <div className="list-group" style={{ minHeight: "760px" }}>
          {posts.length > 0 ? null : (
            <div className="d-flex justify-content-center align-content-center h-100">
              <h3 className="mx-auto my-auto">
                {error ? error : "게시글이 존재하지 않습니다."}
              </h3>
            </div>
          )}

          {posts.map((post) => {
            return (
              <Link
                key={post.id}
                className={`list-group-item list-group-item-action ${styles.noTextDecoration}`}
                aria-current="true"
                to={`/post/${post.id}`}
              >
                <div className="row">
                  <div className={post.thumbnailImageUrl ? "col-9" : "col-12"}>
                    <small>{post.postCategoryName}</small>
                    <div className="d-flex w-100 justify-content-between mb-1 mt-2">
                      <h5 className="mb-1">{post.title}</h5>
                    </div>
                    <p className="mb-1" style={{ overflow: "hidden" }}>
                      {post.preview}
                    </p>
                    <small className="text-muted">{post.memberName}</small>
                    <small className="text-muted"> · </small>
                    <small className="text-muted">
                      {new Date(post.createDate).toLocaleDateString()}
                    </small>
                  </div>
                  {post.thumbnailImageUrl ? (
                    <div
                      className="col-3 d-flex justify-content-center"
                      style={{ maxWidth: "200px" }}
                    >
                      <img
                        className="img-fluid"
                        style={{ objectFit: "contain" }}
                        src={post.thumbnailImageUrl}
                      />
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Posts;
