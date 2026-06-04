# Eleventy *Bl*ades &nbsp;<img src="https://img.shields.io/npm/v/@anyblades/eleventy-blades?label=plugin&color=white"> <img src="https://img.shields.io/npm/v/@anyblades/eleventy-blades-base?label=base&color=white">

<!--section:summary-->

<h1><mark>Ultimate blade kit</mark> <small>for</small> 11ty <span class="faded">/</span> Build&nbsp;Awesome</h1>

<big>Essential 11ty filters, pre/post-processors, and other toggleable features as a simple, configurable plugin.</big>

Includes [Base package](//11ty.blades.ninja/base/) and [Reusable npm scripts](//11ty.blades.ninja/scripts/) for a better DX.

<!--section:gh-only-->

---

## Quick start

<!--section:install,plugin-->

There are 5 ways to get started:

### <mark>A.</mark> Plugin install

```sh
npm install @anyblades/eleventy-blades
```

Then `addPlugin` to your 11ty config:

```js
import eleventyBladesPlugin from "@anyblades/eleventy-blades";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBladesPlugin);
}
```

You can toggle features/filters like this:

```js
eleventyConfig.addPlugin(eleventyBladesPlugin, {
  mdAutoRawTags: false,
  filters: { attr_set: false },
});
```

Live example: https://github.com/anyblades/eleventy-blades/blob/main/packages/eleventy-blades-base/eleventy.config.js

---

<!--section:install,config+starters-->

### <mark>B.</mark> Base config

```sh
npm install @anyblades/eleventy-blades-base
```

Then use `baseConfig` in your 11ty config:

```js
import baseConfig from "@anyblades/eleventy-blades-base";

export default async function (eleventyConfig) {
  await baseConfig(eleventyConfig);
}
```

You can toggle features/filters like this:

```js
await baseConfig(eleventyConfig, {
  plugins: {
    "@anyblades/eleventy-blades": {
      mdAutoRawTags: false,
      filters: { attr_set: false },
    },
  },
});
```

Live examples:

- https://github.com/johnheenan/minform/blob/main/eleventy.config.js
- https://github.com/hostfurl/minformhf/blob/main/eleventy.config.js

---

### <mark>C.</mark> Config via CLI

```sh
npm install @anyblades/eleventy-blades-base
eleventy --config=./node_modules/@anyblades/eleventy-blades-base/eleventy.config.js
```

Live examples:

- https://github.com/anyblades/subtle/blob/main/.11ty/package.json
- https://github.com/anyblades/buildawesome-starters/blob/main/package.json

---

### <mark>D.</mark> Config via symlink

```sh
npm install @anyblades/eleventy-blades-base
ln -s ./node_modules/@anyblades/eleventy-blades-base/eleventy.config.js
eleventy
```

---

### <mark>E.</mark> Starter projects

Eleventy *Bl*ades plugin is included out-of-the-box with:

- https://subtle.blades.ninja/ 11ty micro-starter
- https://github.com/anyblades/buildawesome-starters 11ty Tailwind CLI starter(s)

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

<!--section:featured-->

---

## <sup>Featured by</sup><!--Z-A-->

- https://www.11ty.dev/docs/plugins/community/
- https://11tybundle.dev/blog/11ty-bundle-88/
- [hamatti.org](https://hamatti.org/posts/markdown-content-split-to-sections-in-eleventy-and-nunjucks/#:~:text=section%20filter)
- [awesome-11ty](https://github.com/anyblades/awesome-11ty-buildawesome)

<!--{.markerless .columns}-->
