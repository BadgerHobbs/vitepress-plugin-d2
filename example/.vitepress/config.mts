import { defineConfig } from 'vitepress'

// Import D2 diagram plugin
import d2 from 'vitepress-plugin-d2';
import { Layout, Theme, FileType } from 'vitepress-plugin-d2/dist/config';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VitePress Plugin D2 Example",
  description: "VitePress D2 plugin example site.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: "Made with ❤️ by Andrew Riggs • Released under the MIT License",
    },
    search: {
      provider: "local",
    },
    nav: [
      { text: 'Examples', link: '/' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'D2 Diagram Examples', link: '/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BadgerHobbs/vitepress-plugin-d2' }
    ]
  },
  markdown: {
    config: (md) => {
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
        directory: "d2-diagrams",
      });
    },
  },
})
