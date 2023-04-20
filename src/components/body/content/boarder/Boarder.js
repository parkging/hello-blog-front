import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagenation from "./Pagenation";
import BoarderHeader from "./BoarderHeader";
import axios from "axios";

function Boarder({ jwt, changeTitle }) {
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

  const getUrl = () => {
    let url = `/posts?page=${currentPage - 1}&size=${fetchMaxSize}`;
    if (!!postCategoryName && postCategoryName !== "전체") {
      url += `&postCategoryName=${postCategoryName}`;
    }

    return url;
  };

  const getPosts = () => {
    let url = getUrl();

    axios
      .get(url)
      .then((response) => {
        setPostCount(response.headers.get("x-total-count"));
        setPosts(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setError(error.response.data?.message)
          : setError(error.message);
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
  }, [category, page]);

  useEffect(() => {
    changeTitle("박깅이의 블로그");
  }, []);

  return (
    <div>
      <BoarderHeader
        boarderName={postCategoryName ? postCategoryName : "전체 글"}
        postCount={postCount}
        jwt={jwt}
      />
      <div id="frag_boarder" className="">
        <div className="row mx-auto">
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
