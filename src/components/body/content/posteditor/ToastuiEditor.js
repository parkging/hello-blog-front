import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import styles from "../postviewer/ToastuiViewer.module.css";

function ToastuiEditor() {
  return (
    <div className={styles.postEditor}>
      <Editor
        initialValue="```java
      public void main() {
      
      }
      ```"
        previewStyle="tab"
        height="auto"
        hideModeSwitch={true}
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[codeSyntaxHighlight]}
      />
    </div>
  );
}
export default ToastuiEditor;
