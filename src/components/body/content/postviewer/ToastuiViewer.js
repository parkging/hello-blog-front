import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import styles from "./ToastuiViewer.module.css";

function ToastuiViewer({ content }) {
  return (
    <div className={styles.postViewer}>
      <Viewer
        initialValue={`${content}`}
        height="auto"
        plugins={[codeSyntaxHighlight]}
      />
    </div>
  );
}
export default ToastuiViewer;
