import { useState, useEffect } from "react";
import { Link as Link } from "react-router-dom";
import axios from "axios";
import CategoryAdd from "./CategoryAdd";

function CategoryEdit() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parentPostCategoryId, setParentPostCategoryId] = useState();
  const [error, setError] = useState(null);
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  const modalStyle = {
    /* 모달창 크기 */
    width: "700px",
    height: "300px",

    /* 최상단 위치 */
    zIndex: "999",

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    /* 모달창 디자인 */
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "8px",
  };

  const getCategories = () => {
    axios
      .get("/postcategories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setError(error.response.data?.message)
          : setError(error.message);
        setLoading(false);
        console.log("at CategoryEdit.js fetch data fail " + error);
      });
  };

  const deleteCategory = (category) => {
    axios
      .delete(`/postcategories/${category.id}`)
      .then((response) => {
        getCategories();
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setError(error.response.data?.message)
          : setError(error.message);
        setLoading(false);
        console.log("at CategoryEdit.js fetch data fail " + error);
      });
  };

  const addCategory = (categoryName, parentPostCategoryId, setError) => {
    const category = {
      name: categoryName,
      parentPostCategoryId: parentPostCategoryId,
    };

    axios
      .post("/postcategories", category)
      .then((response) => {
        getCategories();
        setModalOpen(false);
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setError(error.response.data?.message)
          : setError(error.message);
        setLoading(false);
        console.log("at CategoryEdit.js fetch data fail " + error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <main
      object="${categoryForms}"
      className="d-flex flex-column justify-content-center h-100 bg-dark p-2 text-dark bg-opacity-10 "
      id="categoryFrag"
    >
      <div className="list-group list-group-flush m-auto w-50">
        <div className="d-flex flex-row align-items-center">
          <strong className="h7 my-2 mx-2">분류 수정</strong>
          <button
            className="d-flex justify-content-center align-items-center btn btn-outline-primary"
            style={{ width: "20px", height: "30px" }}
            type="button"
            onClick={() => {
              setModalOpen(true);
              setParentPostCategoryId();
            }}
          >
            +
          </button>
        </div>

        {modalOpen && (
          <div style={modalStyle}>
            <CategoryAdd
              className="modal modal-dialog"
              setModalOpen={setModalOpen}
              addCategory={addCategory}
              parentPostCategoryId={parentPostCategoryId}
            ></CategoryAdd>
          </div>
        )}

        <hr className="d-none d-md-block my-2" />
        {loading ? (
          ""
        ) : (
          <div>
            {categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className="d-flex justify-content-center align-items-center list-group-item"
                  style={{ backgroundColor: "rgba(232,233,233,0.56)" }}
                  each="categoryForm : ${categoryForms}"
                >
                  <div
                    className="d-inline"
                    text="'&nbsp&nbsp&nbsp&nbsp'"
                    if="${categoryForm.parentId ge 1}"
                  >
                    {category.parent?.id && `\u00A0\u00A0\u00A0`}
                  </div>
                  <div className="d-inline me-auto"> {category.name} </div>
                  <button
                    className="d-flex justify-content-center align-items-center d-inline btn btn-outline-primary me-1"
                    disabled={category.parent?.id ? true : false}
                    if="${categoryForm.parentId}?false:true"
                    style={{ width: "20px", height: "30px" }}
                    onClick={() => {
                      setModalOpen(true);
                      setParentPostCategoryId(
                        category.parent?.id ? undefined : category.id
                      );
                    }}
                  >
                    +
                  </button>
                  <button
                    className="d-flex justify-content-center align-items-center d-inline btn btn-outline-danger me-1"
                    disabled={category.parent?.id ? false : true}
                    if="${categoryForm.parentId}?true:not(${categoryForm.hasChild})"
                    style={{ width: "20px", height: "30px" }}
                    onClick={() => deleteCategory(category)}
                  >
                    -
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {error ? (
          <strong className="text-danger mx-auto mt-5">{error}</strong>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}

export default CategoryEdit;
