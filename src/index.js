import { readdirSync } from "node:fs";

/**
 * 11ty Blades Plugin
 *
 * A collection of helpful utilities and filters for Eleventy (11ty).
 * Can be used as a plugin or by importing individual helpers.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 * @param {Object} options - Plugin options
 * @param {boolean} options.mdAutoRawTags - Enable mdAutoRawTags preprocessor (default: false)
 * @param {boolean} options.mdAutoNl2br - Enable mdAutoNl2br for \n to <br> conversion (default: false)
 * @param {boolean} options.mdAutoUncommentAttrs - Enable mdAutoUncommentAttrs to expand <!--{...}--> to {...} (default: false)
 * @param {boolean} options.autoLinkFavicons - Enable autoLinkFavicons to add favicons to plain text links (default: false)
 * @param {Array<string>} options.filters - Array of filter names to enable: 'attr_set', 'attr_includes', 'merge', 'remove_tag', 'strip_tag', 'if', 'attr_concat', 'section', 'unindent', 'fetch' (default: [])
 * @param {boolean} options.siteData - Enable site.year and site.prod global data (default: false)
 */
export default async function (eleventyConfig, options = {}) {

  /* FILTERS
   * Fallback to default list if options.filters doesn't exist
   * By using import.meta.url, Node figures out exactly where your script is installed inside their node_modules folder and targets the directory relative to that script.
   */
  options.filters ??= readdirSync(new URL("../filters", import.meta.url))
    .filter((f) => f.endsWith(".js") && !f.endsWith(".test.js"))
    .map((f) => f.replace(/\.js$/, ""));
  for (const filterName of options.filters) {
    console.log("Adding filter: " + filterName + "...");
    try {
      if (filterName == 'fetch') await import("@11ty/eleventy-fetch");
      const filterFunc = (await import("../filters/" + filterName + ".js")).default;
      eleventyConfig.addFilter(filterName, filterFunc);
    }
    catch (error) {
      console.log("^ SKIPPED ^");
    }
  };
  delete options.filters;

  /* FEATURES */
  const features = /*Object.keys(options) ??*/ readdirSync(new URL("../features", import.meta.url))
    .filter((f) => f.endsWith(".js") && !f.endsWith(".test.js"))
    .map((f) => f.replace(/\.js$/, ""));
  for (const featureName of features) {
    console.log("Enabling feature: " + featureName + "...");
    try {
      const featureConfig = (await import("../features/" + featureName + ".js")).default;
      featureConfig(eleventyConfig);
    }
    catch (error) {
      console.log("^ SKIPPED ^");
    }
  }
}
