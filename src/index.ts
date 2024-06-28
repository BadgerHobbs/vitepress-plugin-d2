import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync, existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { Config, Layout, FileType, Theme } from "./config.js";

/**
 * Function to parse diagram config located in code block.
 * @param code Diagram D2 code.
 * @returns Configuration and code (config removed).
 */
function parseAndConvertConfig(code: string): { config: Config; code: string } {
    // Define the regex for parsing the config
    const configRegex = /:::config([\s\S]+?):::/g;
    
    // Temporary storage for the string config
    const userConfig: Record<string, string> = {};
  
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
    const config: Config = {};
    for (const [key, stringValue] of Object.entries(userConfig)) {
      switch (key) {
        case "forceAppendix":
          config.forceAppendix = stringValue === "true";
          break;
        case "layout":
          config.layout = Layout[stringValue as keyof typeof Layout];
          break;
        case "theme":
          config.theme = Theme[stringValue as keyof typeof Theme];
          break;
        case "darkTheme":
          config.darkTheme = Theme[stringValue as keyof typeof Theme];
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
          config.fileType = FileType[stringValue as keyof typeof FileType];
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
export default function d2(md: any, defaultConfig: Config = {}) {
    // Store original fence to return if no D2 diagram rendered
    const originalFence = md.renderer.rules.fence.bind(md.renderer.rules);
  
    md.renderer.rules.fence = (tokens: any, idx: any, options: any, env: any, slf: any) => {
      const token = tokens[idx];
      const tokenInfo = token.info.toLowerCase();
  
      // If code fence is for D2 diagram
      if (tokenInfo === "d2" || tokenInfo === "d2lang") {

        const { config: diagramConfig, code: code } = parseAndConvertConfig(token.content);
  
        // Merge default config with diagram config
        const config = { ...defaultConfig, ...diagramConfig };
  
        // Create output directory if not exist
        const outputDir = `./${config.directory ?? "d2-diagrams"}`;
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }
  
        // Get filetype
        const fileType = FileType[config.fileType ?? FileType.SVG]

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

        // Get media type from file type
        let mediaType: string;
        switch(fileType) {
            case FileType.SVG:
                mediaType = "image/svg+xml";
                break;
            case FileType.BASE64_SVG:
                mediaType = "image/svg+xml";
                break;
            case FileType.PNG:
                mediaType = "image/png";
                break;
            case FileType.GIF:
                mediaType = "image/gif";
                break;
        }
        
        // Create an image tag for PNG, GIF and Base64 SVG, or directly embed SVG
        let imageHtml: string;
        if (fileType === FileType.SVG) {
            // Directly embed the SVG XML into the HTML to enable interactive functionality
            let svgContent = readFileSync(imageFilePath, { encoding: "utf-8" });

            // Replace <style> tags with <svg:style> to avoid Vue errors
            svgContent = svgContent.replace(/<style/gi, "<svg:style");
            svgContent = svgContent.replace(/<\/style>/gi, "</svg:style>");

            // Replace <script> tags with <svg:script> to avoid Vue errors
            svgContent = svgContent.replace(/<script/gi, "<svg:script");
            svgContent = svgContent.replace(/<\/script>/gi, "</svg:script>");

            // Remove the XML processing instruction, if present.
            svgContent = svgContent.replace(/<\?xml[^>]*\?>/gi, "");

            imageHtml = `<div class="d2-diagram">${svgContent}</div>`;
        } else {
            // Create data URI for image types in base64 format
            const imageContent = readFileSync(imageFilePath, { encoding: "base64" });
            const dataUri = `data:${mediaType};base64,${imageContent}`;
            imageHtml = `<img src="${dataUri}" class="d2-diagram" alt="D2 Diagram" />`;
        }

        // Delete the image file as no longer required
        unlinkSync(imageFilePath);

        // Delete temporary D2 file
        unlinkSync(tempD2FilePath);

        // Return rendered diagram image html
        return imageHtml;
    } 
        
    // For other languages return the original fence
    return originalFence(tokens, idx, options, env, slf);
  }
}
