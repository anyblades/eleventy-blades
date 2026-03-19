// <!--section:code-->```js
/**
 * Strip a specified HTML element from provided HTML, keeping its inner content
 *
 * @param {string} html - The HTML content to process
 * @param {string} tagName - The tag name to strip (opening/closing tags removed, inner content kept)
 * @returns {string} The HTML with the specified tag stripped but its inner content preserved
 */
export function stripTag(html, tagName) {
  if (!html || typeof html !== "string") {
    return html;
  }

  if (typeof tagName !== "string" || !tagName) {
    return html;
  }

  // Escape special regex characters in tag name
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Remove opening tags (with optional attributes): <tag> or <tag attr="val">
  const openingRegex = new RegExp(`<${escapedTag}(?:\\s[^>]*)?>`, "gi");
  let result = html.replace(openingRegex, "");

  // Remove closing tags: </tag>
  const closingRegex = new RegExp(`<\\/${escapedTag}>`, "gi");
  result = result.replace(closingRegex, "");

  return result;
}

/**
 * strip_tag filter - Strip a specified HTML element, keeping its inner content
 *
 * Usage in templates:
 *   {{ htmlContent | strip_tag('div') }}
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function stripTagFilter(eleventyConfig) {
  eleventyConfig.addFilter("strip_tag", stripTag);
}
/*```

<!--section:docs-->
### `strip_tag`

A filter that strips a specified HTML element from content while keeping its inner content intact. Only the opening and closing tags are removed; everything inside the tag is preserved in place.

**Why use this?** When rendering HTML from a CMS or external source you sometimes need to unwrap a specific element (e.g. remove a wrapping `<div>` or `<section>`) without losing the content it contains. Unlike `remove_tag`, which discards the entire element and its content, `strip_tag` surgically removes only the tags themselves.

**Features:**

- Removes only the opening and closing tags — inner content is preserved
- Handles tags with any attributes
- Strips all occurrences of the tag, including nested ones
- Case-insensitive matching
- Non-destructive: Returns a new string, leaves the original unchanged

#### Example: Unwrap a wrapping `<div>` from content

```jinja2
{% set unwrapped = htmlContent | strip_tag('div') %}

{{ unwrapped | safe }}
```

Input:

```html
<div class="wrapper">
  <p>Hello</p>
  <p>World</p>
</div>
```

Output:

```html
<p>Hello</p>
<p>World</p>
```
<!--section--> */
