// <!--section:code-->```js
/**
 * Remove specified HTML element from provided HTML
 *
 * @param {string} html - The HTML content to process
 * @param {string} tagName - The tag name to remove
 * @returns {string} The HTML with the specified tag removed
 */
export function removeTag(html, tagName) {
  if (!html || typeof html !== "string") {
    return html;
  }

  if (typeof tagName !== "string" || !tagName) {
    return html;
  }

  // Escape special regex characters in tag name
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Remove opening and closing tags along with their content
  // This regex matches: <tag attributes>content</tag>
  const regex = new RegExp(`<${escapedTag}(?:\\s[^>]*)?>.*?<\\/${escapedTag}>`, "gis");
  let result = html.replace(regex, "");

  // Also remove self-closing tags: <tag />
  const selfClosingRegex = new RegExp(`<${escapedTag}(?:\\s[^>]*)?\\s*\\/?>`, "gi");
  result = result.replace(selfClosingRegex, "");

  return result;
}

/**
 * remove_tag filter - Remove specified HTML element from provided HTML
 *
 * Usage in templates:
 *   {{ htmlContent | remove_tag('script') }}
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function removeTagFilter(eleventyConfig) {
  eleventyConfig.addFilter("remove_tag", removeTag);
}
/*```

<!--section:docs-->
### `remove_tag`

A filter that removes a specified HTML element from provided HTML content. It removes the tag along with its content, including self-closing tags.

**Why use this?** When working with content from external sources or user-generated content, you may need to strip certain HTML tags for security or presentation purposes. The `remove_tag` filter provides a simple way to remove unwanted tags like `<script>`, `<style>`, or any other HTML elements from your content.

**Features:**

- Removes both opening and closing tags along with their content
- Handles self-closing tags (e.g., `<br />`, `<img />`)
- Handles tags with attributes
- Case-insensitive matching
- Non-destructive: Returns new string, doesn't modify original

**Security note:** While this filter can help sanitize HTML content, it should not be relied upon as the sole security measure. For critical security requirements, use a dedicated HTML sanitization library on the server side before content reaches your templates.

##### Example: Remove all script tags from content <!-- @TODO: better examples -->

```jinja2
{% set cleanContent = htmlContent | remove_tag('script') %}

{{ cleanContent | safe }}
```
<!--section--> */
