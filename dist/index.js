import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync, existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { Layout, FileType } from "./config.js";
export default function d2(md, config = {}) {
    // Store original fence to return if no D2 diagram rendered
    const originalFence = md.renderer.rules.fence.bind(md.renderer.rules);
    // Create output directory if not exist
    const outputDir = "/d2-diagrams";
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const tokenInfo = token.info.toLowerCase();
        // If code fence is for D2 diagram
        if (tokenInfo === "d2" || tokenInfo === "d2lang") {
            // Get D2 diagram code
            const code = token.content.trim();
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
                args.push(`--theme=${config.darkTheme}`);
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
            // Get diagram image file content
            const imageContent = readFileSync(imageFilePath, { encoding: "utf8" });
            // Encode image into data URI format
            const encodedImage = encodeURIComponent(imageContent)
                .replace(/'/g, "%27")
                .replace(/"/g, "%22");
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
            // Create data URI for diagram image
            const dataUri = `data:${mediaType},${encodedImage}`;
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
