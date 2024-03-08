# vitepress-plugin-d2
Plugin for VitePress to add support for rendering D2 diagrams.

## Requirements

The plugin requires the D2 diagram language to be installed on your system, it is compatible with Linux, Windows and MacOS.

You can use the following command on Linux to install D2 ([official docs](https://d2lang.com/tour/install)).

```bash
curl -fsSL https://d2lang.com/install.sh | sh -s -- --tala
```

If you are running on Windows, you can install the latest release `.msi` file from the official GitHub repo [here](https://github.com/terrastruct/TALA/releases/).

Once you have installed D2, you can check it is working by running the following command.

```bash
d2 --version
```

## Installation

First, install the plugin from NPM.
```bash
npm install vitepress-plugin-d2
```

Then import it and update your VitePress `config.mts` file to use the plugin as shown below.

```ts
import { defineConfig } from "vitepress";

// Import D2 diagram plugin
import d2 from "vitepress-plugin-d2"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "docs",
  description: "my docs",
  cleanUrls: true,
  themeConfig: {
    ...
  },
  markdown: {
    config: (md) => {
        // Use D2 diagram plugin with optional configuration
        md.use(d2, {
            config: {
                ...
            },
        });
    },
  },
});
```
