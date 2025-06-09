import fs from "fs/promises";
import path from "path";
import findNearestPackageJson from "./findNearestPackageJson.js";

export const PACKAGE_NAMES = {
  typescript: "typescript",
  react: "react",
} as const;

type PackageName = (typeof PACKAGE_NAMES)[keyof typeof PACKAGE_NAMES];
type PackageVersions = Record<PackageName, string | null>;

let cachedVersions: PackageVersions | null = null;

export default async function getPackageVersions(
  startPath: string = process.cwd()
): Promise<PackageVersions> {
  if (cachedVersions) {
    return cachedVersions;
  }

  try {
    const packageJsonPath = await findNearestPackageJson(startPath);
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

    const versions: PackageVersions = {
      typescript:
        packageJson.devDependencies?.typescript ||
        packageJson.dependencies?.typescript ||
        null,
      react:
        packageJson.dependencies?.react ||
        packageJson.devDependencies?.react ||
        null,
    };

    cachedVersions = versions;
    return versions;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Unexpected error while reading package.json`);
  }
}
