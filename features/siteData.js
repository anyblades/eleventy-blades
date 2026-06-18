/*<!--section:docs-->

`siteData` adds global `site` data via `eleventyComputed`. All scalar fields from `pkg.site` (`package.json`) and `data.site` (`_data/site.*`) are spread onto `site`; page-level wins over pkg. The asset keys below are **merged** (pkg → site) rather than overridden.

| Variable             | Value / Description                                                          |
| -------------------- | ---------------------------------------------------------------------------- |
| `{{ site.year }}`     | Current year (e.g. `2026`)                                                   |
| `{{ site.prod }}`     | `true` for `eleventy build`, `false` for `eleventy serve`                    |
| `{{ site.styles }}`   | Merged array of stylesheet URLs                                              |
| `{{ site.scripts }}`  | Merged array of script URLs                                                  |
| `{{ site.head_extras }}` | Merged array of custom head HTML/strings                                   |
| `{{ site.body_extras }}` | Merged array of custom body HTML/strings                                   |

The named export `siteData(data)` is also usable directly (e.g. as RSS feed metadata).

<!--section:code-->```js */
const MERGED_KEYS = ["head_extras", "body_extras", "styles", "scripts"];

// Lodash style
const castArray = (val) => (val == null ? [] : Array.isArray(val) ? val : [val]);

export const siteData = (data) => {
  const pkgSite = data.pkg?.site ?? {};
  const dataSite = data.site ?? {};
  const mergeByKey = (key) => [...new Set([...castArray(pkgSite[key]), ...castArray(dataSite[key])])];
  return {
    ...pkgSite,
    ...dataSite,
    ...Object.fromEntries(MERGED_KEYS.map((key) => [key, mergeByKey(key)])),
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
