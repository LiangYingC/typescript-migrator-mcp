import fs from "fs/promises";

/**
 * Get custom rules from a markdown file
 * @returns Formatted custom rules string, or empty string if no rules found
 */
export default async function getCustomMdPrompt(): Promise<string> {
  const customRulesMdFilePath = process.env.CUSTOM_RULES_MD_FILE_PATH;
  if (!customRulesMdFilePath) {
    return "";
  }

  try {
    const content = await fs.readFile(customRulesMdFilePath, "utf-8");
    return content;
  } catch (error) {
    console.warn("Failed to read custom rules:", error);
    return "";
  }
}
