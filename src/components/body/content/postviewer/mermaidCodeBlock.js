import mermaid from "mermaid";
import Prism from "prismjs";
import prismComponents from "prismjs/components.json";
import getPrismLoader from "prismjs/dependencies.js";

// prismjs/prism.js only ships markup/css/clike/javascript by default. Load
// every other language component, in the dependency order prismjs itself
// computes (e.g. typescript requires javascript first), so any language
// fenced in a post is highlighted without having to list it here by hand.
const requirePrismComponent = require.context(
  "prismjs/components",
  false,
  /^\.\/prism-(?!.*\.min\.js$).+\.js$/
);
const allLanguageIds = Object.keys(prismComponents.languages).filter(
  (id) => id !== "meta"
);
getPrismLoader(prismComponents, allLanguageIds).load((id) => {
  requirePrismComponent(`./prism-${id}.js`);
});

// htmlLabels defaults to true, which renders node/edge labels as HTML
// inside <foreignObject>. Its measured width sometimes ends up a few
// pixels narrower than the label actually needs, clipping the text
// (seen on erDiagram/flowchart labels). Native SVG <text> sizing (via
// getBBox) doesn't have this gap.
mermaid.initialize({ startOnLoad: false, htmlLabels: false });

export const mermaidHTMLRenderer = {
  // Toast UI merges plugin-provided and user-provided customHTMLRenderers by
  // key, so defining our own `codeBlock` here completely replaces (not
  // chains with) the code-syntax-highlight plugin's `codeBlock` renderer.
  // context.origin() falls back to the built-in unhighlighted renderer, not
  // the plugin's — so non-mermaid code blocks must be Prism-highlighted here.
  codeBlock(node) {
    const language = (node.info || "").trim();
    if (language === "mermaid") {
      return [
        { type: "openTag", tagName: "div", classNames: ["mermaid"] },
        { type: "text", content: node.literal },
        { type: "closeTag", tagName: "div" },
      ];
    }

    const preClasses = language ? [`lang-${language}`] : [];
    const registeredLang = Prism.languages[language];
    const content = registeredLang
      ? Prism.highlight(node.literal, registeredLang, language)
      : node.literal;

    return [
      { type: "openTag", tagName: "pre", classNames: preClasses },
      { type: "openTag", tagName: "code" },
      { type: "html", content },
      { type: "closeTag", tagName: "code" },
      { type: "closeTag", tagName: "pre" },
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