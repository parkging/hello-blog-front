import { useHistory } from "react-router-dom";
function PostEditorFooter({ savePost, deletePost, method }) {
  const history = useHistory();

  return (
    <div className="row w-100 my-2">
      <div className="d-flex flex-row justify-content-end">
        <div className="me-2">
          <button
            type="button"
            onClick={savePost}
            className="btn border border-primary"
          >
            저장
          </button>
        </div>

        {method === "PATCH" ? (
          <div className="me-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deletePost();
              }}
            >
              삭제하기
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="me-2">
          <button
            type="button"
            onClick={() => {
              history.goBack();
            }}
            className="btn border border-danger"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostEditorFooter;
