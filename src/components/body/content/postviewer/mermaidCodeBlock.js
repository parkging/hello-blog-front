import mermaid from "mermaid";

// htmlLabels defaults to true, which renders node/edge labels as HTML
// inside <foreignObject>. Its measured width sometimes ends up a few
// pixels narrower than the label actually needs, clipping the text
// (seen on erDiagram/flowchart labels). Native SVG <text> sizing (via
// getBBox) doesn't have this gap.
mermaid.initialize({ startOnLoad: false, htmlLabels: false });

export const mermaidHTMLRenderer = {
  codeBlock(node, context) {
    const language = (node.info || "").trim();
    if (language !== "mermaid") {
      return context.origin();
    }
    return [
      { type: "openTag", tagName: "div", classNames: ["mermaid"] },
      { type: "text", content: node.literal },
      { type: "closeTag", tagName: "div" },
    ];
  },
};

function isVisible(node) {
  return !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length);
}

export function renderMermaid(container) {
  if (!container) return;
  const nodes = Array.from(
    container.querySelectorAll(".mermaid:not([data-processed])")
  ).filter(isVisible);
  if (nodes.length === 0) return;
  mermaid.run({ nodes }).catch((error) => {
    console.log("at mermaidCodeBlock.js render fail " + error);
  });
}