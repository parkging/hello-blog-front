import axios from "axios";
import { useState, useEffect } from "react";

function PostEditorHeader({ post, setPost }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  //에러 메시지
  const [error, setError] = useState(null);

  const handleSelect = (e) => {
    post.postCategoryId = e.target.value;
  };

  const getCategories = () => {
    axios
      .get("/postcategories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setError(error.response.data?.message)
          : setError(error.message);
        setLoading(false);
        console.log("at PostEditorHeader.js fetch data fail " + error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className="row w-100 my-4 d-flex">
        <div className="col flex-fill">
          <input type="hidden" id="postId" />
        </div>
        <div className="col flex-fill">
          <label className="form-label" htmlFor="title">
            카테고리
          </label>
        </div>
        <div className="col flex-fill">
          <select
            className="form-select"
            aria-label="Default select example"
            id="category"
            value={post.postCategoryId}
            onChange={(e) => {
              setPost({ ...post, postCategoryId: e.target.value });
            }}
          >
            <option value={0}>카테고리를 선택하세요</option>

            {loading
              ? null
              : categories.map((category) => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      // disabled="${categoryForm.hasChild}?true:false"
                      text="${categoryForm.parentId ge 1 ? '&nbsp;'+categoryForm.name : categoryForm.name}"
                    >
                      {category.name}
                    </option>
                  );
                })}
          </select>
        </div>
      </div>

      <div className="row w-100 d-flex">
        <div className="col flex-fill">
          <label className="form-label" htmlFor="title">
            제목
          </label>
        </div>
        <div className="col flex-fill">
          <input
            className="form-control"
            type="text"
            id="title"
            value={post?.title || ""}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="row w-100 my-4 d-flex">
        <div className="col flex-fill">
          <label className="form-label" htmlFor="title">
            썸네일 이미지 URL
          </label>
        </div>
        <div className="col flex-fill">
          <input
            className="form-control"
            type="text"
            id="title"
            value={post?.thumbnailImageUrl || ""}
            onChange={(e) => {
              setPost({ ...post, thumbnailImageUrl: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostEditorHeader;
