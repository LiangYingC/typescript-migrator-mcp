import getCommonPrompt from "./getCommonPrompt.js";

export default async function getFinalPrompt(absoluteFilePath: string) {
  const languageCode = process.env.LANGUAGE_CODE;

  const {
    environmentRules: commonEnvironmentRules,
    duringTsFileCreationRules: commonDuringTsFileCreationRules,
    afterTsFileCreationRules: commonAfterTsFileCreationRules,
  } = await getCommonPrompt(absoluteFilePath);

  return `
    Please create a TypeScript version of the ${absoluteFilePath} file, placing it next to the JavaScript version. 
    
    This TypeScript version must follow these rules:    

    - Environment
        ${
          languageCode
            ? `- Please use the ${languageCode} language to talk with me`
            : "Please use the language I used to talk with me"
        } 
        ${commonEnvironmentRules}
    
    - During TypeScript File Creation
        ${commonDuringTsFileCreationRules}

    - After TypeScript File Creation
        ${commonAfterTsFileCreationRules}

    If you encounter any difficulties, please let me know during the process.
  `;
}
