// <!--section:code-->```js

/* Plugins */
import { RenderPlugin } from "@11ty/eleventy";
import eleventyBladesPlugin from "@anydigital/eleventy-blades";
/* Dynamic plugins */
let eleventyNavigationPlugin;
try {
  eleventyNavigationPlugin = (await import("@11ty/eleventy-navigation")).default;
} catch (e) {
  // @11ty/eleventy-navigation not installed
}
let pluginTOC;
try {
  pluginTOC = (await import("@uncenter/eleventy-plugin-toc")).default;
} catch (e) {
  // @uncenter/eleventy-plugin-toc not installed
}
let feedPlugin;
try {
  feedPlugin = (await import("@11ty/eleventy-plugin-rss")).feedPlugin;
} catch (e) {
  // @11ty/eleventy-plugin-rss not installed
}
/* Libraries */
import markdownIt from "markdown-it";
/* Dynamic libraries */
let slugify;
try {
  slugify = (await import("@sindresorhus/slugify")).default;
} catch (e) {
  // @sindresorhus/slugify not installed
}
let markdownItAnchor;
try {
  markdownItAnchor = (await import("markdown-it-anchor")).default;
} catch (e) {
  // markdown-it-anchor not installed
}
let markdownItAttrs;
try {
  markdownItAttrs = (await import("markdown-it-attrs")).default;
} catch (e) {
  // markdown-it-attrs not installed
}
/* Data */
import yaml from "js-yaml";
import { readFileSync } from "node:fs";

/**
 * Eleventy Configuration
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @returns {Object} The Eleventy configuration object
 */
export default function (eleventyConfig) {
  const inputDir = eleventyConfig.directories.input;

  /* Jekyll parity */
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addGlobalData("layout", "default");
  eleventyConfig.setLiquidOptions({ dynamicPartials: false }); // allows unquoted Jekyll-style includes
  eleventyConfig.addFilter("relative_url", (content) => content);

  /* Plugins */
  eleventyConfig.addPlugin(RenderPlugin);
  if (eleventyNavigationPlugin) eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyBladesPlugin, {
    mdAutoNl2br: true,
    mdAutoRawTags: true,
    autoLinkFavicons: true,
    siteData: true,
    filters: [
      "attr_set",
      "attr_includes",
      "merge",
      "remove_tag",
      "if",
      "attr_concat",
      "fetch",
      "section",
      "strip_tag",
      "unindent",
    ],
  });
  if (pluginTOC) {
    eleventyConfig.addPlugin(pluginTOC, {
      ignoredElements: ["sub", "[data-is-anchor]"],
      ul: true,
      wrapper: (toc) => `<div data-is-toc>${toc}</div>`,
    });
  }
  // https://www.11ty.dev/docs/plugins/rss/#virtual-template
  if (feedPlugin) {
    eleventyConfig.addCollection("feed", (collectionApi) => collectionApi.getAll().filter((item) => item.data.revised));
    let siteData = {};
    try {
      siteData = yaml.load(readFileSync(`${inputDir}/_data/site.yml`, "utf8"));
    } catch (e) {
      // _data/site.yml not found
    }
    eleventyConfig.addPlugin(feedPlugin, {
      type: "atom", // or "rss", "json"
      outputPath: "/feed.xml",
      collection: {
        name: "feed", // iterate over `collections.posts`
        limit: 100, // 0 means no limit
      },
      metadata: siteData,
    });
  }

  /* Libraries */
  let md = markdownIt({
    html: true,
    linkify: true,
  });
  if (markdownItAnchor) {
    md = md.use(markdownItAnchor, {
      slugify: slugify, // @TODO: TRICKS
      permalink: markdownItAnchor.permalink.ariaHidden({
        class: null,
        renderAttrs: () => ({ "data-is-anchor": true }),
      }),
    });
  }
  if (markdownItAttrs) md = md.use(markdownItAttrs);
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdownify", (content) => md.render(String(content ?? "")));

  /* Data */
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  /* Build */
  eleventyConfig.addPassthroughCopy(
    {
      _public: ".",
      ...(inputDir !== "." && { [`${inputDir}/_public`]: "." }),
    },
    { expand: true }, // This follows/resolves symbolic links
  );

  /* Dev tools */
  // Follow symlinks in Chokidar used by 11ty to watch files
  eleventyConfig.setChokidarConfig({ followSymlinks: true });
}
/*```

<!--section:docs-->
### Base `eleventy.config.js` {#base-config}

The package includes a fully-configured Eleventy config file `eleventy.config.js` that you can symlink to your project to get:

- All eleventy-blades plugins enabled
- Eleventy Navigation plugin
- Table of Contents plugin (conditionally loaded if installed)
- Markdown-it with anchors and attributes
- YAML data support
- CLI input directory support
- Symlink support for development
- _and more_

**Benefits of symlinking:**

- **Always up-to-date**: Configuration automatically updates when you upgrade the package
- **Less maintenance**: No need to manually sync configuration changes
- **Quick setup**: Get started immediately with best-practice configurations
- **Easy customization**: Override specific settings by creating your own config that imports from the symlinked version

**Installation as simple as:**

```sh
npm install @anydigital/eleventy-blades
ln -s ./node_modules/@anydigital/eleventy-blades/src/eleventy.config.js
```
<!--section-->
*/
