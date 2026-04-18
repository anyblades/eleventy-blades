// <!--section:code-->```js
/**
 * attr_set filter - Override an attribute and return the object
 *
 * This filter takes an object, a key, and a value, and returns a new object
 * with the specified attribute set to the given value.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */

/**
 * Core attr_set function - Override an attribute and return a new object
 *
 * @param {Object} obj - The object to modify
 * @param {string} key - The attribute name to set
 * @param {*} value - The value to set for the attribute
 * @returns {Object} A new object with the specified attribute set to the given value
 */
export function attrSet(obj, key, value) {
  return {
    ...obj,
    [key]: value,
  };
}

export function attrSetFilter(eleventyConfig) {
  eleventyConfig.addFilter("attr_set", attrSet);
}
/*```

<!--section:docs-->
### `attr_set`

A filter that creates a new object with an overridden attribute value. This is useful for modifying data objects in templates without mutating the original. Or even constructing an object from scratch.

##### Example: How to pass object(s) as argument(s) to a filter in `.liquid`?

```liquid {data-caption="trick for '| renderContent' filter"}
{% assign _ctx = null | attr_set: 'collections', collections %}
{{ ... | renderContent: 'liquid,md', _ctx }}
```
<!--section--> */
