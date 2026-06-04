/*<!--section:docs-->

`siteData` feature adds global `site` data to your Eleventy project, providing commonly needed values that can be accessed in all templates:

| Variable          | Value                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `{{ site.year }}` | The current year as a number (e.g., `2026`)                                                                  |
| `{{ site.prod }}` | Boolean indicating if running in production mode (`true` for `eleventy build`, `false` for `eleventy serve`) |

<!--section:code-->```js */
export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("site.prod", () => process.env.ELEVENTY_RUN_MODE === "build");
  eleventyConfig.addGlobalData("site.year", () => new Date().getFullYear());
}
//```
