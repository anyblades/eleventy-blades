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
export default function (content) {
  const lines = String(content ?? "").split("\n");
  const minIndent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^(\s*)/)[1].length));
  return lines.map((l) => l.slice(minIndent)).join("\n");
}
/*```

<!--section:docs-->
### `unindent`
<!--section--> */
