// <!--section:code-->```js
/**
 * Transform Nunjucks syntax in content by wrapping it with raw tags
 *
 * This function wraps Nunjucks syntax ({{, }}, {%, %}) with {% raw %} tags
 * to prevent them from being processed by the template engine.
 *
 * @param {string} content - The content to transform
 * @returns {string} The transformed content with Nunjucks syntax wrapped
 */
export function transformAutoRaw(content) {
  // This regex looks for {{, }}, {%, or %} individually and wraps them
  return content.replace(/({{|}}|{%|%})/g, "{% raw %}$1{% endraw %}");
}

/**
 * mdAutoRawTags - Forbid Nunjucks processing in Markdown files
 *
 * This preprocessor wraps Nunjucks syntax ({{, }}, {%, %}) with {% raw %} tags
 * to prevent them from being processed by the template engine in Markdown files.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function mdAutoRawTags(eleventyConfig) {
  eleventyConfig.addPreprocessor("mdAutoRawTags", "md", (data, content) => {
    return transformAutoRaw(content);
  });
}

/**
 * Transform \n sequences to <br> tags
 *
 * This function converts literal \n sequences (double backslash + n) to HTML <br> tags.
 * It handles both double \n\n and single \n sequences, processing double ones first.
 *
 * @param {string} content - The content to transform
 * @returns {string} The transformed content with \n converted to <br>
 */
export function transformNl2br(content) {
  // Replace double \n\n first, then single \n to avoid double conversion
  return content.replace(/\\n\\n/g, "<br>").replace(/\\n/g, "<br>");
}

/**
 * mdAutoNl2br - Auto convert \\n to <br> in markdown (especially tables)
 *
 * This function amends the markdown library to automatically convert \\n
 * to <br> tags in text content, which is particularly useful for line breaks
 * inside markdown tables where standard newlines don't work.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function mdAutoNl2br(eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.renderer.rules.text = (tokens, idx) => {
      return transformNl2br(tokens[idx].content);
    };
  });
}
/*```

<!--section:docs-->
### mdAutoRawTags preprocessor {#auto-raw}

Prevents Nunjucks syntax from being processed in Markdown files by automatically wrapping `{{`, `}}`, `{%`, and `%}` with `{% raw %}` tags.

**Why use this?** When writing documentation or tutorials about templating in Markdown files, you often want to show Nunjucks/Liquid syntax as literal text. This preprocessor automatically escapes these special characters so they display as-is instead of being processed by the template engine.

**Example:**

Before `mdAutoRawTags`, writing this in Markdown:

```markdown
### Using {{ variable }} to output variables
```

Would try to process `{{ variable }}` as a template variable. With `mdAutoRawTags`, it displays exactly as written.

### mdAutoNl2br converter {#auto-nl2br}

Automatically converts `\n` sequences to `<br>` tags in Markdown content. This is particularly useful for adding line breaks inside Markdown tables where standard newlines don't work.

**Why use this?** Markdown tables don't support multi-line content in cells. By using `\n` in your content, this preprocessor will convert it to `<br>` tags, allowing you to display line breaks within table cells and other content.

**Example:**

In your Markdown file:

```markdown
| Column 1               | Column 2                          |
| ---------------------- | --------------------------------- |
| Line 1\nLine 2\nLine 3 | Another cell\nWith multiple lines |
```

Will render as:

```html
<td>Line 1<br />Line 2<br />Line 3</td>
<td>Another cell<br />With multiple lines</td>
```

**Note:** This processes literal `\n` sequences (backslash followed by 'n'), not actual newline characters. Type `\n` in your source files where you want line breaks.

Automatically converts `\n` sequences to `<br>` tags in Markdown content. This is particularly useful for adding line breaks inside Markdown tables where standard newlines don't work.

**Why use this?** Markdown tables don't support multi-line content in cells. By using `\n` in your content, this preprocessor will convert it to `<br>` tags, allowing you to display line breaks within table cells and other content.

**Example:**

In your Markdown file:

```markdown
| Column 1               | Column 2                          |
| ---------------------- | --------------------------------- |
| Line 1\nLine 2\nLine 3 | Another cell\nWith multiple lines |
```

Will render as:

```html
<td>Line 1<br />Line 2<br />Line 3</td>
<td>Another cell<br />With multiple lines</td>
```

**Note:** This processes literal `\n` sequences (backslash followed by 'n'), not actual newline characters. Type `\n` in your source files where you want line breaks.
*/
