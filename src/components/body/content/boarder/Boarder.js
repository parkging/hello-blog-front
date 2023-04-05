import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagenation from "./Pagenation";
import BoarderHeader from "./BoarderHeader";

function Boarder() {
  const { category, page } = useParams();
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  // //현재 페이지
  const [currentPage, setCurrentPage] = useState(page ? page : 1);
  // //카테코리
  const [postCategoryName, setPostCategoryName] = useState(
    category ? category : "전체"
  );
  //에러 메시지
  const [error, setError] = useState(null);

  //한페이지에 보여줄 포스트 개수
  const postForPageSize = 5;
  //한번에 보여줄 페이지 갯수 (ex 5 : 1-5, 6-10, ..)
  const pageViewCount = 5;
  //한번에 가져올 데이터 개수
  const fetchMaxSize = postForPageSize;

  //Pagination 에서 보여줄 첫 페이지 번호
  let pageOfFirst =
    Math.floor(currentPage / (postForPageSize + 1)) * postForPageSize + 1;
  //Pagination 에서 보여줄 마지막 페이지 번호
  let pageOfLast =
    pageOfFirst + pageViewCount - 1 < (postCount - 1) / pageViewCount + 1
      ? pageOfFirst + pageViewCount - 1
      : (postCount - 1) / pageViewCount + 1;

  const setViewPages = () => {
    pageOfFirst =
      Math.floor(currentPage / (postForPageSize + 1)) * postForPageSize + 1;
    pageOfLast =
      pageOfFirst + pageViewCount - 1 < (postCount - 1) / pageViewCount + 1
        ? pageOfFirst + pageViewCount - 1
        : (postCount - 1) / pageViewCount + 1;
  };

  const getPosts = () => {
    let fetchUrl = `http://localhost:8080/posts?page=${
      currentPage - 1
    }&size=${fetchMaxSize}`;
    if (!!postCategoryName && postCategoryName !== "전체")
      fetchUrl += `&postCategoryName=${postCategoryName}`;

    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) throw Error("데이터 조회에 실패하였습니다.");
        setPostCount(response.headers.get("x-total-count"));
        return response.json();
      })
      .then((json) => {
        setPosts(json);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.log("at Boarder.js fetch data fail " + error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, [postCategoryName, currentPage]);

  useEffect(() => {
    setCurrentPage(page);
    setPostCategoryName(category);
    console.log(
      "카테고리변경 currentPage=" +
        currentPage +
        ", postCategoryName=" +
        postCategoryName
    );
  }, [category, page]);

  return (
    <div>
      <BoarderHeader
        boarderName={postCategoryName ? postCategoryName : "전체 글"}
        postCount={postCount}
      />
      <div id="frag_boarder" className="">
        <div className="row">
          {loading ? (
            <div className="list-group" style={{ minHeight: "760px" }}>
              <p className="mx-auto my-auto">{error ? error : ""}</p>
            </div>
          ) : (
            <Posts
              posts={posts}
              loading={loading}
              error={error}
              postCount={postCount}
            />
          )}
          <Pagenation
            category={postCategoryName}
            pageOfFirst={pageOfFirst}
            pageOfLast={pageOfLast}
            currentPage={currentPage}
            postForPageSize={postForPageSize}
            pageViewCount={pageViewCount}
            postCount={postCount}
            // paginate={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
export default Boarder;
