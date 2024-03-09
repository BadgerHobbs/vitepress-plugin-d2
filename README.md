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

Depending on where you are running the build process (such as GitHub codespaces) you may need to grand permissions to the `d2-diagram` directory using something like the below command.

```bash
sudo chown codespace:codespace /d2-diagrams/
```

## Installation

First, install the plugin from NPM.
```bash
npm install -D vitepress-plugin-d2
```

Then import it and update your VitePress `config.mts` file to use the plugin as shown below.

```ts
import { defineConfig } from "vitepress";

// Import D2 diagram plugin
import d2 from "vitepress-plugin-d2"
import { Layout, Theme, FileType } from 'vitepress-plugin-d2/dist/config';

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
        forceAppendix: false,
        layout: Layout.ELK,
        theme: Theme.NEUTRAL_DEFAULT,
        darkTheme: Theme.DARK_MUAVE,
        padding: 100,
        animatedInterval: 0,
        timeout: 120,
        sketch: false,
        center: false,
        scale: -1,
        target: "*",
        fontItalic: null,
        fontBold: null,
        fontSemiBold: null,
        fileType: FileType.SVG,
        directory: "d2-diagram",
      });
    },
  },
});
```

## Usage

To use the D2 diagram plugin you just need to specify the `d2` language next to the backticks before the fenced code block.

````
```d2
x -> y
```
````

See the `/example` directory within the repository for a full working example of how to use the plugin with VitePress.

## Further Reading

For further documentation on how to render different types of diagrams using D2, you can checkout the [official documentation here](https://d2lang.com/tour/intro/).

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
