# Eleventy *Bl*ades &nbsp;![](https://img.shields.io/github/v/release/anyblades/eleventy-blades?label=&color=darkslategray)

<!--section:summary-->

<h1><mark>Ultimate blade kit</mark> <small>for</small> 11ty / Build&nbsp;Awesome</h1>

<big>Essential 11ty filters, pre/post-processors, and other toggleable features as a simple, configurable plugin.</big>

<!--section:gh-only-->

## Documentation

<ul class="columns">
  
  <li>
    <strong><a href="/plugin/">Get started</a></strong>
    <ul><li><a href="https://11ty.blades.ninja/plugin/">Plugin</a></li>
<li><a href="https://11ty.blades.ninja/base/">Base package</a></li>
<li><a href="https://11ty.blades.ninja/scripts/">Useful scripts</a></li>
<li><a href="https://11ty.blades.ninja/starters/">Starter projects</a></li></ul>
  </li>
  
  <li>
    <strong><a href="/features/">Features</a></strong>
    <ul><li><a href="https://11ty.blades.ninja/features/">Overview</a></li>
<li><a href="https://11ty.blades.ninja/features/site-globals/">Site globals</a></li>
<li><a href="https://11ty.blades.ninja/features/link-favicons/">Automatic link favicons</a></li>
<li><a href="https://11ty.blades.ninja/features/markdown-auto-raw/">Markdown auto-raw tags</a></li>
<li><a href="https://11ty.blades.ninja/features/markdown-hidden-attrs/">Markdown hidden attrs</a></li>
<li><a href="https://11ty.blades.ninja/features/markdown-newlines/">Markdown newlines</a></li></ul>
  </li>
  
  <li>
    <strong><a href="/templates/">Templates</a></strong>
    <ul><li><a href="https://blades.ninja/html/starter/">HTML base ↗</a></li>
<li><a href="https://blades.ninja/html/links/">Links ↗</a></li>
<li><a href="https://blades.ninja/html/sitemap/">Sitemap ↗</a></li>
<li><a href="https://11ty.blades.ninja/templates/">More</a></li></ul>
  </li>
  
  <li>
    <strong><a href="/filters/">Filters</a></strong>
    <ul><li><a href="https://11ty.blades.ninja/filters/attr_concat/">attr_concat</a></li>
<li><a href="https://11ty.blades.ninja/filters/attr_includes/">attr_includes</a></li>
<li><a href="https://11ty.blades.ninja/filters/attr_set/">attr_set</a></li>
<li><a href="https://11ty.blades.ninja/filters/date/">date</a></li>
<li><a href="https://11ty.blades.ninja/filters/fetch/">fetch</a></li>
<li><a href="https://11ty.blades.ninja/filters/if/">if</a></li>
<li><a href="https://11ty.blades.ninja/filters/markdownify/">markdownify</a></li>
<li><a href="https://11ty.blades.ninja/filters/merge/">merge</a></li>
<li><a href="https://11ty.blades.ninja/filters/remove_tag/">remove_tag</a></li>
<li><a href="https://11ty.blades.ninja/filters/section/">section</a></li>
<li><a href="https://11ty.blades.ninja/filters/strip_tag/">strip_tag</a></li>
<li><a href="https://11ty.blades.ninja/filters/unindent/">unindent</a></li></ul>
  </li>
  
  <li>
    <strong><a href="/awesome/">Awesome</a></strong>
    
  </li>
  
</ul>

---

<!--section:install-->

## Install

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

Living example: https://github.com/johnheenan/minform/blob/main/eleventy.config.js

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

- https://github.com/anyblades/build-awesome-starter
- https://github.com/anyblades/bladeswitch starter
- https://github.com/johnheenan/minform starter
- https://github.com/hostfurl/minformhf starter

<!--section:featured-->

---

## <sup>Featured by</sup><!--A-Z-->

- [awesome-11ty-buildawesome](https://github.com/anyblades/awesome-11ty-buildawesome)
- [hamatti.org](https://hamatti.org/posts/markdown-content-split-to-sections-in-eleventy-and-nunjucks/#:~:text=section%20filter)
- https://11tybundle.dev/blog/11ty-bundle-88/

<!--{.markerless .columns}-->
