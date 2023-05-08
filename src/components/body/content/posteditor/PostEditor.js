import { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ToastuiEditor from "./ToastuiEditor";
import PostEditorHeader from "./PostEditorHeader";
import PostEditorFooter from "./PostEditorFooter";

function PostEditor({ member, changeTitle }) {
  const history = useHistory();
  const location = useLocation();
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [method] = useState(
    location.pathname === "/post/add" ? "POST" : "PATCH"
  );

  const getUrl = () => "/posts" + (method === "PATCH" ? `/${postId}` : "");

  /**
   * PATCH / PUT 으로 Post 저장
   **/
  const savePost = () => {
    axios({
      method: `${method}`,
      url: getUrl(),
      data: JSON.stringify(post),
      headers: {
        "Content-Type": `application/json`,
      },
    })
      .then((response) => {
        const postId = response.data;
        // history.push(`/post/${postId}`);
        //페이지 다시 랜더링
        window.location.href = `/post/${postId}`;
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? alert(error.response.data?.message)
          : alert(error.message);
        console.log("at PostEditor.js fetch data fail " + error.message);
      });
  };

  const deletePost = () => {
    axios
      .delete(`/posts/${postId}`)
      .then((response) => {
        window.location.href = `/`;
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setError(error.response.data?.message)
          : setError(error.message);
        setLoading(false);
        console.log("at PostEditor.js fetch data fail " + error);
      });
  };

  /**
   * GET으로 Post 조회
   **/
  const getPost = () => {
    axios
      .get(`/posts/${postId}`)
      .then((response) => {
        setLoading(false);
        setPost(response.data);
      })
      .catch((error) => {
        error.response.data?.errorCode
          ? setError(error.response.data?.message)
          : setError(error.message);
        setLoading(false);
        console.log("at PostEditor.js fetch data fail " + error);
      });
  };

  /**
   * 최초 Mount시 이벤트
   **/
  useEffect(() => {
    const title = method === "PATCH" ? "게시글 수정" : "게시글 작성";
    changeTitle(title);

    if (method === "PATCH") {
      getPost();
    } else if (method === "POST") {
      setPost((prev) => {
        return {
          ...prev,
          memberId: member.id,
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
              <PostEditorFooter
                savePost={savePost}
                deletePost={deletePost}
                method={method}
              ></PostEditorFooter>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default PostEditor;
