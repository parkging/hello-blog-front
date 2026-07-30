import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import { mermaidHTMLRenderer, renderMermaid } from "./mermaidCodeBlock";
import styles from "./ToastuiViewer.module.css";
import { useEffect, useRef } from "react";

function ToastuiViewer({ content }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    renderMermaid(viewerRef.current?.getRootElement());
  }, []);

  return (
    <div className={styles.postViewer}>
      <Viewer
        initialValue={`${content}`}
        height="auto"
        plugins={[codeSyntaxHighlight]}
        customHTMLRenderer={mermaidHTMLRenderer}
        ref={viewerRef}
      />
    </div>
  );
}
export default ToastuiViewer;
