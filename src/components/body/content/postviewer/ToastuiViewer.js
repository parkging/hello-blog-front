import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
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
        customHTMLRenderer={mermaidHTMLRenderer}
        ref={viewerRef}
      />
    </div>
  );
}
export default ToastuiViewer;
