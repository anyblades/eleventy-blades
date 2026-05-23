// <!--section:code-->```js
/**
 * Format a date value as an ISO 8601 date string (YYYY-MM-DD)
 *
 * Accepts any value accepted by the Date constructor and returns
 * the date portion of the resulting ISO string.
 *
 * @param {string|number|Date} dateVal - The date value to format
 * @returns {string} The date formatted as YYYY-MM-DD
 */
export default function (dateVal) {
  return new Date(dateVal).toISOString().split("T")[0];
}
/*```

<!--section:docs-->
### `date`
<!--section:end--> */
