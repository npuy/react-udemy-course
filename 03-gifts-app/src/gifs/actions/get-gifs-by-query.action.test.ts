import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { giphyApi } from "../api/giphy.api";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import { giphySearchResponseMock } from "../../tests/mocks/giphy.response.data";

describe("getGifsByQuery", () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.reset();
  });

  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphySearchResponseMock);

    const gifs = await getGifsByQuery("Test query");

    expect(gifs.length).toBe(10);
    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.width).toBe("number");
    });
  });

  test("should return an empty list of gifs when query is empty", async () => {
    const spyGiphyApiGet = vi.spyOn(giphyApi, "get");

    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
    expect(spyGiphyApiGet).not.toHaveBeenCalled();
  });

  test("should handle error when the API returns an error", async () => {
    const spyConsoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/search").reply(400, {
      message: "Bad request",
    });

    const gifs = await getGifsByQuery("Test query");

    expect(gifs.length).toBe(0);
    expect(spyConsoleError).toHaveBeenCalled();
  });
});
