import { mdAutoRawTags, mdAutoNl2br, mdAutoUncommentAttrs, transformAutoRaw, transformNl2br, transformUncommentAttrs } from "./processors/markdown.js";
import {
  autoLinkFavicons,
  isPlainUrlText,
  cleanLinkText,
  buildFaviconLink,
  transformLink,
  replaceLinksInHtml,
} from "./processors/autoLinkFavicons.js";
import { siteData } from "./siteData.js";

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
  // Fallback to default list if options.filters doesn't exist
  options.filters ??= [
    "attr_concat",
    "attr_includes",
    "attr_set",
    "date",
    "fetch",
    "if",
    "merge",
    "remove_tag",
    "section",
    "strip_tag",
    "unindent",
  ];

  const plugins = {
    mdAutoRawTags,
    mdAutoNl2br,
    mdAutoUncommentAttrs,
    autoLinkFavicons,
    siteData,
  };
  Object.entries(options).forEach(([key, enabled]) => {
    if (key !== "filters" && enabled && plugins[key]) {
      plugins[key](eleventyConfig);
    }
  });

  for (const filterName of options.filters) {
    console.log("Adding filter: " + filterName + "...");
    try {
      if (filterName == 'fetch') await import("@11ty/eleventy-fetch");
      const filterFunc = (await import("../filters/" + filterName + ".js")).default;
      eleventyConfig.addFilter(filterName, filterFunc);
    }
    catch (error) {
      console.log("^ SKIPPING ^");
    }
  };
}

// Export individual helpers for granular usage
export {
  mdAutoRawTags,
  mdAutoNl2br,
  mdAutoUncommentAttrs,
  autoLinkFavicons,
  siteData,
};
