### Base 11ty npm scripts <small>via npm workspace</small> {#base-scripts}

This package provides a pre-configured `do` folder setup that helps organize your development workflow using npm workspaces. The `do` folder contains scripts for building and running your Eleventy project.

**Installation:**

1. Install https://github.com/anydigital/eleventy-blades to reuse pre-defined 11ty scripts from there:

```sh
npm install @anydigital/eleventy-blades
```

2. Create a helper folder `do` to symlink the `do/package.json` within:

```sh
mkdir do
cd ./do
ln -s ../node_modules/@anydigital/eleventy-blades/src/do/package.json
```

3. Finally register `do` folder as npm workspace in your root `package.json`:

```json {data-caption=./package.json}
{
  ...
  "workspaces": ["do"],
  "scripts": {
    "start": "npm -w do run start",
    "stage": "npm -w do run stage",
    "build": "npm -w do run build"
  },
  ...
}
```

**Done!** 🎉 Now you can run:

- `npm start` to start 11ty dev server with live reload and Tailwind watch mode
- `npm run stage` to build and serve production-like site locally
- `npm run build` to finally build the site for production
- all available scripts: https://github.com/anydigital/eleventy-blades/blob/main/src/do/package.json

**Living example:** https://github.com/anydigital/sveleven

**Benefits:**

- **Clean separation**: Keep build scripts separate from project configuration
- **Reusable workflows**: Update scripts by upgrading the package
- **Workspace isolation**: Scripts run in their own workspace context
- **Easy maintenance**: No need to manually maintain build scripts
