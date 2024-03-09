/**
 * Enum defining D2 layouts.
 */
export enum Layout {
  /** Dagre is D2's default layout engine */
  DAGRE = "DAGRE",

  /** ELK is a mature, hierarchical layout, actively maintained by an academic research group at Christian Albrechts University in Kiel */
  ELK = "ELK",

  /** Tala is a proprietary layout engine developed by Terrastruct, designed specifically for software architecture diagrams */
  TALA = "TALA",
}

/**
 * Enum defining D2 themes.
 */
export enum Theme {
  /** Neutral default */
  NEUTRAL_DEFAULT = 0,

  /** Neutral Grey */
  NEUTRAL_GREY = 1,

  /** Flagship Terrastruct */
  FLAGSHIP_TERRASTRUCT = 3,

  /** Cool classics */
  COOL_CLASSICS = 4,

  /** Mixed berry blue */
  MIXED_BERRY_BLUE = 5,

  /** Grape soda */
  GRAPE_SODA = 6,

  /** Aubergine */
  AUBERGINE = 7,

  /** Colorblind clear */
  COLORBLIND_CLEAR = 8,

  /** Vanilla nitro cola */
  VANILLA_NITRO_COLA = 100,

  /** Orange creamsicle */
  ORANGE_CREAMSICLE = 101,

  /** Shirley temple */
  SHIRLEY_TEMPLE = 102,

  /** Earth tones */
  EARTH_TONES = 103,

  /** Everglade green */
  EVERGLADE_GREEN = 104,

  /** Buttered toast */
  BUTTERED_TOAST = 105,

  /** Terminal */
  TERMINAL = 300,

  /** Terminal Grayscale */
  TERMINAL_GRAYSCALE = 301,

  /** Origami */
  ORIGAMI = 302,

  /** Dark Mauve */
  DARK_MUAVE = 200,

  /** Dark Flagship Terrastruct */
  DARK_FLAGSHIP_TERRASTRUCT = 201,
}

/**
 * Enum defining D2 export file types.
 */
export enum FileType {
  /** SVG is the default export format on the CLI. If you don't specify an output, the export file will be the input name as an SVG file. */
  SVG = "SVG",

  /** PNG exports work by Playwright spinning up a headless browser, putting the SVG onto it, and taking a screenshot. The first invocation of Playwright will download its dependencies, if they don't already exist on the machine. */
  PNG = "PNG",

  /** GIF export format is useful for giving presentations when used with short compositions. For example, show two Scenarios, show a couple of steps. Something that the audience can digest in a loop that lasts a couple of seconds without needing to flip through it manually. */
  GIF = "GIF",
}

/**
 * Interface defining D2 configuration.
 */
export interface Config {
  /** An appendix for tooltips and links is added to PNG exports since they are not interactive. Force appendix adds an appendix to SVG exports as well (default false) */
  forceAppendix?: boolean | undefined;

  /** The layout engine used (default "dagre") */
  layout?: Layout | undefined;

  /** The diagram theme ID (default NEUTRAL_DEFAULT) */
  theme?: Theme | undefined;

  /** The theme to use when the viewer's browser is in dark mode. When left unset theme config is used for both light and dark mode. Be aware that explicit styles set in D2 code will still be applied and this may produce unexpected results. (default null) */
  darkTheme?: Theme | undefined;

  /** Pixels padded around the rendered diagram (default 100) */
  padding?: number | undefined;

  /** If given, multiple boards are packaged as 1 SVG which transitions through each board at the interval (in milliseconds). Can only be used with SVG exports. (default 0) */
  animateInterval?: number | undefined;

  /** The maximum number of seconds that D2 runs for before timing out and exiting. When rendering a large diagram, it is recommended to increase this value (default 120) */
  timeout?: number | undefined;

  /** Render the diagram to look like it was sketched by hand (default false) */
  sketch?: boolean | undefined;

  /** Center the SVG in the containing viewbox, such as your browser screen (default false) */
  center?: boolean | undefined;

  /** Scale the output. E.g., 0.5 to halve the default size. Default -1 means that SVG's will fit to screen and all others will use their default render size. Setting to 1 turns off SVG fitting to screen. (default -1) */
  scale?: number | undefined;

  /** Target board to render. Pass an empty string to target root board. If target ends with '*', it will be rendered with all of its scenarios, steps, and layers. Otherwise, only the target board will be rendered. E.g. '' to render root board only or 'layers.x.*' to render layer 'x' with all of its children. (default "*") */
  target?: string | undefined;

  /** Path to .ttf file to use for the regular font. If none provided, Source Sans Pro Regular is used. (default null) */
  fontRegular?: string | undefined;

  /** Path to .ttf file to use for the italic font. If none provided, Source Sans Pro Regular-Italic is used. (default null) */
  fontItalic?: string | undefined;

  /** Path to .ttf file to use for the bold font. If none provided, Source Sans Pro Bold is used. (default null) */
  fontBold?: string | undefined;

  /** Path to .ttf file to use for the semibold font. If none provided, Source Sans Pro Semibold is used. (default null) */
  fontSemiBold?: string | undefined;

  /** File type to export diagram images as, either SVG, PNG or GIF. (default SVG) */
  fileType?: FileType | undefined;
}
