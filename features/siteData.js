/*<!--section:docs-->

`siteData` feature adds global `site` data to your Eleventy project, providing commonly needed values that can be accessed in all templates:

| Variable          | Value                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `{{ site.year }}` | The current year as a number (e.g., `2026`)                                                                  |
| `{{ site.prod }}` | Boolean indicating if running in production mode (`true` for `eleventy build`, `false` for `eleventy serve`) |

<!--section:code-->```js */
export const siteData = (data) => {
  const pkg = data.pkg.site ?? {};
  const site = data.site ?? {};
  // pkg → site → data (page-level); [].concat wraps strings or spreads arrays
  const merge = (key) => [...(pkg[key] ?? []), ...(site[key] ?? []), ...[].concat(data[key] ?? [])];
  return {
    ...pkg,
    ...site, // scalar overrides: site wins over pkg
    inline_styles: merge("inline_styles"), // data.inline_styles is a string
    inline_scripts: merge("inline_scripts"), // data.inline_scripts is a string
    styles: merge("styles"), // data.styles is an array
    scripts: merge("scripts"), // data.scripts is an array
  };
};

export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("eleventyComputed", {
    site: (data) => ({
      ...siteData(data),
      prod: process.env.ELEVENTY_RUN_MODE === "build",
      year: new Date().getFullYear(),
    }),
  });
}
//```
