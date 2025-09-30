import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

describe("getHeroAction", () => {
  test("should fetch hero data and return with complete image url", async () => {
    const data = await getHeroAction("clark-kent");

    expect(data).toBeDefined();
    expect(data.image).toContain("http");
  });
  test("should throw an error if hero is not found", async () => {
    const result = await getHeroAction("clark1").catch((error) => {
      expect(error).toBeDefined();
      expect(error.status).toBe(404);
    });

    expect(result).toBeUndefined();
  });
});
