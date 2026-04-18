// <!--section:code-->```js
import lodash from "@11ty/lodash-custom";
const { get } = lodash;

/**
 * Core logic for filtering collection items by attribute value
 *
 * This function takes a collection, an attribute name, and a target value,
 * and returns items where the attribute matches the target value.
 * If the attribute is an array, it checks if the array includes the target value.
 *
 * Supports nested attribute names using dot notation (e.g., "data.tags").
 *
 * @param {Array} collection - The collection to filter
 * @param {string} attrName - The attribute name to check (supports dot notation for nested properties)
 * @param {*} targetValue - The value to match against
 * @returns {Array} Filtered collection
 */
export function attrIncludes(collection, attrName, targetValue) {
  // If no targetValue, return original collection
  if (!targetValue) {
    return collection;
  }

  return collection.filter((item) => {
    // Get the attribute value from the item (supports nested paths like "data.tags")
    const attrValue = get(item, attrName);

    // If the attribute is an array, check if it includes the target value
    if (Array.isArray(attrValue)) {
      return attrValue.includes(targetValue);
    }

    // Otherwise skip this item
    return false;
  });
}

/**
 * Registers the attr_includes filter with Eleventy
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function attrIncludesFilter(eleventyConfig) {
  eleventyConfig.addFilter("attr_includes", attrIncludes);
}
/*```

<!--section:docs-->
### `attr_includes`

A filter that filters a list of items by checking if an attribute array includes a target value. Supports nested attribute names using dot notation.

**Why use this?** When working with Eleventy collections, you often need to filter items based on tags or other array attributes in front matter. The `attr_includes` filter provides a flexible way to filter by any array attribute, with support for nested properties using dot notation.

##### Example: Get all posts that include `#javascript` tag

```jinja2 {data-caption="in .njk:"}
{% set js_posts = collections.all | attr_includes('data.tags', '#javascript') %}

{% for post in js_posts %}
  <h2>{{ post.data.title }}</h2>
{% endfor %}
```
<!--section--> */
