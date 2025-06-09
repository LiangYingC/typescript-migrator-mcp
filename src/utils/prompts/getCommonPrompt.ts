import getPackageVersions from "../getPackageVersions.js";
import getCustomMdPrompt from "./getCustomMdPrompt.js";

export default async function getCommonPrompt(filePath: string) {
  const versions = await getPackageVersions(filePath);
  const typescriptVersion = versions.typescript;

  if (!typescriptVersion) {
    throw new Error("TypeScript version not found in your project.");
  }

  const environmentRules = `
      - TypeScript version: ${typescriptVersion}
  `;

  const duringTsFileCreationRules = `
    - During TypeScript File Creation
      - Don't change the original logic, code, or comments, only add TypeScript types and related annotations
      - Don't modify any other existing files
      - You can reference other files or tests that use this file to understand its usage
      - For unknown types, use \`unknown\` instead of \`any\`, but explain why in comments
      - For functions: add appropriate type annotations for parameters and return values
      - For objects and arrays: define clear interfaces or types
      - For classes: add types for properties, method parameters, and return values
      - For modules: add appropriate types for exports and imports

    - After TypeScript File Creation
      - Fix lint and type errors
      - If using comments to suppress lint or type errors, explain why in comments
      - If you've tried fixing the same lint or type error 3 times, stop trying to fix that particular error
      - Verify that your ts file's logic matches the source js exactly, with no new logic or new bugs
      - Finally, provide a bullet-point summary of what you did
      - If there are any unresolved issue, that's okay, but clearly explain what they are and possible solutions
    `;

  const afterTsFileCreationRules = `
    - After TypeScript File Creation
      - Fix lint and type errors
      - If using comments to suppress lint or type errors, explain why in comments
      - If you've tried fixing the same lint or type error 3 times, stop trying to fix that particular error
      - Verify that your ts file's logic matches the source js exactly, with no new logic or new bugs
  `;

  const customRulesContent = await getCustomMdPrompt();
  const customRules = customRulesContent
    ? `
    - Custom Rules 
      - if any rules above are conflicting with the custom rules, follow the custom rules
      - ${customRulesContent}
  `
    : "";

  return {
    environmentRules,
    duringTsFileCreationRules,
    afterTsFileCreationRules,
    customRules,
  };
}
