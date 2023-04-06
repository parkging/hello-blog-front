import { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import ToastuiEditor from "./ToastuiEditor";
import PostEditorHeader from "./PostEditorHeader";
import PostEditorFooter from "./PostEditorFooter";

function PostEditor() {
  const history = useHistory();
  const location = useLocation();
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [method] = useState(
    location.pathname === "/post/add" ? "POST" : "PATCH"
  );

  /**
   * PATCH / PUT 으로 Post 저장
   **/
  const savePost = () => {
    const url =
      "http://localhost:8080/posts" + (method === "PATCH" ? `/${postId}` : "");
    fetch(url, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        const json = response.json();
        if (!response.ok) {
          console.dir(response);
          console.error("게시글 저장에 실패하였습니다.");
          if (response.status === 400) {
            return json;
          } else {
            throw Error("게시글 저장에 실패하였습니다");
          }
        }
        return json;
      })
      .then((json) => {
        if (!!json.errorCode) {
          console.dir(json);
          const error = json;
          throw Error(error.message);
        } else {
          const postId = json;
          history.push(`/post/${postId}`);
        }
      })
      .catch((err) => {
        alert(err.message);
        // setError(err.message);
        setLoading(false);
        console.log("at PostEditor.js fetch data fail " + err.message);
      });
  };

  /**
   * GET으로 Post 조회
   **/
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

  /**
   * 최초 Mount시 이벤트
   **/
  useEffect(() => {
    if (method === "PATCH") {
      getPost();
    } else if (method === "POST") {
      setPost((prev) => {
        return {
          ...prev,
          // memberId: "1",
          title: "",
          content: "",
          thumbnailImageUrl: "",
        };
      });
      setLoading(false);
      setError(null);
    }
  }, []);

  useEffect(() => {
    // console.log(post);
  }, [post]);

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
              <PostEditorHeader
                post={post}
                setPost={setPost}
              ></PostEditorHeader>
              <ToastuiEditor
                content={post?.content}
                setPost={setPost}
              ></ToastuiEditor>
              <PostEditorFooter savePost={savePost}></PostEditorFooter>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default PostEditor;
