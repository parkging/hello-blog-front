import { useState } from "react";
import ToastuiViewer from "./ToastuiViewer";
import PostViewerHeader from "./PostViewerHeader";
import Comment from "../comment/Comment";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function PostViewer({ jwt, changeTitle, changeOgMeta }) {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    changeTitle("게시글");
    getPost();
    return () => {};
  }, []);

  useEffect(() => {
    changeTitle(post.title);
    changeOgMeta(
      post.title,
      post.preview,
      post.thumbnailImageUrl,
      post.preview
    );
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
              <PostViewerHeader post={post} jwt={jwt}></PostViewerHeader>
              <ToastuiViewer content={post?.content}></ToastuiViewer>
              <Comment post={post}></Comment>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default PostViewer;
