// <!--section:code-->```js

/* Plugins (core > official > contrib) */
import { RenderPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import eleventyBladesPlugin from "@anyblades/eleventy-blades";
import pluginTOC from '@uncenter/eleventy-plugin-toc';
/* Libraries (A-Z) */
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import slugify from '@sindresorhus/slugify';
import YAML from "yaml";
/* System (A-Z) */
import fs from "node:fs";
import path from "node:path";

/**
 * Eleventy Configuration
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @returns {Object} The Eleventy configuration object
 */
export default async function (eleventyConfig) {
  const { default: pkg } = await import(`${process.cwd()}/package.json`, { with: { type: "json" } });

  /* Dirs */
  const inputDir = eleventyConfig.directories.input;
  const outputDir = eleventyConfig.directories.output;
  const cwdIsDotEleventy = path.basename(process.cwd()) === '.11ty';
  if (cwdIsDotEleventy) {
    // Per https://www.11ty.dev/docs/config/#directory-for-includes
    // Order matters, put this at the top of your configuration file.
    // This is relative to your input directory!
    eleventyConfig.setIncludesDirectory("./.11ty/_includes/");
  }

  /* Plugins */
  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyBladesPlugin);
  eleventyConfig.addPlugin(pluginTOC, {
    ignoredElements: [".header-anchor", "sub"],
    ul: true,
    wrapper: (toc) => `${toc}`,
  });
  // Feed plugin
  eleventyConfig.addCollection("feed", (collectionApi) => collectionApi.getAll().filter((item) => item.data.date || item.data.revised));
  eleventyConfig.addPlugin(feedPlugin, { // per https://www.11ty.dev/docs/plugins/rss/#virtual-template
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "feed",
      limit: 100, // 0 means no limit
    },
    metadata: pkg.site,
  });

  /* Libraries */
  let md = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    slugify: slugify, // @TODO: TRICKS
    permalink: markdownItAnchor.permalink.ariaHidden(),
  }).use(markdownItAttrs);
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdownify", (content) => md.render(String(content ?? "")));

  /* Data */
  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));
  eleventyConfig.addGlobalData("layout", "default");
  eleventyConfig.addTemplate("sitemap.xml.njk", "", {
    permalink: "/sitemap.xml",
    layout: "blades/sitemap.xml.njk",
    eleventyExcludeFromCollections: true
  });

  /* Build */
  eleventyConfig.addPassthroughCopy(
    {
      // From current working directory
      _public: "./",
      media: "./media/",
      // Additionally from input dirs like `../` or `./site-1`
      [`${inputDir}/_public/`]: "./",
      [`${inputDir}/media/`]: "./media/",
    },
    { expand: true }, // This follows/resolves symbolic links
  );

  /* Internal */
  // Jekyll templates compatibility
  eleventyConfig.addFilter("relative_url", (content) => content); // dummy
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false, // allows unquoted Jekyll-style includes
    root: [
      eleventyConfig.directories.includes,
      fs.realpathSync(path.resolve("./node_modules/@anyblades/blades/_includes")), // for symlinks to work after https://github.com/harttle/liquidjs/pull/870
    ],
  });
  // Dev tools
  eleventyConfig.setChokidarConfig({ followSymlinks: true }); // follow symlinks in Chokidar used by 11ty to watch files
  if (cwdIsDotEleventy) {
    eleventyConfig.watchIgnores.add(`../.11ty/${outputDir}`); // !!! avoid circular watching
    eleventyConfig.watchIgnores.add("../.11ty/node_modules/"); // avoid performance issues
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
