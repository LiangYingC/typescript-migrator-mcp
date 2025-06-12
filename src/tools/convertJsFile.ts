import { z } from "zod";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import getFinalPrompt from "../utils/prompts/getFinalPrompt.js";

export const convertJsFileToolName = "convertJsFileToolName";
export const convertJsFileToolDescription =
  "Convert JavaScript files to TypeScript";

const filePathDescription = "Path to the JavaScript file to convert";

export const ConvertJsFileToolSchema = {
  type: "object",
  properties: {
    filePath: {
      type: "string",
      description: filePathDescription,
    },
  },
  required: ["filePath"],
};

const ConvertJsFileZodSchema = z.object({
  filePath: z.string().describe(filePathDescription),
});
export type ConvertJsFileToolInput = z.infer<typeof ConvertJsFileZodSchema>;

export async function runConvertJsFileTool(
  input: ConvertJsFileToolInput
): Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}> {
  const { filePath } = input;

  let absoluteFilePath: string;

  if (path.isAbsolute(filePath)) {
    absoluteFilePath = filePath;
  } else {
    // Try to resolve relative path intelligently
    const currentDir = process.cwd();
    const potentialPath = path.resolve(currentDir, filePath);

    try {
      // Check if file exists at the resolved path
      await fs.access(potentialPath);
      absoluteFilePath = potentialPath;
    } catch {
      // If file doesn't exist, try resolving from the MCP server's directory
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const serverRoot = path.resolve(__dirname, "../..");
      const fallbackPath = path.resolve(serverRoot, filePath);

      try {
        await fs.access(fallbackPath);
        absoluteFilePath = fallbackPath;
      } catch {
        // If still not found, use the original resolved path and let the error bubble up
        absoluteFilePath = potentialPath;
        throw new Error(`File not found: ${absoluteFilePath}`);
      }
    }
  }

  const finalPrompt = await getFinalPrompt(absoluteFilePath);

  return {
    content: [
      {
        type: "text",
        text: finalPrompt,
      },
    ],
  };
}
