import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync, existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { Layout, FileType, Theme } from "./config.js";
/**
 * Function to parse diagram config located in code block.
 * @param code Diagram D2 code.
 * @returns Configuration and code (config removed).
 */
function parseAndConvertConfig(code) {
    // Define the regex for parsing the config
    const configRegex = /:::config([\s\S]+?):::/g;
    // Temporary storage for the string config
    const userConfig = {};
    // Parse the config from the code block
    const matches = code.matchAll(configRegex);
    for (const match of matches) {
        if (match[1]) {
            const configLines = match[1].trim().split("\n");
            for (const line of configLines) {
                const [key, value] = line.split(":").map((s) => s.trim());
                if (key && value !== undefined) {
                    userConfig[key] = value;
                }
            }
        }
    }
    // Clean the diagram code by removing the config
    code = code.replace(configRegex, "").trim();
    // Convert string config into actual config values
    const config = {};
    for (const [key, stringValue] of Object.entries(userConfig)) {
        switch (key) {
            case "forceAppendix":
                config.forceAppendix = stringValue === "true";
                break;
            case "layout":
                config.layout = Layout[stringValue];
                break;
            case "theme":
                config.theme = Theme[stringValue];
                break;
            case "darkTheme":
                config.darkTheme = Theme[stringValue];
                break;
            case "padding":
                config.padding = parseInt(stringValue, 10);
                break;
            case "animateInterval":
                config.animateInterval = parseInt(stringValue, 10);
                break;
            case "timeout":
                config.timeout = parseInt(stringValue, 10);
                break;
            case "sketch":
                config.sketch = stringValue === "true";
                break;
            case "center":
                config.center = stringValue === "true";
                break;
            case "scale":
                config.scale = parseFloat(stringValue);
                break;
            case "target":
                config.target = stringValue;
                break;
            case "fontRegular":
                config.fontRegular = stringValue;
                break;
            case "fontItalic":
                config.fontItalic = stringValue;
                break;
            case "fontBold":
                config.fontBold = stringValue;
                break;
            case "fontSemiBold":
                config.fontSemiBold = stringValue;
                break;
            case "fileType":
                config.fileType = FileType[stringValue];
                break;
            case "directory":
                config.directory = stringValue;
                break;
        }
    }
    return { config, code };
}
/**
 * D2 plugin to convert markdown D2 code blocks to images.
 * @param md Markdown.
 * @param defaultConfig Default D2 plugin config.
 */
export default function d2(md, defaultConfig = {}) {
    // Store original fence to return if no D2 diagram rendered
    const originalFence = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const tokenInfo = token.info.toLowerCase();
        // If code fence is for D2 diagram
        if (tokenInfo === "d2" || tokenInfo === "d2lang") {
            const { config: diagramConfig, code: code } = parseAndConvertConfig(token.content);
            // Merge default config with diagram config
            const config = { ...defaultConfig, ...diagramConfig };
            // Create output directory if not exist
            const outputDir = `/${config.directory ?? "d2-diagrams"}`;
            if (!existsSync(outputDir)) {
                mkdirSync(outputDir, { recursive: true });
            }
            // Get filetype
            const fileType = FileType[config.fileType ?? FileType.SVG];
            // Generate unique filename for diagram image output file
            const imageFilePath = path.join(outputDir, `d2-diagram-${Date.now()}.${fileType.toLowerCase()}`);
            // Write the D2 diagram code to a temporary .d2 file
            const tempD2FilePath = path.join(outputDir, "temp.d2");
            writeFileSync(tempD2FilePath, code);
            // Construct command line arguments from config
            const args = [tempD2FilePath, imageFilePath];
            if (config.forceAppendix === true) {
                args.push("--force-appendix");
            }
            if (config.layout != null) {
                args.push(`--layout=${Layout[config.layout].toLowerCase()}`);
            }
            if (config.theme != null) {
                args.push(`--theme=${config.theme}`);
            }
            if (config.darkTheme != null) {
                args.push(`--dark-theme=${config.darkTheme}`);
            }
            if (config.padding != null) {
                args.push(`--pad=${config.padding}`);
            }
            if (config.animateInterval != null) {
                args.push(`--animate-interval=${config.animateInterval}`);
            }
            if (config.timeout != null) {
                args.push(`--timeout=${config.timeout}`);
            }
            if (config.sketch === true) {
                args.push("--sketch");
            }
            if (config.center === true) {
                args.push("--center");
            }
            if (config.scale != null) {
                args.push(`--scale=${config.scale}`);
            }
            if (config.target != null) {
                args.push(`--target=${config.target}`);
            }
            if (config.fontRegular != null) {
                args.push(`--font-regular=${config.fontRegular}`);
            }
            if (config.fontItalic != null) {
                args.push(`--font-italic=${config.fontItalic}`);
            }
            if (config.fontBold != null) {
                args.push(`--font-bold=${config.fontBold}`);
            }
            if (config.fontSemiBold != null) {
                args.push(`--font-semibold=${config.fontSemiBold}`);
            }
            // Run D2 command to generate output diagram image file
            const command = spawnSync("d2", args, { encoding: "utf-8", stdio: "pipe" });
            // Log any error with D2 command
            if (command.status !== 0) {
                console.error(`Error: Failed to generate D2 diagram.\n${command.stderr}`);
            }
            // Get diagram image file content as a base64-encoded string
            const imageContent = readFileSync(imageFilePath, { encoding: "base64" });
            // Get media type from file type
            let mediaType;
            switch (fileType) {
                case FileType.SVG:
                    mediaType = "image/svg+xml";
                    break;
                case FileType.PNG:
                    mediaType = "image/png";
                    break;
                case FileType.GIF:
                    mediaType = "image/gif";
                    break;
            }
            // Create data URI for diagram image in base64 format
            const dataUri = `data:${mediaType};base64,${imageContent}`;
            // Delete the image file as no longer required
            unlinkSync(imageFilePath);
            // Delete temporary D2 file
            unlinkSync(tempD2FilePath);
            // Return an image tag with the Data URI as the source
            return `<img src="${dataUri}" class="d2-diagram" alt="D2 Diagram" />`;
        }
        // For other languages return the original fence
        return originalFence(tokens, idx, options, env, slf);
    };
}
