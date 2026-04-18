# 🥷 *Eleventy Bl*ades

<!--section:summary-->

Ultimate blade kit for 11ty (Build Awesome).

![](https://img.shields.io/github/v/release/anyblades/eleventy-blades?label=&color=darkslategray&style=for-the-badge&include_prereleases)
[![](https://img.shields.io/badge/Code-gainsboro?logo=github&logoColor=black&style=for-the-badge)](https://github.com/anyblades/eleventy-blades)
[![](https://img.shields.io/github/stars/anyblades/eleventy-blades?label=Star&labelColor=gainsboro&color=silver&style=for-the-badge)](https://github.com/anyblades/eleventy-blades)

<!--section:gh-only-->

## [Documentation ↗](https://blades.ninja/build-awesome-11ty/)

### [Filters](https://blades.ninja/build-awesome-11ty/filters/)

<!-- ToC from https://blades.ninja/build-awesome-11ty/#filters -->
<ul class="columns"><li><a href="https://blades.ninja/build-awesome-11ty/filters/#attr-concat" tabindex="-1">attr_concat</a></li><p></p>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#attr-includes" tabindex="-1">attr_includes</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#attr-set" tabindex="-1">attr_set</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#date" tabindex="-1">date</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#fetch" tabindex="-1">fetch</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#if" tabindex="-1">if</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#markdownify" tabindex="-1">markdownify</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#merge" tabindex="-1">merge</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#remove-tag" tabindex="-1">remove_tag</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#section" tabindex="-1">section</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#strip-tag" tabindex="-1">strip_tag</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#unindent" tabindex="-1">unindent</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/filters/#install" tabindex="-1">Install</a></li></ul>

### [Processors](https://blades.ninja/build-awesome-11ty/processors/)

<!-- ToC from https://blades.ninja/build-awesome-11ty/#processors -->
<ul class="columns"><li><a href="https://blades.ninja/build-awesome-11ty/processors/#auto-link-favicons" tabindex="-1">autoLinkFavicons postprocessor (transformer)</a></li><p></p>
<li><a href="https://blades.ninja/build-awesome-11ty/processors/#md-auto-raw" tabindex="-1">mdAutoRawTags preprocessor</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/processors/#md-auto-br" tabindex="-1">mdAutoNl2br converter</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/processors/#md-hidden-attrs" tabindex="-1">Hidden Markdown attributes using HTML comments</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/processors/#install" tabindex="-1">Install</a></li></ul>

### [Power tools](https://blades.ninja/build-awesome-11ty/tools/)

<!-- ToC from https://blades.ninja/build-awesome-11ty/#tools -->
<ul class="columns"><li><a href="https://blades.ninja/build-awesome-11ty/tools/#starters" tabindex="-1">Modern starters</a></li><p></p>
<li><a href="https://blades.ninja/build-awesome-11ty/tools/#base-config" tabindex="-1">Base eleventy.config.js</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/tools/#base-scripts" tabindex="-1">Base 11ty npm scripts via npm workspace</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/tools/#data-helpers" tabindex="-1">Data helpers</a></li>
<li><a href="https://blades.ninja/build-awesome-11ty/tools/#more" tabindex="-1">More</a><ul><li><a href="https://blades.ninja/build-awesome-11ty/tools/#find-and-kill-11ty-processes" tabindex="-1">Find and kill 11ty processes</a></li></ul></li></ul>

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

<!--section:gh-only-->

- https://github.com/anyblades/build-awesome-starter
- https://github.com/anyblades/bladeswitch starter
- https://github.com/johnheenan/minform starter
- https://github.com/hostfurl/minformhf starter

<!--section:featured-->

---

Featured by: <!--A-Z-->

- https://11tybundle.dev/blog/11ty-bundle-83/
- https://11tybundle.dev/blog/11ty-bundle-88/
- https://11tybundle.dev/categories/getting-started/
- https://github.com/anydigital/awesome-11ty-build-awesome
- https://hamatti.org/posts/markdown-content-split-to-sections-in-eleventy-and-nunjucks/#:~:text=anydigital

<!--{.unlist .columns}-->
