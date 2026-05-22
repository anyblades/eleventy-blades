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

// Conditionally import fetchFilter only if @11ty/eleventy-fetch is available
let fetchFilter = null;
try {
  await import("@11ty/eleventy-fetch");
  const fetchModule = await import("./filters/fetch.js");
  fetchFilter = fetchModule.fetchFilter;
} catch (error) {
  // @11ty/eleventy-fetch not available, fetch filter will be disabled
}

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

  const filters = {
    ...(fetchFilter && { fetch: fetchFilter }),
    date: (eleventyConfig) => {
      eleventyConfig.addFilter("date", (dateVal) => new Date(dateVal).toISOString().split("T")[0]);
    },
  };
  for (const filterName of options.filters) {
    console.log("Adding filter: " + filterName + "...");
    if (filters[filterName]) {
      filters[filterName](eleventyConfig);
    }
    else {
      try {
        const filterFunc = (await import("../filters/" + filterName + ".js")).default;
        eleventyConfig.addFilter(filterName, filterFunc);
      }
      catch (error) {
        console.log("^ ERROR ^");
      }
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
