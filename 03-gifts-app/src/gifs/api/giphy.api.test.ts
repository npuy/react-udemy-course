import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe("giphyApi", () => {
  test("default params should be correct", () => {
    const params = giphyApi.defaults.params;
    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");
    expect(params).toStrictEqual({
      lang: "en",
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
