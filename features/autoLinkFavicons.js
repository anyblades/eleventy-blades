/*<!--section:docs-->

`autoLinkFavicons` feature automatically adds favicon images from Google's favicon service to links that display plain URLs or domain names.

This processor processes all HTML output files and adds inline favicon images next to link text that appears to be a plain URL.

<!--section:code-->```js */
export function isExternalUrl(url) {
  return /^https?:\/\//.test(url);
}

export function cleanLinkText(linkText, domain) {
  const cleanedText = linkText
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const withoutDomain = cleanedText.replace(domain, "");
  return withoutDomain.length > 2 ? withoutDomain : cleanedText;
}

export function buildFaviconLink(attrs, domain, text) {
  const wrappedText = /<[a-z]/i.test(text) ? `<span>${text}</span>` : text;
  return `<a ${attrs}><i><img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64"></i> ${wrappedText}</a>`;
}

export function transformLink(match, attrs, url, linkText) {
  try {
    const domain = new URL(url).hostname;

    if (isExternalUrl(url)) {
      const cleanedText = cleanLinkText(linkText, domain);
      return buildFaviconLink(attrs, domain, cleanedText);
    }
  } catch (e) {
    // URL parsing failed — fall through and return original match
  }
  return match;
}

export function replaceLinksInHtml(content, transformer) {
  return content.replace(/<a\s+([^>]*href=["']([^"']+)["'][^>]*)>([^<]*(?:<\/?(?:em|strong)>[^<]*)*)<\/a>/gi, transformer);
}

export default function (eleventyConfig) {
  eleventyConfig.addTransform("autoLinkFavicons", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return replaceLinksInHtml(content, transformLink);
    }
    return content;
  });
}
//```
