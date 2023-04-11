import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import styles from "../postviewer/ToastuiViewer.module.css";
import { useRef } from "react";

function ToastuiEditor({ content, setPost }) {
  const editorRef = useRef();
  const editorChange = () => {
    setPost((current) => {
      return {
        ...current,
        content: editorRef.current?.getInstance().getMarkdown(),
      };
    });
    console.dir();
  };
  return (
    <div className={styles.postEditor}>
      <Editor
        initialValue={`${content ? content : ""}`}
        previewStyle="tab"
        height="auto"
        hideModeSwitch={true}
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[codeSyntaxHighlight]}
        onBlur={editorChange}
        ref={editorRef}
      />
    </div>
  );
}
export default ToastuiEditor;
