/* <!--section:docs-->

### Hidden Markdown attributes using HTML comments <sub>`<!--{...}-—>` trick via `mdAutoUncommentAttrs` converter</sub> {#md-hidden-attrs}

This function amends the markdown library to automatically expand
HTML-comment-wrapped attribute blocks `<!—-{...}-->` to their raw form
`{...}`, which is useful when attribute syntax needs to be hidden from
HTML parsers but expanded before markdown-it processes them.

Implemented as a core rule so the transformation runs on the raw source
before markdown-it-attrs (or any other plugin) parses the content.

Usage example: https://github.com/anyblades/eleventy-blades/blob/main/src/eleventy.config.js

How it works:
```js */
export function transformUncommentAttrs(content) {
  if (content.includes("<!--{")) {
    content = content.replace(/<!--(\{[^}]*\})-->/g, "$1");
  }
  return content;
}

export default function mdAutoUncommentAttrs(eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.core.ruler.before("normalize", "uncomment_attrs", (state) => {
      state.src = transformUncommentAttrs(state.src);
    });
  });
}
/*```
<!--section--> */
