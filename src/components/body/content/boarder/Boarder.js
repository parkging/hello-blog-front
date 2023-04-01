import { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagenation from "./Pagenation";
import BoarderHeader from "./BoarderHeader";

function Boarder() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  //현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  //에러 메시지
  const [error, setError] = useState(null);

  //한페이지에 보여줄 포스트 개수
  const postForPageSize = 5;
  //한번에 보여줄 페이지 갯수 (ex 5 : 1-5, 6-10, ..)
  const pageViewCount = 5;
  //한번에 가져올 데이터 개수
  const fetchMaxSize = postForPageSize * pageViewCount;
  //Pagination 에서 보여줄 첫 페이지 번호
  let pageOfFirst =
    Math.floor(currentPage / (pageViewCount + 1)) * pageViewCount + 1;
  //Pagination 에서 보여줄 마지막 페이지 번호
  let pageOfLast = pageOfFirst + Math.ceil(posts.length / postForPageSize) - 1; //3 : 1p, 6 : 2p, 25 : 5
  //Pagination 에서 페이지 변경 시 보여줄 첫번째 포스트 번호; 경계 시 포함
  let postOfFirst =
    (currentPage - 1) * postForPageSize >= fetchMaxSize
      ? Math.floor(((currentPage - 1) * postForPageSize) / (fetchMaxSize + 1))
      : (currentPage - 1) * postForPageSize; //1p : 0, 2p : 5, 6p : 0
  //Pagination 에서 페이지 변경 시 보여줄 마지막 포스트 번호; 경계 시 미포함
  let postOfLast = postOfFirst + postForPageSize; //1p: 5, 2p: 10, 6p: 5
  //데이터 가져올 페이지;0부터 시작함
  let fetchCurrentPage = 0;
  const getFetchCurrentPage = () => {
    const toBefetchPage = Math.floor(currentPage / (pageViewCount + 1));
    if (fetchCurrentPage > toBefetchPage) {
      fetchCurrentPage = fetchCurrentPage - 1;
    } else if (fetchCurrentPage < toBefetchPage) {
      fetchCurrentPage = fetchCurrentPage + 1;
    } else {
      fetchCurrentPage = fetchCurrentPage;
    }
  };

  const currentPosts = (posts) => posts.slice(postOfFirst, postOfLast);

  const getPosts = () => {
    fetch(
      `http://localhost:8080/posts?page=${fetchCurrentPage}&size=${fetchMaxSize}`
    )
      .then((response) => {
        if (!response.ok) throw Error("데이터 조회에 실패하였습니다.");
        setPostCount(response.headers.get("x-total-count"));
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setPosts(json);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        console.log("at Boarder.js fetch data fail " + error);
      });
  };

  getFetchCurrentPage();

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, [fetchCurrentPage]);

  // console.log(
  //   "currentPage=" +
  //     currentPage +
  //     ", pageOfFirst=" +
  //     pageOfFirst +
  //     ", pageOfLast=" +
  //     pageOfLast +
  //     ", postOfFirst=" +
  //     postOfFirst +
  //     ", postOfLast=" +
  //     postOfLast +
  //     ", postCount=" +
  //     postCount +
  //     ", fetchCurrentPage=" +
  //     fetchCurrentPage
  // );

  return (
    <div>
      <BoarderHeader postCount={postCount} />
      <div id="frag_boarder" className="">
        <div className="row">
          {loading ? (
            <div className="list-group" style={{ minHeight: "760px" }}>
              <p className="mx-auto my-auto">{error ? error : ""}</p>
            </div>
          ) : (
            <Posts posts={currentPosts(posts)} loading={loading} />
          )}
          <Pagenation
            pageOfFirst={pageOfFirst}
            pageOfLast={pageOfLast}
            currentPage={currentPage}
            postForPageSize={postForPageSize}
            pageViewCount={pageViewCount}
            postCount={postCount}
            paginate={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
export default Boarder;
