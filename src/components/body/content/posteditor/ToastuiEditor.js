import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import {
  mermaidHTMLRenderer,
  renderMermaid,
} from "../postviewer/mermaidCodeBlock";
import styles from "../postviewer/ToastuiViewer.module.css";
import { useEffect, useRef } from "react";

function ToastuiEditor({ content, setPost }) {
  const editorRef = useRef();
  const editorChange = () => {
    setPost((current) => {
      return {
        ...current,
        content: editorRef.current?.getInstance().getMarkdown(),
      };
    });
  };

  // Registered imperatively (not via onXxx props) because the react-editor
  // wrapper re-binds all onXxx props on every prop change by calling
  // instance.off(eventName) first, which wipes out the editor's own
  // internal listeners (e.g. the preview tab's show/hide toggle) for that
  // event, not just ours.
  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (!instance) return;
    const rerenderMermaid = () =>
      renderMermaid(editorRef.current?.getRootElement());
    instance.on("afterPreviewRender", rerenderMermaid);
    instance.on("changePreviewTabPreview", () =>
      setTimeout(rerenderMermaid)
    );
  }, []);

  return (
    <div className={styles.postEditor}>
      <Editor
        initialValue={`${content ? content : ""}`}
        previewStyle="tab"
        height="auto"
        hideModeSwitch={true}
        initialEditType="markdown"
        useCommandShortcut={true}
        customHTMLRenderer={mermaidHTMLRenderer}
        onBlur={editorChange}
        ref={editorRef}
      />
    </div>
  );
}
export default ToastuiEditor;
