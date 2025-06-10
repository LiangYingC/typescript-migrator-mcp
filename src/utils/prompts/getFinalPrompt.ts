import getCommonPrompt from "./getCommonPrompt.js";
import getCustomMdPrompt from "./getCustomMdPrompt.js";

export default async function getFinalPrompt(absoluteFilePath: string) {
  const {
    environmentRules: commonEnvironmentRules,
    duringTsFileCreationRules: commonDuringTsFileCreationRules,
    afterTsFileCreationRules: commonAfterTsFileCreationRules,
  } = await getCommonPrompt(absoluteFilePath);

  const customRulesMdContent = await getCustomMdPrompt();
  const customMdRules = customRulesMdContent
    ? `
    - Custom Rules 
      - if any rules above are conflicting with the custom rules, follow the custom rules
      - ${customRulesMdContent}
  `
    : "";

  return `
    Please create a TypeScript version of the ${absoluteFilePath} file, placing it next to the JavaScript version. 
    
    This TypeScript version must follow these rules:    

    - Environment
      - Please use the language I used to talk with me
      ${commonEnvironmentRules}
    
    - During TypeScript File Creation
      ${commonDuringTsFileCreationRules}

    - After TypeScript File Creation
      ${commonAfterTsFileCreationRules}

    ${customMdRules}

    - Finally, 
      - If there are any unresolved issue, that's okay, but clearly explain what they are and possible solutions
      - Verify that your ts file's logic matches the source js exactly, with no new logic or new bugs
      - provide a bullet-point summary of what you did.
    
      If you encounter any difficulties, please let me know during the process.
  `;
}
