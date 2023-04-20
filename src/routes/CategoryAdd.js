import { useState } from "react";
function CategoryAdd({ setModalOpen, addCategory, parentPostCategoryId }) {
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState({});
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-dark text-dark bg-opacity-10">
      <div className="form-floating d-flex flex-row align-items-center w-75">
        <input
          type="text"
          className="form-control"
          placeholder="카테고리명"
          onChange={(event) => setCategoryName(event.target.value)}
        />
        <input type="hidden" id="parentId" field="*{parentId}" />
        <label className="" htmlFor="categoryName">
          카테고리 이름
        </label>
        <button
          className="btn btn-sm btn-outline-primary mx-1 w-25 h-100"
          onClick={(prev) =>
            addCategory(categoryName, parentPostCategoryId, setError)
          }
        >
          추가
        </button>
        <button
          className="btn btn-sm btn-outline-danger mx-1 w-25 h-100"
          onClick={() => setModalOpen(false)}
        >
          닫기
        </button>
      </div>
      <div className="text-danger" errors="*{name}">
        {error ? error : ""}
      </div>
    </div>
  );
}
export default CategoryAdd;
