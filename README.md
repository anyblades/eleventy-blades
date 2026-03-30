<!--section:index-->

## <sup>Build Awesome plugin</sup><br> [Eleventy blades](/build-awesome-11ty/) <!--{#11ty}-->

Ultimate blade kit for 11ty (Build Awesome).

<!--section:index,toc-->
<!--prettier-ignore-->
- [Filters](              https://blades.ninja/build-awesome-11ty/filters/)
  - [attr_concat](        https://blades.ninja/build-awesome-11ty/filters/#attr-concat),
    [attr_includes](      https://blades.ninja/build-awesome-11ty/filters/#attr-includes),
    [attr_set](           https://blades.ninja/build-awesome-11ty/filters/#attr-set)
  - [date](               https://blades.ninja/build-awesome-11ty/filters/#date)
  - [fetch](              https://blades.ninja/build-awesome-11ty/filters/#fetch) <!--{data-marker=🥷}-->
  - [if](                 https://blades.ninja/build-awesome-11ty/filters/#if)
  - [markdownify](        https://blades.ninja/build-awesome-11ty/filters/#markdownify)
  - [merge](              https://blades.ninja/build-awesome-11ty/filters/#merge)
  - [remove_tag](         https://blades.ninja/build-awesome-11ty/filters/#remove-tag),
    [strip_tag](          https://blades.ninja/build-awesome-11ty/filters/#strip-tag)
  - [section](            https://blades.ninja/build-awesome-11ty/filters/#section) <!--{data-marker=🥷}-->
  - [unindent](           https://blades.ninja/build-awesome-11ty/filters/#unindent)
- [Processors](           https://blades.ninja/build-awesome-11ty/processors/)
  - [Auto link favicons]( https://blades.ninja/build-awesome-11ty/processors/#auto-link-favicons) <!--{data-marker=🥷}-->
  - [Auto-raw tags](      https://blades.ninja/build-awesome-11ty/processors/#md-auto-raw)
  - [Auto newlines-to-br](https://blades.ninja/build-awesome-11ty/processors/#md-auto-br)
  - [Hidden markdown attrs<i>&nbsp;🆕</i>](https://blades.ninja/build-awesome-11ty/processors/#md-hidden-attrs) <!--{data-marker=🥷}-->
- [Power tools](          https://blades.ninja/build-awesome-11ty/tools/)
  - [Base config file](   https://blades.ninja/build-awesome-11ty/tools/#base-config) <!--{data-marker=🥷}-->
  - [Base npm scripts](   https://blades.ninja/build-awesome-11ty/tools/#base-scripts) <!--{data-marker=🥷}-->
  - [Data helpers](       https://blades.ninja/build-awesome-11ty/tools/#data-helpers)
  - [Blades starters](    https://blades.ninja/build-awesome-11ty/tools/#starters) <!--{data-marker=🥷}-->

<!--{.unlist .columns}-->

<!--section:index,install-->
<details><summary role="button" class="outline" id="install-11ty-blades"><b>Install Eleventy blades</b></summary>

```sh
npm install @anydigital/eleventy-blades
```

Then choose one of the following options:

<mark>A. All-in</mark> managed by Eleventy Blades:

Consider symlinking entire `eleventy.config.js` as a set-and-forget zero-config zero-maintenance solution:

```sh
ln -s ./node_modules/@anydigital/eleventy-blades/src/eleventy.config.js
```

Learn more: https://blades.ninja/build-awesome-11ty/tools/#base-config

Living examples:

- https://github.com/anydigital/build-awesome-starter
- https://github.com/anydigital/bladeswitch

<mark>B. Base config</mark> by Eleventy Blades with your additions/overrides in `eleventy.config.js`:

```js
import baseConfig from "@anydigital/eleventy-blades/base-config";

export default function (eleventyConfig) {
  baseConfig(eleventyConfig);

  // Your additions/overrides
  ...
}
```

Living example: https://github.com/hostfurl/minformhf/blob/main/eleventy.config.js

<mark>C. Plug-in</mark> Eleventy Blades in your existing `eleventy.config.js`:

```js
import eleventyBladesPlugin from "@anydigital/eleventy-blades";

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

<mark>D. Individual imports</mark> from Eleventy Blades in your `eleventy.config.js`:

```js
import { siteData, mdAutoRawTags, mdAutoNl2br, autoLinkFavicons, attrSetFilter, attrConcatFilter, ... } from "@anydigital/eleventy-blades";

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

</details>

Or use one of preconfigured templates:

<nav>

[🥷 Build Awesome Starter ↗ &nbsp;<small style="white-space: nowrap">11ty ⁺ Tailwind ⁺ Typography ⁺ Blades</small>](https://github.com/anydigital/build-awesome-starter)<!--{role=button .outline}-->

[🥷 Bladeswitch Starter ↗ &nbsp;<small style="white-space: nowrap">11ty ⁺ Pico ⁺ Blades</small>](https://github.com/anydigital/bladeswitch)<!--{role=button .outline}-->

</nav>

<!--section:gh-only-->

---

Featured by:

- https://11tybundle.dev/blog/11ty-bundle-83/
- https://11tybundle.dev/categories/getting-started/
- https://hamatti.org/posts/markdown-content-split-to-sections-in-eleventy-and-nunjucks/#:~:text=anydigital
- https://github.com/anydigital/awesome-11ty-build-awesome
