// <!--section:code-->```js

/* Plugins */
import { RenderPlugin } from "@11ty/eleventy";
import eleventyBladesPlugin from "@anyblades/eleventy-blades";
/* Libraries */
import markdownIt from "markdown-it";
/* Data */
import YAML from "yaml";
/* System */
import fs from "node:fs";
import path from "node:path";

/**
 * Eleventy Configuration
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @returns {Object} The Eleventy configuration object
 */
export default async function (eleventyConfig) {
  const inputDir = eleventyConfig.directories.input;
  const outputDir = eleventyConfig.directories.output;
  if (inputDir == '../') {
    eleventyConfig.setIncludesDirectory("./.11ty/_includes/");
  }

  /* Plugins */
  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addPlugin(eleventyBladesPlugin);
  /* Optional plugins */
  try {
    console.log("Loading plugin: @11ty/eleventy-navigation...");
    const eleventyNavigationPlugin = (await import("@11ty/eleventy-navigation")).default;
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
  } catch (e) { console.log("^ N/A ^") }
  try {
    console.log("Loading plugin: @uncenter/eleventy-plugin-toc...");
    const pluginTOC = (await import("@uncenter/eleventy-plugin-toc")).default;
    eleventyConfig.addPlugin(pluginTOC, {
      ignoredElements: [".header-anchor", "sub"],
      ul: true,
      wrapper: (toc) => `${toc}`,
    });
  } catch (e) { console.log("^ N/A ^") }
  try {
    console.log("Loading plugin: @11ty/eleventy-plugin-rss..."); // per https://www.11ty.dev/docs/plugins/rss/#virtual-template
    const { feedPlugin } = await import("@11ty/eleventy-plugin-rss");
    eleventyConfig.addCollection("feed", (collectionApi) => collectionApi.getAll().filter((item) => item.data.revised));
    let siteData = {};
    try {
      //TODO: switch to pkg.site?
      siteData = YAML.parse(fs.readFileSync(`${inputDir}/_data/site.yaml`, "utf8"));
    } catch (e) {
      // _data/site.yaml not found
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
  } catch (e) { console.log("^ N/A ^") }

  /* Libraries */
  let md = markdownIt({
    html: true,
    linkify: true,
  });
  /* Optional libraries */
  try {
    console.log("Loading library: markdown-it-anchor...");
    const slugify = (await import("@sindresorhus/slugify")).default;
    const markdownItAnchor = (await import("markdown-it-anchor")).default;
    md = md.use(markdownItAnchor, {
      slugify: slugify, // @TODO: TRICKS
      permalink: markdownItAnchor.permalink.ariaHidden(),
    });
  } catch (e) { console.log("^ N/A ^") }
  try {
    console.log("Loading library: markdown-it-attrs...");
    const markdownItAttrs = (await import("markdown-it-attrs")).default;
    md = md.use(markdownItAttrs);
  } catch (e) { console.log("^ N/A ^") }
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdownify", (content) => md.render(String(content ?? "")));

  /* Data */
  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));
  eleventyConfig.addGlobalData("layout", "default");

  /* Build */
  eleventyConfig.addPassthroughCopy(
    {
      _public: "./",
      media: "./media/",
      [`${inputDir}/_public/`]: "./",
      [`${inputDir}/media/`]: "./media/",
    },
    { expand: true }, // This follows/resolves symbolic links
  );

  /* Jekyll templates compatibility */
  eleventyConfig.addFilter("relative_url", (content) => content); // dummy
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false, // allows unquoted Jekyll-style includes
    root: [
      eleventyConfig.directories.includes,
      fs.realpathSync(path.resolve("./node_modules/@anyblades/blades/_includes")), // for symlinks to work after https://github.com/harttle/liquidjs/pull/870
    ],
  });

  /* Dev tools */
  eleventyConfig.setChokidarConfig({ followSymlinks: true }); // follow symlinks in Chokidar used by 11ty to watch files
  if (inputDir == '../') {
    eleventyConfig.watchIgnores.add(`../.11ty/${outputDir}`); // avoid circular watching
  }
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
npm install @anyblades/eleventy-blades
ln -s ./node_modules/@anyblades/eleventy-blades/src/eleventy.config.js
```
<!--section-->
*/
