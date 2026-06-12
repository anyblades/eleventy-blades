/*<!--section:docs-->

Adds global `site` data via `eleventyComputed`. All scalar fields from `pkg.site` (`package.json`) and `data.site` (`_data/site.*`) are spread onto `site`; page-level wins over pkg. The asset keys below are **merged** (pkg → site → page) rather than overridden; page-level strings are auto-wrapped in an array (so you can use a simple `inline_styles` as a string in front matter).

| Variable                    | Value / Description                                                          |
| --------------------------- | ---------------------------------------------------------------------------- |
| `{{ site.year }}`           | Current year (e.g. `2026`)                                                   |
| `{{ site.prod }}`           | `true` for `eleventy build`, `false` for `eleventy serve`                    |
| `{{ site.styles }}`         | Merged array of stylesheet URLs                                              |
| `{{ site.scripts }}`        | Merged array of script URLs                                                  |
| `{{ site.inline_styles }}`  | Merged array of inline CSS strings                                           |
| `{{ site.inline_scripts }}` | Merged array of inline JS strings                                            |

The named export `siteData(data)` is also usable directly (e.g. as RSS feed metadata).

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
