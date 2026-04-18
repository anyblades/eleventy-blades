# 🥷 *Eleventy Bl*ades

<!--section:summary-->

Ultimate blade kit for 11ty (Build Awesome).

![](https://img.shields.io/github/v/release/anyblades/eleventy-blades?label=&color=darkslategray&style=for-the-badge&include_prereleases)
[![](https://img.shields.io/badge/Code-gainsboro?logo=github&logoColor=black&style=for-the-badge)](https://github.com/anyblades/eleventy-blades)
[![](https://img.shields.io/github/stars/anyblades/eleventy-blades?label=Star&labelColor=gainsboro&color=silver&style=for-the-badge)](https://github.com/anyblades/eleventy-blades)

<!--section:gh-only-->

## [Documentation ↗](https://blades.ninja/build-awesome-11ty/)

<!--prettier-ignore-->
<!--#TODO-->

---

## Install

<!--section:install-->

```sh
npm install @anyblades/eleventy-blades
```

Then choose one of the following options:

###### <mark>A. All-in</mark> managed by Eleventy Blades:

Consider symlinking entire `eleventy.config.js` as a set-and-forget zero-config zero-maintenance solution:

```sh
ln -s ./node_modules/@anyblades/eleventy-blades/src/eleventy.config.js
```

Learn more: https://blades.ninja/11ty/tools/#base-config

Living examples:

- https://github.com/anyblades/build-awesome-starter
- https://github.com/anyblades/bladeswitch

###### <mark>B. Base config</mark> by Eleventy Blades with overrides in `eleventy.config.js`:

```js
import baseConfig from "@anyblades/eleventy-blades/base-config";

export default function (eleventyConfig) {
  baseConfig(eleventyConfig);

  // Your additions/overrides
  ...
}
```

Living example: https://github.com/hostfurl/minformhf/blob/main/eleventy.config.js

###### <mark>C. Plug-in</mark> Eleventy Blades in existing `eleventy.config.js`:

```js
import eleventyBladesPlugin from "@anyblades/eleventy-blades";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBladesPlugin, {
    mdAutoRawTags: true,
    mdAutoNl2br: true,
    autoLinkFavicons: true,
    siteData: true,
    filters: ["attr_set", "attr_concat", ...],
  });
}
```

###### <mark>D. Individual imports</mark> from Eleventy Blades in `eleventy.config.js`:

```js
import { siteData, mdAutoRawTags, mdAutoNl2br, autoLinkFavicons, attrSetFilter, attrConcatFilter, ... } from "@anyblades/eleventy-blades";

export default function (eleventyConfig) {
  siteData(eleventyConfig);
  mdAutoRawTags(eleventyConfig);
  mdAutoNl2br(eleventyConfig);
  autoLinkFavicons(eleventyConfig);
  attrSetFilter(eleventyConfig);
  attrConcatFilter(eleventyConfig);
  ...
}
```

###### <mark>E. Included with</mark>

<!--section:gh-only-->

- https://github.com/anyblades/build-awesome-starter
- https://github.com/anyblades/bladeswitch starter

<!--section:featured-->

---

Featured by: <!--A-Z-->

- https://11tybundle.dev/blog/11ty-bundle-83/
- https://11tybundle.dev/blog/11ty-bundle-88/
- https://11tybundle.dev/categories/getting-started/
- https://github.com/anydigital/awesome-11ty-build-awesome
- https://hamatti.org/posts/markdown-content-split-to-sections-in-eleventy-and-nunjucks/#:~:text=anydigital

<!--{.unlist .columns}-->
