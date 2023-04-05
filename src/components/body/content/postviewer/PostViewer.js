import { useState } from "react";
import ToastuiViewer from "./ToastuiViewer";
import PostViewerHeader from "./PostViewerHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function PostViewer() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getPost = () => {
    fetch(`http://localhost:8080/posts/${postId}`)
      .then((response) => {
        const json = response.json();
        if (!response.ok) {
          console.error("데이터 조회에 실패하였습니다.");
          return json;
        }
        return json;
      })
      .then((json) => {
        setLoading(false);
        setPost(json);
        json.errorCode ? setError(json.message) : setError(null);
      });
  };

  useEffect(() => {
    getPost();
    console.dir(post);
    console.log("error=" + error);
    localStorage.setItem("beforeLocation", localStorage.getItem("location"));
    localStorage.setItem("location", window.location.href);
    console.log(window.location.href);
    return () => {};
  }, []);

  return (
    <div className="h-100">
      {loading ? (
        <div></div>
      ) : (
        <div className="h-100 d-flex justify-content-center">
          {error ? (
            <h3 className="my-auto "> {error} </h3>
          ) : (
            <div className="container">
              <PostViewerHeader post={post}></PostViewerHeader>
              <ToastuiViewer content={post?.content}></ToastuiViewer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default PostViewer;
