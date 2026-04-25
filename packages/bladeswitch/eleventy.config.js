import baseConfig from "@anyblades/eleventy-blades/base-config";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("../");
  eleventyConfig.setIncludesDirectory(".bladeswitch/_includes/");
  eleventyConfig.setOutputDirectory("../_site/");

  baseConfig(eleventyConfig);
}
