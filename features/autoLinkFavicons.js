/*<!--section:docs-->

`autoLinkFavicons` feature prepends a favicon image (from Google's favicon service) to external links whose text is a plain URL or contains only inline emphasis (`<em>`/`<strong>`) — skipping any link already decorated with an `↗` marker.

For each qualifying link the link text is cleaned (protocol prefix and trailing slash stripped; domain portion removed when significant path text remains), then wrapped in the original `<a>` tag preceded by `<i><img src="https://www.google.com/s2/favicons?…"></i>`. Any HTML already present in the link text is wrapped in a `<span>` so the favicon image stays a direct child of `<a>`. Only `.html` output files are processed.

> Compatible with: https://blades.ninja/css/link-icon/ <i class="faded">← this link is a live example!</i>

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

    if (isExternalUrl(url) && !linkText.includes("↗")) {
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
