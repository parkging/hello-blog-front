import { useEffect } from "react";
import ToastuiEditor from "./ToastuiEditor";

function PostEditor() {
  useEffect(() => {
    localStorage.setItem("beforeLocation", localStorage.getItem("location"));
    localStorage.setItem("location", window.location.href);
    console.log(window.location.href);
    return () => {};
  }, []);
  return <ToastuiEditor></ToastuiEditor>;
}
export default PostEditor;
