// <!--section:code-->```js
/**
 * if utility function - Ternary/conditional helper
 *
 * Returns trueValue if condition is truthy, otherwise returns falseValue.
 * Similar to Nunjucks' inline if: `value if condition else other_value`
 *
 * @param {*} trueValue - The value to return if condition is truthy
 * @param {*} condition - The condition to evaluate
 * @param {*} falseValue - The value to return if condition is falsy (default: empty string)
 * @returns {*} Either trueValue or falseValue based on condition
 */
export function iff(trueValue, condition, falseValue = "") {
  // Treat empty objects {} as falsy
  if (condition && typeof condition === "object" && !Array.isArray(condition) && Object.keys(condition).length === 0) {
    return falseValue;
  }
  return !!condition ? trueValue : falseValue;
}

/**
 * if filter - Inline conditional/ternary operator for templates
 *
 * This filter provides a simple inline if/else similar to Nunjucks.
 *
 * Usage in Liquid templates:
 *   {{ "Active" | if: isActive, "Inactive" }}
 *   {{ "Yes" | if: condition }}
 *   {{ someValue | if: test, otherValue }}
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function ifFilter(eleventyConfig) {
  eleventyConfig.addFilter("if", iff);
}
/*```

<!--section:docs-->
### `if`

An inline conditional/ternary operator filter that returns one value if a condition is truthy, and another if it's falsy. Similar to Nunjucks' inline if syntax, it is especially useful in `.liquid` templates.

**Features:**

- Returns `trueValue` if condition is truthy, otherwise returns `falseValue`
- Treats empty objects `{}` as falsy
- Default `falseValue` is an empty string if not provided
- Works with any data type for values

**Examples:** <!-- @TODO: better examples -->

```jinja2
{# Basic usage (defaults to empty string) #}
<div class="{{ 'active' | if: isActive | default: 'inactive' }}">Status</div>

{# Toggle CSS classes #}
<button class="{{ 'btn-primary' | if: isPrimary | default: 'btn-secondary' }}">
  Click me
</button>

{# Display different text #}
<p>{{ 'Online' | if: user.isOnline, 'Offline' }}</p>

{# Use with boolean values #}
{% set isEnabled = true %}
<div>{{ 'Enabled' | if: isEnabled, 'Disabled' }}</div>

{# Conditional attribute values #}
<input type="checkbox" {{ 'checked' | if: isChecked }}>

{# With numeric values #}
<span class="{{ 'has-items' | if: items.length }}">
  {{ items.length }} items
</span>

{# Chain with other filters #}
{% set cssClass = 'featured' | if: post.featured | upper %}
```
<!--section--> */
