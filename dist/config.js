/**
 * Enum defining D2 layouts.
 */
export var Layout;
(function (Layout) {
    /** Dagre is D2's default layout engine */
    Layout["DAGRE"] = "DAGRE";
    /** ELK is a mature, hierarchical layout, actively maintained by an academic research group at Christian Albrechts University in Kiel */
    Layout["ELK"] = "ELK";
    /** Tala is a proprietary layout engine developed by Terrastruct, designed specifically for software architecture diagrams */
    Layout["TALA"] = "TALA";
})(Layout || (Layout = {}));
/**
 * Enum defining D2 themes.
 */
export var Theme;
(function (Theme) {
    /** Neutral default */
    Theme[Theme["NEUTRAL_DEFAULT"] = 0] = "NEUTRAL_DEFAULT";
    /** Neutral Grey */
    Theme[Theme["NEUTRAL_GREY"] = 1] = "NEUTRAL_GREY";
    /** Flagship Terrastruct */
    Theme[Theme["FLAGSHIP_TERRASTRUCT"] = 3] = "FLAGSHIP_TERRASTRUCT";
    /** Cool classics */
    Theme[Theme["COOL_CLASSICS"] = 4] = "COOL_CLASSICS";
    /** Mixed berry blue */
    Theme[Theme["MIXED_BERRY_BLUE"] = 5] = "MIXED_BERRY_BLUE";
    /** Grape soda */
    Theme[Theme["GRAPE_SODA"] = 6] = "GRAPE_SODA";
    /** Aubergine */
    Theme[Theme["AUBERGINE"] = 7] = "AUBERGINE";
    /** Colorblind clear */
    Theme[Theme["COLORBLIND_CLEAR"] = 8] = "COLORBLIND_CLEAR";
    /** Vanilla nitro cola */
    Theme[Theme["VANILLA_NITRO_COLA"] = 100] = "VANILLA_NITRO_COLA";
    /** Orange creamsicle */
    Theme[Theme["ORANGE_CREAMSICLE"] = 101] = "ORANGE_CREAMSICLE";
    /** Shirley temple */
    Theme[Theme["SHIRLEY_TEMPLE"] = 102] = "SHIRLEY_TEMPLE";
    /** Earth tones */
    Theme[Theme["EARTH_TONES"] = 103] = "EARTH_TONES";
    /** Everglade green */
    Theme[Theme["EVERGLADE_GREEN"] = 104] = "EVERGLADE_GREEN";
    /** Buttered toast */
    Theme[Theme["BUTTERED_TOAST"] = 105] = "BUTTERED_TOAST";
    /** Terminal */
    Theme[Theme["TERMINAL"] = 300] = "TERMINAL";
    /** Terminal Grayscale */
    Theme[Theme["TERMINAL_GRAYSCALE"] = 301] = "TERMINAL_GRAYSCALE";
    /** Origami */
    Theme[Theme["ORIGAMI"] = 302] = "ORIGAMI";
    /** Dark Mauve */
    Theme[Theme["DARK_MUAVE"] = 200] = "DARK_MUAVE";
    /** Dark Flagship Terrastruct */
    Theme[Theme["DARK_FLAGSHIP_TERRASTRUCT"] = 201] = "DARK_FLAGSHIP_TERRASTRUCT";
})(Theme || (Theme = {}));
/**
 * Enum defining D2 export file types.
 */
export var FileType;
(function (FileType) {
    /** SVG is the default export format on the CLI. If you don't specify an output, the export file will be the input name as an SVG file. */
    FileType["SVG"] = "SVG";
    /** PNG exports work by Playwright spinning up a headless browser, putting the SVG onto it, and taking a screenshot. The first invocation of Playwright will download its dependencies, if they don't already exist on the machine. */
    FileType["PNG"] = "PNG";
    /** GIF export format is useful for giving presentations when used with short compositions. For example, show two Scenarios, show a couple of steps. Something that the audience can digest in a loop that lasts a couple of seconds without needing to flip through it manually. */
    FileType["GIF"] = "GIF";
})(FileType || (FileType = {}));
