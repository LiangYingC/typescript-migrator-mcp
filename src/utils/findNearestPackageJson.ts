import fs from "fs/promises";
import path from "path";

/**
 * Find the nearest package.json by traversing up the directory tree
 * @param startPath Directory or file path to start searching from
 * @returns Path to the nearest package.json file (always absolute path)
 * @throws Error if no package.json is found up to root
 */
export default async function findNearestPackageJson(
  startPath: string = process.cwd()
): Promise<string> {
  // Convert to absolute path first
  const absolutePath = path.isAbsolute(startPath)
    ? startPath
    : path.resolve(process.cwd(), startPath);

  // Get the starting directory
  let currentDir = absolutePath;
  const stat = await fs.stat(absolutePath).catch(() => null);
  if (stat?.isFile()) {
    currentDir = path.dirname(absolutePath);
  }

  while (true) {
    const packageJsonPath = path.join(currentDir, "package.json");

    try {
      const stats = await fs.stat(packageJsonPath);
      if (stats.isFile()) {
        return packageJsonPath; // Already absolute because currentDir is absolute
      }
    } catch {
      // package.json not found in current directory
    }

    // Move up one directory
    const parentDir = path.dirname(currentDir);

    // If we've reached the root directory (dirname returns the same path)
    if (parentDir === currentDir) {
      throw new Error(
        `Could not find package.json in ${absolutePath} or any parent directory`
      );
    }

    currentDir = parentDir;
  }
}
