<!--section:index-->
<hgroup id="11ty"><small>Build Awesome plugin</small>

## Eleventy blades <small>[<i>↗</i>](https://github.com/anydigital/eleventy-blades)</small>

<p></p></hgroup>

Ultimate blade kit for 11ty (Build Awesome).

<big>

- [Reusable npm scripts](https://blades.ninja/build-awesome-11ty/#npm-scripts)

{.columns}

</big>

<details><summary role="button" class="outline">Install Eleventy blades</summary>

```sh
npm install @anydigital/eleventy-blades
```

Then choose one of the following options:

<mark>Option A.</mark> Starting 11ty from scratch?

Consider symlinking entire `eleventy.config.js`:

```sh
ln -s ./node_modules/@anydigital/eleventy-blades/src/eleventy.config.js
```

Living examples:

- https://github.com/anydigital/build-awesome-starter
- https://github.com/anydigital/bladeswitch

<mark>Option B.</mark> Adding to existing 11ty site?

Install as a plugin in your `eleventy.config.js` (recommended):

```js
import eleventyBladesPlugin from "@anydigital/eleventy-blades";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyBladesPlugin, {
    mdAutoRawTags: true,
    mdAutoNl2br: true,
    autoLinkFavicons: true,
    siteData: true,
    filters: ["attr_set", "attr_concat", ...],
  });
}
```

<mark>Option C.</mark> Individual imports

For advanced usage, import individual components only in `eleventy.config.js`:

```js
import { siteData, mdAutoRawTags, mdAutoNl2br, autoLinkFavicons, attrSetFilter, attrConcatFilter, ... } from "@anydigital/eleventy-blades";

export default function (eleventyConfig) {
  siteData(eleventyConfig);
  mdAutoRawTags(eleventyConfig);
  mdAutoNl2br(eleventyConfig);
  autoLinkFavicons(eleventyConfig);
  attrSetFilter(eleventyConfig);
  attrConcatFilter(eleventyConfig);
  ...
}
```

</details>

Or use a fully preconfigured:

[🥷 Build Awesome Starter ↗ &nbsp;<small>11ty + Tailwind + Typography + Blades</small>](https://github.com/anydigital/build-awesome-starter){role=button .outline}

<!--section-->

## Configuration Tools

<!--section:config-h3-->

### 🥷 Symlinked `eleventy.config.js` <br><sub>from https://github.com/anydigital/eleventy-blades</sub> <a id="symlink-config"></a>

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
npm install @anydigital/eleventy-blades
ln -s ./node_modules/@anydigital/eleventy-blades/src/eleventy.config.js
```

<!--section-->

## Data Tools & Processors

<!--section:data&processors-h3-->

### Global `siteData` helper

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/siteData.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/siteData.js)

Adds global `site` data to your Eleventy project, providing commonly needed values that can be accessed in all templates:

| Variable          | Value                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `{{ site.year }}` | The current year as a number (e.g., `2026`)                                                                  |
| `{{ site.prod }}` | Boolean indicating if running in production mode (`true` for `eleventy build`, `false` for `eleventy serve`) |

### 🥷 `autoLinkFavicons` transformer

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/processors/autoLinkFavicons.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/processors/autoLinkFavicons.js)

Automatically adds favicon images from Google's favicon service to links that display plain URLs or domain names. This processor processes all HTML output files and adds inline favicon images next to link text that appears to be a plain URL.

**Why use this?** When you have links in your content that display raw URLs or domain names (like `https://example.com/page`), adding favicons provides a visual indicator of the external site. This processor automatically detects these plain-text URL links and enhances them with favicon images, making them more visually appealing and easier to recognize.

**How it works:**

1. Scans all HTML output files for `<a>` tags
2. Checks if the link text appears to be a plain URL or domain
3. Extracts the domain from the URL
4. Removes the domain from the link text (keeping only the path)
5. Adds a favicon image from Google's favicon service inline with the remaining text

**Example:**

Before processing:

```html
<a href="https://github.com/anydigital/eleventy-blades">https://github.com/anydigital/eleventy-blades</a>
```

After processing:

```html
<a href="https://github.com/anydigital/eleventy-blades" class="whitespace-nowrap" target="_blank">
  <i><img src="https://www.google.com/s2/favicons?domain=github.com&sz=32" /></i>
  <span>/anydigital/eleventy-blades</span>
</a>
```

**Rules:**

- Only applies to links where the text looks like a plain URL (contains the domain or starts with `http://`/`https://`)
- Removes the protocol and domain from the display text
- Removes the trailing slash from the display text
- Only applies if at least 3 characters remain after removing the domain (to avoid showing favicons for bare domain links)
- Uses Google's favicon service at `https://www.google.com/s2/favicons?domain=DOMAIN&sz=32`
- Adds `target="_blank"` to the processed links (only if not already present)
- Adds `whitespace-nowrap` class to the link
- Wraps the link text in a `<span>` element
- The favicon is wrapped in an `<i>` tag for easy styling

<details><summary>

### mdAutoRawTags preprocessor

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/processors/markdown.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/processors/markdown.js)

Prevents Nunjucks syntax from being processed in Markdown files by automatically wrapping `{{`, `}}`, `{%`, and `%}` with `{% raw %}` tags.

**Why use this?** When writing documentation or tutorials about templating in Markdown files, you often want to show Nunjucks/Liquid syntax as literal text. This preprocessor automatically escapes these special characters so they display as-is instead of being processed by the template engine.

**Example:**

Before `mdAutoRawTags`, writing this in Markdown:

```markdown
### Using {{ variable }} to output variables
```

Would try to process `{{ variable }}` as a template variable. With `mdAutoRawTags`, it displays exactly as written.

</details>

<details><summary>

### mdAutoNl2br converter

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/processors/markdown.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/processors/markdown.js)

Automatically converts `\n` sequences to `<br>` tags in Markdown content. This is particularly useful for adding line breaks inside Markdown tables where standard newlines don't work.

**Why use this?** Markdown tables don't support multi-line content in cells. By using `\n` in your content, this preprocessor will convert it to `<br>` tags, allowing you to display line breaks within table cells and other content.

**Example:**

In your Markdown file:

```markdown
| Column 1               | Column 2                          |
| ---------------------- | --------------------------------- |
| Line 1\nLine 2\nLine 3 | Another cell\nWith multiple lines |
```

Will render as:

```html
<td>Line 1<br />Line 2<br />Line 3</td>
<td>Another cell<br />With multiple lines</td>
```

**Note:** This processes literal `\n` sequences (backslash followed by 'n'), not actual newline characters. Type `\n` in your source files where you want line breaks.

</details>

<!--section:filters-h2-->

## 🥷 Universal 11ty Filters <small>for `.njk` & `.liquid`</small> <sub>from https://github.com/anydigital/eleventy-blades</sub> <a id="filters"></a>

<details><summary>

### `if`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/if.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/if.js)

An inline conditional/ternary operator filter that returns one value if a condition is truthy, and another if it's falsy. Similar to Nunjucks' inline if syntax, it is especially useful in `.liquid` templates.

**Features:**

- Returns `trueValue` if condition is truthy, otherwise returns `falseValue`
- Treats empty objects `{}` as falsy
- Default `falseValue` is an empty string if not provided
- Works with any data type for values

**Examples:** <!-- @TODO: better examples -->

```jinja2
{# Basic usage (defaults to empty string) #}
<div class="{{ 'active' | if: isActive | default: 'inactive' }}">Status</div>

{# Toggle CSS classes #}
<button class="{{ 'btn-primary' | if: isPrimary | default: 'btn-secondary' }}">
  Click me
</button>

{# Display different text #}
<p>{{ 'Online' | if: user.isOnline, 'Offline' }}</p>

{# Use with boolean values #}
{% set isEnabled = true %}
<div>{{ 'Enabled' | if: isEnabled, 'Disabled' }}</div>

{# Conditional attribute values #}
<input type="checkbox" {{ 'checked' | if: isChecked }}>

{# With numeric values #}
<span class="{{ 'has-items' | if: items.length }}">
  {{ items.length }} items
</span>

{# Chain with other filters #}
{% set cssClass = 'featured' | if: post.featured | upper %}
```

</details>

<details><summary>

### `merge`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/merge.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/merge.js)

A filter that merges arrays or objects together, similar to Twig's merge filter. For arrays, it concatenates them. For objects, it performs a shallow merge where later values override earlier ones.

**Why use this?** When working with data in templates, you often need to combine multiple arrays or objects. The `merge` filter provides a clean way to merge data structures without writing custom JavaScript, making it easy to combine collections, merge configuration objects, or aggregate data from multiple sources.

**Examples:** <!-- @TODO: better examples -->

```jinja2
{# Merge configuration objects #}
{% set defaultConfig = { theme: 'light', lang: 'en' } %}
{% set userConfig = { theme: 'dark' } %}
{% set finalConfig = defaultConfig | merge(userConfig) %}

{# Result: { theme: 'dark', lang: 'en' } #}
```

```jinja2
{# Merge page metadata with defaults #}
{% set defaultMeta = {
  author: 'Site Admin',
  category: 'general',
  comments: false
} %}
{% set pageMeta = defaultMeta | merge(page.data) %}
```

</details>

<details><summary>

### `attr_set`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/attr_set.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/attr_set.js)

A filter that creates a new object with an overridden attribute value. This is useful for modifying data objects in templates without mutating the original. Or even constructing an object from scratch.

#### Example: How to pass object(s) as argument(s) to a filter in `.liquid`?

```liquid {data-caption="trick for '| renderContent' filter"}
{% assign _ctx = null | attr_set: 'collections', collections %}
{{ ... | renderContent: 'liquid,md', _ctx }}
```

</details>

<details><summary>

### `attr_concat`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/attr_concat.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/attr_concat.js)

A filter that concatenates values to an attribute array, returning a new object with the combined array. Useful for adding items to arrays like tags, classes, or other list-based attributes.

**Why use this?** When working with objects that have array attributes (like tags), you often need to add additional values without mutating the original object. The `attr_concat` filter provides a clean way to combine existing array values with new ones, automatically handling duplicates.

**Features:**

- Non-mutating: Creates a new object, leaving the original unchanged
- Automatically removes duplicates using Set
- Handles multiple input types: arrays, JSON string arrays (killer feature for `.liquid`), or single values
- Creates the attribute as an empty array if it doesn't exist
- Logs an error if the existing attribute is not an array
- `TBC:` Supports nested attributes (e.g., `data.tags`)

#### Example: Add tags to a post object in `.njk`:

```jinja2
{% set enhancedPost = post | attr_concat('tags', ['featured', 'popular']) %}
```

#### `PRO` Example: Add scripts and styles to the `site` object in `.liquid`:

```liquid
{% capture _ %}[
  "https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css",
  "https://cdn.jsdelivr.net/npm/prismjs@1/plugins/treeview/prism-treeview.min.css",
  "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/css/all.min.css",
  "/styles.css"
]{% endcapture %}
{% assign site = site | attr_concat: 'styles', _ %}

{% capture _ %}[
  "https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js",
  "https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js",
  "https://cdn.jsdelivr.net/npm/prismjs@1/plugins/treeview/prism-treeview.min.js"
]{% endcapture %}
{% assign site = site | attr_concat: 'scripts', _ %}
```

</details>

<details><summary>

### `attr_includes`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/attr_includes.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/attr_includes.js)

A filter that filters a list of items by checking if an attribute array includes a target value. Supports nested attribute names using dot notation.

**Why use this?** When working with Eleventy collections, you often need to filter items based on tags or other array attributes in front matter. The `attr_includes` filter provides a flexible way to filter by any array attribute, with support for nested properties using dot notation.

#### Example: Get all posts that include `#javascript` tag

```jinja2 {data-caption="in .njk:"}
{% set js_posts = collections.all | attr_includes('data.tags', '#javascript') %}

{% for post in js_posts %}
  <h2>{{ post.data.title }}</h2>
{% endfor %}
```

</details>

<details><summary>

### `fetch`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/fetch.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/fetch.js)

A filter that fetches content from remote URLs or local files. For remote URLs, it uses `@11ty/eleventy-fetch` to download and cache files. For local paths, it reads files relative to the input directory.

**Why use this?** When building static sites, you often need to include content from external sources or reuse content from local files. The `fetch` filter provides a unified way to retrieve content from both remote URLs and local files, with automatic caching for remote resources to improve build performance.

**Requirements:** This filter requires the `@11ty/eleventy-fetch` package to be installed:

```bash
npm install @11ty/eleventy-fetch
```

> `NOTE:` If `@11ty/eleventy-fetch` is not installed, this filter will not be available. The plugin automatically detects whether the package is installed and only enables the filter if it's present.

**Features:**

- Supports a URL (starting with `http://` or `https://`) or a local file path (relative to the input directory):
  - **Remote URLs**: Downloads and caches content using `@11ty/eleventy-fetch`
    - Caches files for 1 day by default
    - Stores cached files in `[input-dir]/_downloads/` directory
    - Automatically revalidates after cache expires
  - **Local files**: Reads files relative to the Eleventy input directory
    - No caching needed for local files
    - Supports any file type that can be read as text
- **Error handling**: Throws descriptive errors if fetching fails
- **Conditional loading**: Only available when `@11ty/eleventy-fetch` is installed

**Use Cases:**

- Fetch content from external APIs during build time
- Include README files from GitHub repositories
- Reuse content from local files across multiple pages
- Download and inline external CSS or JavaScript
- Fetch data from headless CMS or external data sources
- Include shared content snippets without using Eleventy's include syntax

> `NOTE:` The filter returns raw text content. Use Eleventy's built-in filters like `| safe`, `| markdown`, or `| fromJson` to process the content as needed.

**Examples:**

```jinja2
{# Fetch and display remote content #}
{% set readme = "https://raw.githubusercontent.com/user/repo/main/README.md" | fetch %}
<div class="readme">
  {{ readme | markdown | safe }}
</div>

{# Fetch JSON data from API #}
{% set data = "https://api.example.com/data.json" | fetch %}
{% set items = data | fromJson %}
{% for item in items %}
  <p>{{ item.title }}</p>
{% endfor %}

{# Include local file content #}
{% set changelog = "CHANGELOG.md" | fetch %}
{{ changelog | markdown | safe }}

{# Fetch CSS from CDN and inline it #}
<style>
  {{ "https://cdn.example.com/styles.css" | fetch }}
</style>

{# Reuse content across pages #}
{% set sharedContent = "_includes/shared/footer.html" | fetch %}
{{ sharedContent | safe }}
```

</details>

<details><summary>

### `section`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/section.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/section.js)

A filter that extracts a named section from content marked with HTML comments. This is useful for splitting a single content file (like a Markdown post) into multiple parts that can be displayed and styled independently in your templates.

**Usage:**

1. Mark sections in your content file (e.g., `post.md`):

⚠️ `NOTE:` The `¡` symbol is used instead of `!` only to give examples below. Use `!` in your actual content files.

```markdown
# My Post

<¡--section:intro-->

This is the introduction that appears at the top of the page.

<¡--section:main-->

This is the main body of the post with all the details.

<¡--section:summary,sidebar-->

This content appears in both the summary and the sidebar!
```

2. Use the filter in your templates: <!-- @TODO: better examples -->

```jinja2
{# Get the intro section #}
<div class="page-intro">
  {{ content | section('intro') | safe }}
</div>

{# Get the main section #}
<article>
  {{ content | section('main') | safe }}
</article>

{# Get the sidebar section #}
<aside>
  {{ content | section('sidebar') | safe }}
</aside>
```

**Features:**

- **Multiple names**: A single section can have multiple names separated by commas: `<¡--section:name1,name2-->`
- **Case-insensitive**: Section names are matched without regard to case
- **Multiple occurrences**: If a section name appears multiple times, the filter concatenates all matching sections
- **Non-destructive**: Returns extracted content without modifying the original input
- **EOF support**: Sections continue until the next `<¡--section*-->` marker or the end of the file

**Syntax Rules:**

- Sections start with: `<¡--section:NAME-->` or `<¡--section:NAME1,NAME2-->`
- Sections end at the next `<¡--section*-->` marker or end of file
- Whitespace around names and inside comments is automatically trimmed

</details>

<details><summary>

### `remove_tag`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/remove_tag.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/remove_tag.js)

A filter that removes a specified HTML element from provided HTML content. It removes the tag along with its content, including self-closing tags.

**Why use this?** When working with content from external sources or user-generated content, you may need to strip certain HTML tags for security or presentation purposes. The `remove_tag` filter provides a simple way to remove unwanted tags like `<script>`, `<style>`, or any other HTML elements from your content.

**Features:**

- Removes both opening and closing tags along with their content
- Handles self-closing tags (e.g., `<br />`, `<img />`)
- Handles tags with attributes
- Case-insensitive matching
- Non-destructive: Returns new string, doesn't modify original

**Security note:** While this filter can help sanitize HTML content, it should not be relied upon as the sole security measure. For critical security requirements, use a dedicated HTML sanitization library on the server side before content reaches your templates.

#### Example: Remove all script tags from content <!-- @TODO: better examples -->

```jinja2
{% set cleanContent = htmlContent | remove_tag('script') %}

{{ cleanContent | safe }}
```

</details>

<details><summary>

### `strip_tag`

</summary>

🧩 [Install via Plugin](https://github.com/anydigital/eleventy-blades#install) — or copy-paste from
[`src/filters/strip_tag.js`](https://github.com/anydigital/eleventy-blades/blob/main/src/filters/strip_tag.js)

A filter that strips a specified HTML element from content while keeping its inner content intact. Only the opening and closing tags are removed; everything inside the tag is preserved in place.

**Why use this?** When rendering HTML from a CMS or external source you sometimes need to unwrap a specific element (e.g. remove a wrapping `<div>` or `<section>`) without losing the content it contains. Unlike `remove_tag`, which discards the entire element and its content, `strip_tag` surgically removes only the tags themselves.

**Features:**

- Removes only the opening and closing tags — inner content is preserved
- Handles tags with any attributes
- Strips all occurrences of the tag, including nested ones
- Case-insensitive matching
- Non-destructive: Returns a new string, leaves the original unchanged

#### Example: Unwrap a wrapping `<div>` from content

```jinja2
{% set unwrapped = htmlContent | strip_tag('div') %}

{{ unwrapped | safe }}
```

Input:

```html
<div class="wrapper">
  <p>Hello</p>
  <p>World</p>
</div>
```

Output:

```html
<p>Hello</p>
<p>World</p>
```

</details>
