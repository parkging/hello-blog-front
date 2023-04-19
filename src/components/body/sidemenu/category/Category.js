import { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import styles from "./Category.module.css";
import axios from "axios";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log("at PostEditor.js fetch data fail " + error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mt-1 row">
      {loading ? (
        <div>
          <strong
            className="d-none d-md-block h7 my-2 mt-4"
            style={{ cursor: "pointer" }}
            // onClick="|location.href='@{/}'|"
          >
            분류
            <span
              className="badge rounded-pill text-bg-secondary"
              text="${allPostCount?:0}"
            ></span>
          </strong>
          <hr className="d-none d-md-block my-2" />
          <ul className="list-group list-group-flush">
            <div>
              <li
                className={`list-group-item ${styles.hover}`}
                style={{ cursor: "pointer" }}
                // onClick="|location.href='@{/boarder/{categoryName}(categoryName=${categoryForm.name})}'|"
              >
                <span className="d-inline">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="d-inline" text="${categoryForm.name}">
                  category
                </span>
                <span
                  className="badge rounded-pill text-bg-secondary"
                  text="${categoryForm.postCount}"
                ></span>
              </li>
            </div>
          </ul>
        </div>
      ) : (
        <div className="mt-2">
          <Link className={styles.noTextDecoration} to={"/boarder"}>
            <strong
              className=" d-md-block h7 my-2 mt-4"
              style={{ cursor: "pointer" }}
              // onClick="|location.href='@{/}'|"
            >
              분류
              <span className="badge rounded-pill text-bg-secondary ms-1">
                {categories.reduce(
                  (sum, category) => sum + category.postCount,
                  0
                )}
              </span>
            </strong>
          </Link>
          <hr className=" d-md-block my-2" />
          {categories.map((category) => {
            return (
              <ul key={category.id} className="list-group list-group-flush">
                <div>
                  <Link
                    className={styles.noTextDecoration}
                    to={`/boarder/${category.name}/1`}
                  >
                    <li
                      className={`list-group-item ${styles.hover}`}
                      style={{ cursor: "pointer" }}
                    >
                      {category.parent ? (
                        <span className="">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      ) : null}
                      <span className="">{category.name}</span>
                      <span className="badge rounded-pill text-bg-secondary ms-1">
                        {category.postCount}
                      </span>
                    </li>
                  </Link>
                </div>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Category;
