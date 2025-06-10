import getPackageVersions from "../getPackageVersions.js";

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
    - Don't manually annotate types where they can be automatically inferred
    - Don't change the original logic, code, or comments, only add TypeScript types and related annotations
    - Don't modify any other existing files
    - You can reference other files or tests that use this file to understand its usage
    - For unknown types, use \`unknown\` instead of \`any\`, but explain why in comments
    - For functions: add appropriate type annotations for parameters and return values
    - For objects and arrays: define clear interfaces or types
    - For classes: add types for properties, method parameters, and return values
    - For modules: add appropriate types for exports and imports
    - If the file is React Component
      - You should migrate it to .tsx file not .ts file
      - You don't need to use React.FC or React.ComponentType to handle component props types. You can create props types using interface or type, and directly assign them to the component prop
  `;

  const afterTsFileCreationRules = `
    - Fix lint and type errors
    - If using comments to suppress lint or type errors, explain why in comments
    - If you've tried fixing the same lint or type error 3 times, stop trying to fix that particular error
    - If the file is React Component
      - Please remove PropTypes if it exists and remove the prop-types package
  `;

  return {
    environmentRules,
    duringTsFileCreationRules,
    afterTsFileCreationRules,
  };
}
