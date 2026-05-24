import { readdirSync } from "node:fs";

export const discoverModules = (dir) =>
  Object.fromEntries(
    readdirSync(new URL(dir, import.meta.url))
      .filter((f) => f.endsWith(".js") && !f.endsWith(".test.js"))
      .map((f) => [f.replace(/\.js$/, ""), true])
  );

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
 * @param {Object} options.filters - Object of filter names to enable, e.g. { attr_set: true, fetch: true } (default: all filters enabled)
 * @param {boolean} options.siteData - Enable site.year and site.prod global data (default: false)
 */
export default async function (eleventyConfig, options = {}) {

  /* FILTERS
   * Fallback to default list if options.filters doesn't exist
   * By using import.meta.url, Node figures out exactly where your script is installed inside their node_modules folder and targets the directory relative to that script.
   */
  const filters = Object.assign({}, discoverModules("./filters"), options.filters);
  const filterNames = Object.entries(filters).filter(([, v]) => v);
  for (const [filterName] of filterNames) {
    console.log("Adding filter: " + filterName + "...");
    try {
      if (filterName == 'fetch') await import("@11ty/eleventy-fetch");
      const filterFunc = (await import("./filters/" + filterName + ".js")).default;
      eleventyConfig.addFilter(filterName, filterFunc);
    }
    catch (error) {
      console.log("^ N/A ^");
    }
  };

  /* FEATURES */
  const features = Object.assign({}, discoverModules("./features"), options);
  delete features.filters;
  const featureNames = Object.entries(features).filter(([, v]) => v);
  for (const [featureName] of featureNames) {
    console.log("Enabling feature: " + featureName + "...");
    try {
      const featureConfig = (await import("./features/" + featureName + ".js")).default;
      featureConfig(eleventyConfig);
    }
    catch (error) {
      console.log("^ N/A ^");
    }
  }
}
