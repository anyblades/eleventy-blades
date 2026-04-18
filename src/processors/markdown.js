/* <!--section:docs-->

### `mdAutoRawTags` preprocessor {#md-auto-raw}

This preprocessor wraps template syntax `{{, }}, {%, %}` with `{% raw %}` tags
to prevent them from being processed by the template engine in Markdown files.

Usage example: https://github.com/anyblades/eleventy-blades/blob/main/src/eleventy.config.js

How it works:
```js */
export function mdAutoRawTags(eleventyConfig) {
  eleventyConfig.addPreprocessor("mdAutoRawTags", "md", (data, content) => {
    return transformAutoRaw(content);
  });
}
// Underlying helper function
export function transformAutoRaw(content) {
  // This regex looks for {{, }}, {%, or %} individually and wraps them
  return content.replace(/({{|}}|{%|%})/g, "{% raw %}$1{% endraw %}");
}
/*```

### `mdAutoNl2br` converter {#md-auto-br}

This function amends the markdown library to automatically convert `\n`
to `<br>` tags in text content, which is particularly useful for line breaks
inside markdown tables where standard newlines don't work.

> **NOTE:** This processes literal `\n` sequences (backslash followed by 'n'), not actual newline characters. Type `\n` in your source files where you want line breaks.

Usage example: https://github.com/anyblades/eleventy-blades/blob/main/src/eleventy.config.js

How it works:
```js */
export function mdAutoNl2br(eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.renderer.rules.text = (tokens, idx) => {
      return transformNl2br(tokens[idx].content);
    };
  });
}
// Underlying helper function
export function transformNl2br(content) {
  // Replace double \n\n first, then single \n to avoid double conversion
  return content.replace(/\\n\\n/g, "<br>").replace(/\\n/g, "<br>");
}
/*```

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
export function mdAutoUncommentAttrs(eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.core.ruler.before("normalize", "uncomment_attrs", (state) => {
      state.src = transformUncommentAttrs(state.src);
    });
  });
}
// Underlying helper function
export function transformUncommentAttrs(content) {
  if (content.includes("<!--{")) {
    content = content.replace(/<!--(\{[^}]*\})-->/g, "$1");
  }
  return content;
}
/*```
<!--section--> */
