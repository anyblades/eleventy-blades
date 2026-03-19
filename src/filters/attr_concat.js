// <!--section:code-->```js
/**
 * Concatenate values to an attribute array
 *
 * This function takes an object, an attribute name, and values to append.
 * It returns a new object with the attribute as a combined array of unique items.
 *
 * @param {Object} obj - The object to modify
 * @param {string} attr - The attribute name
 * @param {Array|string|*} values - Values to concatenate (array, JSON string array, or single value)
 * @returns {Object} A new object with the combined unique array
 */
export function attrConcat(obj, attr, values) {
  // Get the existing attribute value, default to empty array if not present
  const existingArray = obj?.[attr] || [];

  // Check if existing value is an array, convert if not
  if (!Array.isArray(existingArray)) {
    console.error(`attrConcat: Expected ${attr} to be an array, got ${typeof existingArray}`);
  }

  // Process the values argument
  let valuesToAdd = [];
  if (Array.isArray(values)) {
    valuesToAdd = values;
  } else if (typeof values === "string" && values.length >= 2 && values.at(0) == "[" && values.at(-1) == "]") {
    // Try to parse as JSON array
    try {
      const parsed = JSON.parse(values);
      if (Array.isArray(parsed)) {
        valuesToAdd = parsed;
      } else {
        valuesToAdd = [values];
      }
    } catch {
      // Not valid JSON, treat as single value
      valuesToAdd = [values];
    }
  } else {
    // If it's a single value, wrap it in an array
    valuesToAdd = [values];
  }

  // Combine arrays and remove duplicates using Set
  const combinedArray = [...new Set([...existingArray, ...valuesToAdd])];

  // Return a new object with the combined array
  return {
    ...obj,
    [attr]: combinedArray,
  };
}

/**
 * attr_concat filter - Concatenate values to an attribute array
 *
 * This filter takes an object, an attribute name, and values to append.
 * It returns a new object with the attribute as a combined array of unique items.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function attrConcatFilter(eleventyConfig) {
  eleventyConfig.addFilter("attr_concat", attrConcat);
}
/*```

<!--section:docs-->
### `attr_concat`

A filter that concatenates values to an attribute array, returning a new object with the combined array. Useful for adding items to arrays like tags, classes, or other list-based attributes.

**Why use this?** When working with objects that have array attributes (like tags), you often need to add additional values without mutating the original object. The `attr_concat` filter provides a clean way to combine existing array values with new ones, automatically handling duplicates.

**Features:**

- Non-mutating: Creates a new object, leaving the original unchanged
- Automatically removes duplicates using Set
- Handles multiple input types: arrays, JSON string arrays (killer feature for `.liquid`), or single values
- Creates the attribute as an empty array if it doesn't exist
- Logs an error if the existing attribute is not an array
- `TBC:` Supports nested attributes (e.g., `data.tags`)

#### Example: Add tags to a post object in `.njk`:

```jinja2
{% set enhancedPost = post | attr_concat('tags', ['featured', 'popular']) %}
```

#### `PRO` Example: Add scripts and styles to the `site` object in `.liquid`:

```liquid
{% capture _ %}[
  "https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css",
  "https://cdn.jsdelivr.net/npm/prismjs@1/plugins/treeview/prism-treeview.min.css",
  "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/css/all.min.css",
  "/styles.css"
]{% endcapture %}
{% assign site = site | attr_concat: 'styles', _ %}

{% capture _ %}[
  "https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js",
  "https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js",
  "https://cdn.jsdelivr.net/npm/prismjs@1/plugins/treeview/prism-treeview.min.js"
]{% endcapture %}
{% assign site = site | attr_concat: 'scripts', _ %}
```
*/
