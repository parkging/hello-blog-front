function Category() {
  return (
    <div>
      <div id="frag_category" class="mt-1 row">
        <strong
          class="d-none d-md-block h7 my-2 mt-4"
          style={{ cursor: "pointer" }}
          onclick="|location.href='@{/}'|"
        >
          분류
          <span
            class="badge rounded-pill text-bg-secondary"
            text="${allPostCount?:0}"
          >
            22
          </span>
        </strong>
        <hr class="d-none d-md-block my-2" />
        <ul class="list-group list-group-flush">
          <div>
            <li
              class="list-group-item"
              style={{ cursor: "pointer" }}
              onMouseover="this.style.background='ghostwhite';"
              onMouseout="this.style.background='white';"
              onclick="|location.href='@{/boarder/{categoryName}(categoryName=${categoryForm.name})}'|"
            >
              <span class="d-inline">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="d-inline" text="${categoryForm.name}">
                An item
              </span>
              <span
                class="badge rounded-pill text-bg-secondary"
                text="${categoryForm.postCount}"
              >
                10
              </span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
export default Category;
