// <!--section:code-->```js
/**
 * Remove the minimal common indentation from a multi-line string
 *
 * Finds the smallest leading-whitespace count across all non-empty lines
 * and strips that many characters from the beginning of every line.
 *
 * @param {string} content - The input string
 * @returns {string} The unindented string
 */
export function unindent(content) {
  const lines = String(content ?? "").split("\n");
  const minIndent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^(\s*)/)[1].length));
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

/**
 * unindent filter - Remove minimal common indentation
 *
 * Strips the smallest leading-whitespace indent shared by all non-empty
 * lines, useful for dedenting captured or indented template blocks.
 *
 * Usage in templates:
 *   {{ content | unindent }}
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function unindentFilter(eleventyConfig) {
  eleventyConfig.addFilter("unindent", unindent);
}
/*```

<!--section:docs-->
### `unindent`
<!--section--> */
