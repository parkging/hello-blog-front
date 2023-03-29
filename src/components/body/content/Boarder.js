function Boarder() {
  return (
    <div>
      <div id="frag_boarder" class="">
        <div class="row">
          <h4 class="mt-4 col">
            <span text="${boardForm?.name}">전체 글</span>
            <span
              class="badge rounded-pill text-bg-secondary"
              text="${boardForm?.postCount}"
            >
              27
            </span>
          </h4>
          <div class="col d-flex justify-content-end">
            <button
              class="btn btn-secondary my-auto me-5"
              onclick="|location.href='@{/post/0/add}'|"
              text="글쓰기"
            ></button>
          </div>
        </div>

        <div class="row">
          <div class="list-group" style={{ "min-height": "760px" }}>
            <a
              href="@{/post/{postId} (postId=${postForm?.postId})}"
              class="list-group-item list-group-item-action"
              aria-current="true"
              each="postForm:${boardForm?.posts}"
              style={{ "min-height": "0px" }}
            >
              <div class="row">
                <div class="col-9 col-sm-7">
                  <small class="" text="${postForm?.categoryFullName}">
                    일상/사진
                  </small>
                  <div class="d-flex w-100 justify-content-between mb-1 mt-2">
                    <h5 class="mb-1" text="${postForm?.title}">
                      아바시리 2023년 2월 1일
                    </h5>
                  </div>
                  <p
                    class="mb-1"
                    style={{ overflow: "hidden" }}
                    text="${postForm?.preview}"
                  >
                    아바시리에서 유빙선을 타도 막상 유빙이 없는 경우가 많다.
                    하지만 유빙을 못보는 대신 저~ 멀리 시레코토를 볼 수 있다.
                    유빙이 있으면 날씨가 좋지 않아 시레코토..
                  </p>
                  <small class="text-muted" text="박깅이"></small>
                  <small class="text-muted">·</small>
                  <small
                    class="text-muted"
                    text="${#temporals.format(postForm?.createdDate, 'yyyy-MM-dd')}"
                  >
                    3 days ago
                  </small>
                </div>
                <div
                  class="col-3 d-flex justify-content-center"
                  style={{ "max-width": "200px" }}
                  if="${postForm.based64ThumbnailImage}"
                >
                  <img
                    class="img-fluid"
                    style={{ "object-fit": "contain" }}
                    src="'data:' + ${postForm?.based64ThumbnailImage?.contentType?:_} + ';base64,' + ${postForm?.based64ThumbnailImage?.based64ImgContent?:_}"
                  />
                </div>
              </div>
            </a>

            <p if="not ${boardForm?.postCount}" class="mx-auto my-auto">
              게시글이 존재하지 않습니다.
            </p>
          </div>

          <div class="d-flex justify-content-center mt-4">
            <div
              class="btn-group me-2 mt-2"
              role="group"
              aria-label="Second group"
              with="start=${boardForm?.startPage?:1}, current=${boardForm?.currentPage?:1}, end=${boardForm?.endPage?:1}, cnt=${boardForm?.postCount?:1}, size=${boardForm?.pageSize?:1}"
            >
              <button
                type="button"
                class="btn btn-outline-secondary"
                onclick="|fetchPage('@{/boarder/{categoryName}?page={pageNum}(categoryName=${categoryName},pageNum=${start-2})}','frag_boarder')|"
              >
                {"<"}
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                style={{ width: "40px" }}
                // class="${pageNum eq current} ? 'btn btn-secondary' : 'btn btn-outline-secondary'"
                text="${pageNum}"
                onclick="|fetchPage('@{/boarder/{categoryName}?page={pageNum}(categoryName=${categoryName},pageNum=${pageNum}-1)}','frag_boarder')|"
              ></button>

              <button
                type="button"
                class="btn btn-outline-secondary"
                onclick="|fetchPage('@{/boarder/{categoryName}?page={pageNum}(categoryName=${categoryName},pageNum=${end})}','frag_boarder')|"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Boarder;
