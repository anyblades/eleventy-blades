<!--section:index-->
<hgroup id="11ty"><small>Build Awesome plugin</small>

## Eleventy blades <small>[<i>↗</i>](https://github.com/anydigital/eleventy-blades)</small>

<p></p></hgroup>

Ultimate blade kit for 11ty (Build Awesome):

<big>

- [Data helpers](https://blades.ninja/build-awesome-11ty/#data-helpers)
- [Auto link favicons](https://blades.ninja/build-awesome-11ty/#auto-link-favicons) {data-marker=🥷}
- [Auto-raw tags](https://blades.ninja/build-awesome-11ty/#auto-raw)
- [Auto-newlines-to-br](https://blades.ninja/build-awesome-11ty/#auto-nl2br)
- [Base eleventy.config.js](https://blades.ninja/build-awesome-11ty/#base-config) {data-marker=🥷}
- [Reusable npm scripts](https://blades.ninja/build-awesome-11ty/#npm-scripts) {data-marker=🥷}

{.columns}

</big>

<details><summary role="button" class="outline"><b>Install Eleventy blades</b></summary>

```sh
npm install @anydigital/eleventy-blades
```

Then choose one of the following options:

<mark>Option A.</mark> Starting 11ty from scratch?

Consider symlinking entire `eleventy.config.js`:

```sh
ln -s ./node_modules/@anydigital/eleventy-blades/src/eleventy.config.js
```

Learn more: https://blades.ninja/build-awesome-11ty/#base-config

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
