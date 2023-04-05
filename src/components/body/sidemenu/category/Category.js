import { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import styles from "./Category.module.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCategories = async () => {
    const json = await (
      await fetch("http://localhost:8080/postcategories")
    ).json();
    setCategories(json);
    setLoading(false);
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
        <div>
          <Link className={styles.noTextDecoration} to={"/boarder"}>
            <strong
              className="d-none d-md-block h7 my-2 mt-4"
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
          <hr className="d-none d-md-block my-2" />
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
