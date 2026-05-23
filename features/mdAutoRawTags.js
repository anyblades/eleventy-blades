/* <!--section:docs-->

### `mdAutoRawTags` preprocessor {#md-auto-raw}

This preprocessor wraps template syntax `{{, }}, {%, %}` with `{% raw %}` tags
to prevent them from being processed by the template engine in Markdown files.

Usage example: https://github.com/anyblades/eleventy-blades/blob/main/src/eleventy.config.js

How it works:
```js */
export function transformAutoRaw(content) {
  // This regex looks for {{, }}, {%, or %} individually and wraps them
  return content.replace(/({{|}}|{%|%})/g, "{% raw %}$1{% endraw %}");
}

export default function mdAutoRawTags(eleventyConfig) {
  eleventyConfig.addPreprocessor("mdAutoRawTags", "md", (data, content) => {
    return transformAutoRaw(content);
  });
}
/*```
<!--section--> */
