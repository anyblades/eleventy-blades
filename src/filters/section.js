// <!--section:code-->```js
/**
 * Extract a named section from content marked with HTML comments
 *
 * @param {string} content - The content to process
 * @param {string} sectionName - The section name(s) to extract
 * @returns {string} The extracted section content
 */
export function section(content, sectionName) {
  if (!content || typeof content !== "string") {
    return content;
  }

  if (typeof sectionName !== "string" || !sectionName) {
    return "";
  }

  // Normalize section name for comparison (trim whitespace)
  const targetName = sectionName.trim().toLowerCase();

  // Regex to match section markers with content up to the next section or end of string
  // Captures: (1) section names, (2) content until next section marker or end
  const sectionRegex = /<!--section:([^>]+)-->([\s\S]*?)(?=<!--section|$)/g;

  let results = [];
  let match;

  // Find all sections
  while ((match = sectionRegex.exec(content)) !== null) {
    const namesStr = match[1];
    const sectionContent = match[2];
    const names = namesStr.split(",").map((n) => n.trim().toLowerCase());

    // Check if any of the names match the target
    if (names.includes(targetName)) {
      results.push(sectionContent);
    }
  }

  // Join all matching sections
  return results.join("");
}

/**
 * section filter - Extract a named section from content
 *
 * Usage in templates:
 *   {{ content | section('intro') }}
 *   {{ content | section('footer') }}
 *
 * Content format:
 *   <!--section:intro-->
 *   This is the intro content
 *   <!--section:main-->
 *   This is the main content
 *   <!--section:footer,sidebar-->
 *   This appears in both footer and sidebar sections
 *
 * @param {Object} eleventyConfig - The Eleventy configuration object
 */
export function sectionFilter(eleventyConfig) {
  eleventyConfig.addFilter("section", section);
}
/*```

<!--section:docs-->
### `section`

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
*/
