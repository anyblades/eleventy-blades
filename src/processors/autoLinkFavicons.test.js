import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isPlainUrlText,
  cleanLinkText,
  buildFaviconLink,
  transformLink,
  replaceLinksInHtml,
} from "./autoLinkFavicons.js";

describe("isPlainUrlText", () => {
  it("should return true when linkText contains domain", () => {
    assert.equal(isPlainUrlText("example.com", "example.com"), true);
    assert.equal(isPlainUrlText("https://example.com/path", "example.com"), true);
    assert.equal(isPlainUrlText("Visit example.com for more", "example.com"), true);
  });

  it("should return true when linkText starts with http://", () => {
    assert.equal(isPlainUrlText("http://example.com", "example.com"), true);
    assert.equal(isPlainUrlText("http://other.com/path", "other.com"), true);
  });

  it("should return true when linkText starts with https://", () => {
    assert.equal(isPlainUrlText("https://example.com", "example.com"), true);
    assert.equal(isPlainUrlText("https://other.com/path", "other.com"), true);
  });

  it("should return false for custom link text without domain", () => {
    assert.equal(isPlainUrlText("Click here", "example.com"), false);
    assert.equal(isPlainUrlText("Read more", "example.com"), false);
    assert.equal(isPlainUrlText("Documentation", "example.com"), false);
  });

  it("should handle whitespace in linkText", () => {
    assert.equal(isPlainUrlText("  example.com  ", "example.com"), true);
    assert.equal(isPlainUrlText("  https://example.com  ", "example.com"), true);
  });

  it("should return false for empty linkText", () => {
    assert.equal(isPlainUrlText("", "example.com"), false);
  });
});

describe("cleanLinkText", () => {
  it("should remove protocol and domain", () => {
    assert.equal(cleanLinkText("https://example.com/docs", "example.com"), "/docs");
    assert.equal(cleanLinkText("http://example.com/docs", "example.com"), "/docs");
    assert.equal(cleanLinkText("https://example.com/docs/guide", "example.com"), "/docs/guide");
  });

  it("should handle links without protocol", () => {
    assert.equal(cleanLinkText("example.com/docs", "example.com"), "/docs");
    assert.equal(cleanLinkText("example.com/path/to/page", "example.com"), "/path/to/page");
  });

  it("should preserve leading slash after domain removal", () => {
    assert.equal(cleanLinkText("https://example.com/docs", "example.com"), "/docs");
    assert.equal(cleanLinkText("example.com/docs", "example.com"), "/docs");
  });

  it("should return cleaned domain for root domain (no long path)", () => {
    // When path is too short (<=2 chars), returns cleanedText instead of withoutDomain
    assert.equal(cleanLinkText("example.com/", "example.com"), "example.com");
    assert.equal(cleanLinkText("example.com", "example.com"), "example.com");
    assert.equal(cleanLinkText("https://example.com", "example.com"), "example.com");
  });

  it("should handle whitespace", () => {
    assert.equal(cleanLinkText("  https://example.com/docs  ", "example.com"), "/docs");
    assert.equal(cleanLinkText("\nhttps://example.com/docs\n", "example.com"), "/docs");
  });

  it("should preserve path after domain", () => {
    assert.equal(cleanLinkText("https://example.com/api/v1/docs", "example.com"), "/api/v1/docs");
  });

  it("should handle query parameters", () => {
    const result = cleanLinkText("https://example.com/search?q=test", "example.com");
    assert.equal(result, "/search?q=test");
  });

  it("should handle hash fragments", () => {
    const result = cleanLinkText("https://example.com/page#section", "example.com");
    assert.equal(result, "/page#section");
  });
});

describe("buildFaviconLink", () => {
  it("should create correct HTML with favicon", () => {
    const result = buildFaviconLink('href="https://example.com/docs"', "example.com", "/docs");
    assert.equal(
      result,
      '<a href="https://example.com/docs" target="_blank" data-has-favicon><img src="https://www.google.com/s2/favicons?domain=example.com&sz=64">/docs</a>',
    );
  });

  it("should handle complex attributes", () => {
    const result = buildFaviconLink('href="https://example.com" class="link"', "example.com", "text");
    assert.equal(
      result,
      '<a href="https://example.com" class="link" target="_blank" data-has-favicon><img src="https://www.google.com/s2/favicons?domain=example.com&sz=64">text</a>',
    );
  });

  it("should use sz=64 parameter for favicon size", () => {
    const result = buildFaviconLink('href="https://example.com"', "example.com", "text");
    assert.match(result, /sz=64/);
  });

  it("should include data-has-favicon attribute", () => {
    const result = buildFaviconLink('href="https://example.com"', "example.com", "text");
    assert.match(result, /data-has-favicon/);
  });

  it("should handle different domains", () => {
    const result = buildFaviconLink('href="https://github.com/repo"', "github.com", "/repo");
    assert.equal(
      result,
      '<a href="https://github.com/repo" target="_blank" data-has-favicon><img src="https://www.google.com/s2/favicons?domain=github.com&sz=64">/repo</a>',
    );
  });

  it("should preserve link text as provided", () => {
    const result = buildFaviconLink('href="https://example.com"', "example.com", "custom text");
    assert.match(result, />custom text<\/a>$/);
  });
});

describe("transformLink", () => {
  it("should transform plain URL links with sufficient length", () => {
    const result = transformLink(
      '<a href="https://example.com/docs">https://example.com/docs</a>',
      'href="https://example.com/docs"',
      "https://example.com/docs",
      "https://example.com/docs",
    );
    assert.match(
      result,
      /<img src="https:\/\/www\.google\.com\/s2\/favicons\?domain=example\.com&sz=64">\/docs<\/a>/,
    );
  });

  it("should transform links with short paths (shows domain)", () => {
    // When path is short (<=2 chars), cleanLinkText returns cleanedText (with domain)
    // The link still gets transformed and shows the domain
    const result = transformLink(
      '<a href="https://example.com/a">https://example.com/a</a>',
      'href="https://example.com/a"',
      "https://example.com/a",
      "https://example.com/a",
    );
    assert.match(result, /<img[^>]*>example\.com\/a<\/a>/);
  });

  it("should not transform custom link text without URL", () => {
    const match = '<a href="https://example.com/docs">Click here</a>';
    const result = transformLink(match, 'href="https://example.com/docs"', "https://example.com/docs", "Click here");
    assert.equal(result, match);
  });

  it("should transform root domain links (shows domain)", () => {
    // Root domains are transformed and display the domain name
    const result = transformLink(
      '<a href="https://example.com">example.com</a>',
      'href="https://example.com"',
      "https://example.com",
      "example.com",
    );
    assert.match(result, /<img[^>]*>example\.com<\/a>/);
  });

  it("should transform links ending with slash only (shows domain)", () => {
    // Links with trailing slash are transformed and display the domain name
    const result = transformLink(
      '<a href="https://example.com/">https://example.com/</a>',
      'href="https://example.com/"',
      "https://example.com/",
      "https://example.com/",
    );
    assert.match(result, /<img[^>]*>example\.com<\/a>/);
  });

  it("should handle invalid URLs gracefully", () => {
    const match = '<a href="not-a-url">not-a-url</a>';
    const result = transformLink(match, 'href="not-a-url"', "not-a-url", "not-a-url");
    assert.equal(result, match);
  });

  it("should work with http:// protocol", () => {
    const result = transformLink(
      '<a href="http://example.com/docs">http://example.com/docs</a>',
      'href="http://example.com/docs"',
      "http://example.com/docs",
      "http://example.com/docs",
    );
    assert.match(result, /<img[^>]*>\/docs<\/a>/);
  });

  it("should work with https:// protocol", () => {
    const result = transformLink(
      '<a href="https://example.com/docs">https://example.com/docs</a>',
      'href="https://example.com/docs"',
      "https://example.com/docs",
      "https://example.com/docs",
    );
    assert.match(result, /<img[^>]*>\/docs<\/a>/);
  });

  it("should handle longer paths correctly", () => {
    const result = transformLink(
      '<a href="https://example.com/path/to/document">https://example.com/path/to/document</a>',
      'href="https://example.com/path/to/document"',
      "https://example.com/path/to/document",
      "https://example.com/path/to/document",
    );
    assert.match(result, /<img[^>]*>\/path\/to\/document<\/a>/);
  });

  it("should not transform when linkText doesn't look like URL", () => {
    const match = '<a href="https://example.com/page">Read the documentation</a>';
    const result = transformLink(
      match,
      'href="https://example.com/page"',
      "https://example.com/page",
      "Read the documentation",
    );
    assert.equal(result, match);
  });

  it("should transform when linkText contains domain even without protocol", () => {
    const result = transformLink(
      '<a href="https://example.com/docs">example.com/docs</a>',
      'href="https://example.com/docs"',
      "https://example.com/docs",
      "example.com/docs",
    );
    assert.match(result, /<img[^>]*>\/docs<\/a>/);
  });

  it("should handle malformed URLs by returning original match", () => {
    const match = '<a href="ht!tp://bad-url">ht!tp://bad-url</a>';
    const result = transformLink(match, 'href="ht!tp://bad-url"', "ht!tp://bad-url", "ht!tp://bad-url");
    assert.equal(result, match);
  });
});

describe("replaceLinksInHtml", () => {
  it("should replace a single anchor link with transformer function", () => {
    const html = '<a href="https://example.com">Click here</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Click here](https://example.com)");
  });

  it("should replace multiple anchor links in HTML", () => {
    const html = '<a href="https://example.com">Link 1</a> and <a href="https://other.com">Link 2</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link 1](https://example.com) and [Link 2](https://other.com)");
  });

  it("should handle links with single quotes in href", () => {
    const html = "<a href='https://example.com'>Link</a>";
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link](https://example.com)");
  });

  it("should handle links with double quotes in href", () => {
    const html = '<a href="https://example.com">Link</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link](https://example.com)");
  });

  it("should capture all attributes in first group", () => {
    const html = '<a href="https://example.com" class="link" target="_blank">Link</a>';
    let capturedAttrs = "";
    const transformer = (match, attrs, url, linkText) => {
      capturedAttrs = attrs;
      return match;
    };
    replaceLinksInHtml(html, transformer);
    assert.equal(capturedAttrs, 'href="https://example.com" class="link" target="_blank"');
  });

  it("should capture URL in second group", () => {
    const html = '<a href="https://example.com/path">Link</a>';
    let capturedUrl = "";
    const transformer = (match, attrs, url, linkText) => {
      capturedUrl = url;
      return match;
    };
    replaceLinksInHtml(html, transformer);
    assert.equal(capturedUrl, "https://example.com/path");
  });

  it("should capture link text in third group", () => {
    const html = '<a href="https://example.com">Click here</a>';
    let capturedText = "";
    const transformer = (match, attrs, url, linkText) => {
      capturedText = linkText;
      return match;
    };
    replaceLinksInHtml(html, transformer);
    assert.equal(capturedText, "Click here");
  });

  it("should preserve content that is not an anchor link", () => {
    const html = '<p>Some text</p><a href="https://example.com">Link</a><div>More text</div>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "<p>Some text</p>[Link](https://example.com)<div>More text</div>");
  });

  it("should handle empty HTML content", () => {
    const html = "";
    const transformer = (match) => match;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "");
  });

  it("should handle HTML with no anchor links", () => {
    const html = "<p>No links here</p><div>Just text</div>";
    const transformer = (match) => "REPLACED";
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, html);
  });

  it("should handle links with query parameters", () => {
    const html = '<a href="https://example.com/search?q=test&lang=en">Search</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Search](https://example.com/search?q=test&lang=en)");
  });

  it("should handle links with hash fragments", () => {
    const html = '<a href="https://example.com/page#section">Section</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Section](https://example.com/page#section)");
  });

  it("should be case-insensitive for anchor tag", () => {
    const html = '<A HREF="https://example.com">Link</A>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link](https://example.com)");
  });

  it("should handle links with additional attributes before href", () => {
    const html = '<a class="link" href="https://example.com" id="mylink">Link</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link](https://example.com)");
  });

  it("should handle links with additional attributes after href", () => {
    const html = '<a href="https://example.com" class="link" id="mylink">Link</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link](https://example.com)");
  });

  it("should handle relative URLs", () => {
    const html = '<a href="/docs/guide">Guide</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Guide](/docs/guide)");
  });

  it("should handle root-relative URLs", () => {
    const html = '<a href="/">Home</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Home](/)");
  });

  it("should not match anchor tags with nested HTML in link text", () => {
    const html = '<a href="https://example.com"><span>Link</span></a>';
    const transformer = (match) => "REPLACED";
    const result = replaceLinksInHtml(html, transformer);
    // Should not match because regex expects [^<]+ for link text (no nested tags)
    assert.equal(result, html);
  });

  it("should handle transformer that returns original match unchanged", () => {
    const html = '<a href="https://example.com">Link</a>';
    const transformer = (match) => match;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, html);
  });

  it("should work with transformLink function for real-world usage", () => {
    const html = '<a href="https://example.com/docs">https://example.com/docs</a>';
    const result = replaceLinksInHtml(html, transformLink);
    // transformLink should add favicon for plain URL links
    assert.match(result, /<img src="https:\/\/www\.google\.com\/s2\/favicons\?domain=example\.com&sz=64">/);
    assert.match(result, /\/docs<\/a>/);
  });

  it("should not transform custom link text when using transformLink", () => {
    const html = '<a href="https://example.com/docs">Click here</a>';
    const result = replaceLinksInHtml(html, transformLink);
    // transformLink should not add favicon for custom text
    assert.equal(result, html);
  });

  it("should handle multiple links with mixed transformation results", () => {
    const html =
      '<a href="https://example.com/docs">https://example.com/docs</a> and <a href="https://other.com">Click</a>';
    const result = replaceLinksInHtml(html, transformLink);
    // First link should be transformed (plain URL), second should not (custom text)
    assert.match(result, /img src=/);
    assert.match(result, /Click<\/a>/);
  });

  it("should handle link text with special characters", () => {
    const html = '<a href="https://example.com">Link & More!</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link & More!](https://example.com)");
  });

  it("should handle URLs with ports", () => {
    const html = '<a href="https://example.com:8080/page">Link</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link](https://example.com:8080/page)");
  });

  it("should handle http protocol links", () => {
    const html = '<a href="http://example.com">Link</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link](http://example.com)");
  });

  it("should handle links in multiline HTML", () => {
    const html = `<div>
  <a href="https://example.com">Link 1</a>
  <p>Some text</p>
  <a href="https://other.com">Link 2</a>
</div>`;
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.match(result, /\[Link 1\]\(https:\/\/example\.com\)/);
    assert.match(result, /\[Link 2\]\(https:\/\/other\.com\)/);
  });

  it("should handle adjacent anchor links", () => {
    const html = '<a href="https://example.com">Link1</a><a href="https://other.com">Link2</a>';
    const transformer = (match, attrs, url, linkText) => `[${linkText}](${url})`;
    const result = replaceLinksInHtml(html, transformer);
    assert.equal(result, "[Link1](https://example.com)[Link2](https://other.com)");
  });
});
