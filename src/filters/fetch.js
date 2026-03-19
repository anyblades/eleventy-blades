// <!--section:code-->```js
import EleventyFetch from "@11ty/eleventy-fetch";
import path from "path";
import fs from "fs/promises";

/**
 * fetch filter - Fetch a URL or local file and return its raw content
 *
 * This filter takes a URL or local file path. For URLs, it downloads them
 * using eleventy-fetch to the input directory's _downloads folder.
 * For local paths, it reads them relative to the input directory.
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function fetchFilter(eleventyConfig) {
  eleventyConfig.addFilter("fetch", async function (url) {
    if (!url) {
      throw new Error("fetch filter requires a URL or path");
    }

    // Get the input directory from Eleventy config
    const inputDir = this.eleventy.directories.input;

    // Check if it's a URL or local path
    const isUrl = url.startsWith("http://") || url.startsWith("https://");

    try {
      if (isUrl) {
        // Handle remote URLs with eleventy-fetch
        const cacheDirectory = path.join(inputDir, "_downloads");
        const content = await EleventyFetch(url, {
          duration: "1d", // Cache for 1 day by default
          type: "text", // Return as text
          directory: cacheDirectory,
        });
        return content.toString(); // toString() handles bytes cache (inside eleventyComputed)
      } else {
        // Handle local file paths relative to input directory
        const filePath = path.join(inputDir, url);
        const content = await fs.readFile(filePath, "utf-8");
        return content;
      }
    } catch (error) {
      throw new Error(`Failed to fetch ${url}: ${error.message}`);
    }
  });
}
/*```

<!--section:docs-->
### `fetch`

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
*/
