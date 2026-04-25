import { mdAutoRawTags, mdAutoNl2br, mdAutoUncommentAttrs, transformAutoRaw, transformNl2br, transformUncommentAttrs } from "./processors/markdown.js";
import {
  autoLinkFavicons,
  isPlainUrlText,
  cleanLinkText,
  buildFaviconLink,
  transformLink,
  replaceLinksInHtml,
} from "./processors/autoLinkFavicons.js";
import { attrSetFilter, attrSet } from "./filters/attr_set.js";
import { attrIncludesFilter } from "./filters/attr_includes.js";
import { mergeFilter, merge } from "./filters/merge.js";
import { removeTagFilter, removeTag } from "./filters/remove_tag.js";
import { stripTagFilter, stripTag } from "./filters/strip_tag.js";
import { ifFilter, iff } from "./filters/if.js";
import { attrConcatFilter, attrConcat } from "./filters/attr_concat.js";
import { sectionFilter, section as sectionFn } from "./filters/section.js";
import { unindentFilter, unindent } from "./filters/unindent.js";
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
 * @param {Array<string>} options.filters - Array of filter names to enable: 'attr_set', 'attr_includes', 'merge', 'remove_tag', 'strip_tag', 'if', 'attr_concat', 'section', 'fetch' (default: [])
 * @param {boolean} options.siteData - Enable site.year and site.prod global data (default: false)
 */
export default function eleventyBladesPlugin(eleventyConfig, options = {}) {
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
    attr_set: attrSetFilter,
    attr_includes: attrIncludesFilter,
    merge: mergeFilter,
    remove_tag: removeTagFilter,
    strip_tag: stripTagFilter,
    if: ifFilter,
    attr_concat: attrConcatFilter,
    section: sectionFilter,
    unindent: unindentFilter,
    ...(fetchFilter && { fetch: fetchFilter }),
    date: (eleventyConfig) => {
      eleventyConfig.addFilter("date", (dateVal) => new Date(dateVal).toISOString().split("T")[0]);
    },
  };
  if (Array.isArray(options.filters)) {
    options.filters.forEach((filterName) => {
      if (filters[filterName]) {
        filters[filterName](eleventyConfig);
      }
    });
  }
}

// Export individual helpers for granular usage
// Note: fetchFilter will be null/undefined if @11ty/eleventy-fetch is not installed
export {
  mdAutoRawTags,
  mdAutoNl2br,
  mdAutoUncommentAttrs,
  autoLinkFavicons,
  attrSetFilter,
  attrIncludesFilter,
  mergeFilter,
  removeTagFilter,
  stripTagFilter,
  ifFilter,
  attrConcatFilter,
  sectionFilter,
  unindentFilter,
  fetchFilter,
  siteData,
};

// Export transform/utility functions for advanced usage
export {
  transformAutoRaw,
  transformNl2br,
  transformUncommentAttrs,
  isPlainUrlText,
  cleanLinkText,
  buildFaviconLink,
  transformLink,
  replaceLinksInHtml,
  merge,
  removeTag,
  stripTag,
  iff,
  attrConcat,
  attrSet,
  sectionFn as section,
  unindent,
};
