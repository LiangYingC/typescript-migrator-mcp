import { z } from "zod";
import path from "path";
import getFinalPrompt from "../utils/prompts/getFinalPrompt.js";

export const convertJsFileToolName = "typescript-migrator";
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

  const absoluteFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

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
