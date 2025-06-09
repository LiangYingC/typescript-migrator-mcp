import path from "path";
import { fileURLToPath } from "url";
import findNearestPackageJson from "./findNearestPackageJson.js";

const __filename = fileURLToPath(import.meta.url);

describe("findNearestPackageJson", () => {
  it("should find package.json from current directory", async () => {
    const result = await findNearestPackageJson();
    expect(result).toBe(path.resolve(process.cwd(), "package.json"));
  });

  it("should find package.json from a subdirectory", async () => {
    const result = await findNearestPackageJson("src/utils");
    expect(result).toBe(path.resolve(process.cwd(), "package.json"));
  });

  it("should find package.json when given absolute path", async () => {
    const absolutePath = path.resolve(process.cwd(), "src/utils");
    const result = await findNearestPackageJson(absolutePath);
    expect(result).toBe(path.resolve(process.cwd(), "package.json"));
  });

  it("should find package.json when given a file path", async () => {
    const result = await findNearestPackageJson(__filename);
    expect(result).toBe(path.resolve(process.cwd(), "package.json"));
  });

  it("should throw error when no package.json found", async () => {
    // 使用一個不太可能有 package.json 的路徑（根目錄）
    await expect(findNearestPackageJson("/")).rejects.toThrow(
      "Could not find package.json in"
    );
  });
});
