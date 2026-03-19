// <!--section:code-->```js
/**
 * Merge objects together
 *
 * Shallow merges objects (later values override earlier ones)
 *
 * @param {Object} first - The first object
 * @param {...Object} rest - Additional objects to merge
 * @returns {Object} The merged result
 */
export function merge(first, ...rest) {
  // If first argument is null or undefined, treat as empty object
  if (first === null || first === undefined) {
    first = {};
  }

  // Only support objects
  if (typeof first === "object" && !Array.isArray(first)) {
    // Merge objects using spread operator (shallow merge)
    return rest.reduce(
      (acc, item) => {
        if (item !== null && typeof item === "object" && !Array.isArray(item)) {
          return { ...acc, ...item };
        }
        return acc;
      },
      { ...first },
    );
  }

  // If first is not an object, return empty object
  return {};
}

/**
 * merge filter - Merge objects together
 *
 * This filter merges objects, similar to Twig's merge filter.
 *
 * Usage in templates:
 *   {{ obj1 | merge(obj2) }}
 *   {{ obj1 | merge(obj2, obj3) }}
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function mergeFilter(eleventyConfig) {
  eleventyConfig.addFilter("merge", merge);
}
/*```

<!--section:docs-->
### `merge`

A filter that merges arrays or objects together, similar to Twig's merge filter. For arrays, it concatenates them. For objects, it performs a shallow merge where later values override earlier ones.

**Why use this?** When working with data in templates, you often need to combine multiple arrays or objects. The `merge` filter provides a clean way to merge data structures without writing custom JavaScript, making it easy to combine collections, merge configuration objects, or aggregate data from multiple sources.

**Examples:** <!-- @TODO: better examples -->

```jinja2
{# Merge configuration objects #}
{% set defaultConfig = { theme: 'light', lang: 'en' } %}
{% set userConfig = { theme: 'dark' } %}
{% set finalConfig = defaultConfig | merge(userConfig) %}

{# Result: { theme: 'dark', lang: 'en' } #}
```

```jinja2
{# Merge page metadata with defaults #}
{% set defaultMeta = {
  author: 'Site Admin',
  category: 'general',
  comments: false
} %}
{% set pageMeta = defaultMeta | merge(page.data) %}
```
<!--section--> */
