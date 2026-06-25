# Eleventy *Bl*ades &nbsp;<img src="https://img.shields.io/npm/v/@anyblades/eleventy-blades?label=plugin&color=white"> <img src="https://img.shields.io/npm/v/@anyblades/eleventy-blades-base?label=base&color=white">

<!--section:summary-->

<h1><mark>Ultimate blade kit</mark> <small>for</small> 11ty <span class="faded">/</span> Build&nbsp;Awesome</h1>

<big>Essential 11ty [filters](//11ty.blades.ninja/filters/), transforms, and other toggleable [features](//11ty.blades.ninja/features/) as a simple, configurable plugin. Reusable [npm scripts](//11ty.blades.ninja/scripts/) included.</big>

<nav>
  <a href="//11ty.blades.ninja/plugin/" role="button">Get started&nbsp;&nbsp;›</a>
  <span hidden>•</span>
  <a href="//11ty.blades.ninja/base/" role="button" class="outline">
    Base <span hidden>package</span> <i class="fa-brands fa-eleventy"></i>&nbsp;&nbsp;›
  </a>
  <span hidden>•</span>
  <a href="//11ty.blades.ninja/starters/" role="button" class="outline">Micro-starters&nbsp;&nbsp;🌱</a>
</nav>

<!--section:gh-only-->

---

## Quick start

<!--section:install-->

There are 3 ways to get started:

### <mark>A.</mark> Plugin install

Plugin gives you all the features and filters in one go without interfering with the rest of your 11ty config:

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

Live examples:

- https://github.com/anyblades/eleventy-blades/tree/main/examples/plugin-usage
- https://github.com/anyblades/eleventy-blades/tree/main/packages/eleventy-blades-base

<!--section:install,install-starters-->

---

### <mark>B.</mark> Starter projects

Eleventy *Bl*ades plugin and base package are included out-of-the-box with:

`BA v4` [6-in-1 Starter](https://github.com/anyblades/buildawesome-starters)
: Modern, lightweight Eleventy v4 multi-site starter showcasing Eleventy Blades Kit and Tailwind CLI for: [1] Tailwind CSS + Typography [2] Blades CSS [3] Bootstrap CSS [4] Pico CSS [5] Simple CSS [6] Liquid Templates.

`11ty v4` [*S*ubtle](https://github.com/anyblades/subtle)
: The most subtle Eleventy v4 micro-starter for content-first sites. Powered by Eleventy Blades Kit

Built-in bare-minimum examples
: https://github.com/anyblades/eleventy-blades/tree/main/examples

<!--section:install-->

---

### <mark>C.</mark> Base package

<!--section:install,install-base-->

Base package bundles Eleventy *Bl*ades with other popular 11ty plugins, providing a ready-to-go reusable, zero-maintenance config:

```sh
npm install @anyblades/eleventy-blades-base

# Link base templates:
cd _includes/
ln -s ../node_modules/@anyblades/blades/_includes/blades

# Run Eleventy:
eleventy --config=node_modules/@anyblades/eleventy-blades-base/eleventy.config.js
```

Live examples:

- https://github.com/anyblades/buildawesome-starters
- https://github.com/anyblades/subtle/tree/main/.11ty

<div><hr></div>

If you don't want to type `--config=...` every time, symlink it once:

```sh
ln -s node_modules/@anyblades/eleventy-blades-base/eleventy.config.js
eleventy
```

Or save it in your `package.json` scripts:

```json
  "scripts": {
    "build": "eleventy --config=node_modules/@anyblades/eleventy-blades-base/eleventy.config.js"
  }
```

<div><hr></div>

Alternatively, import it as a base config in your 11ty config:

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

<!--section:featured-->

## <sup style>Featured by</sup><!--A-Z sites, then @users-->

- [11ty.dev](https://www.11ty.dev/docs/starter/#:~:text=blades) + [↗](https://www.11ty.dev/docs/plugins/community/#:~:text=blades)
- [11tybundle.dev](https://11tybundle.dev/blog/11ty-bundle-88/#:~:text=blades)
- [sveltiacms.app](https://sveltiacms.app/en/docs/frameworks/eleventy#:~:text=anyblades)
- [@hamatti](https://hamatti.org/posts/markdown-content-split-to-sections-in-eleventy-and-nunjucks/#:~:text=section%20filter)
- [@johnheenan](https://github.com/johnheenan/minform#css-and-performance)

<!--{.markerless .columns}-->
