// <!--section:code-->```js
/**
 * Add site.year and site.prod global data
 * - site.prod: Boolean indicating if running in production mode (build) vs development (serve)
 * - site.year: Sets the current year to be available in all templates as {{ site.year }}
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function siteData(eleventyConfig) {
  eleventyConfig.addGlobalData("site.prod", () => process.env.ELEVENTY_RUN_MODE === "build");
  eleventyConfig.addGlobalData("site.year", () => new Date().getFullYear());
}
/*```

<!--section:docs-->
### Data helpers

Adds global `site` data to your Eleventy project, providing commonly needed values that can be accessed in all templates:

| Variable          | Value                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `{{ site.year }}` | The current year as a number (e.g., `2026`)                                                                  |
| `{{ site.prod }}` | Boolean indicating if running in production mode (`true` for `eleventy build`, `false` for `eleventy serve`) |

<!--section--> */
