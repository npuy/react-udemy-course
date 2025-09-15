import { describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useGifs } from "./useGifs";
import { gifMockData } from "../../tests/mocks/gifs.mock.data";

import * as gifsActions from "../actions/get-gifs-by-query.action";

vi.mock("../actions/get-gifs-by-query.action", () => ({
  getGifsByQuery: () => gifMockData,
}));

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(useGifs);

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousSearches.length).toBe(0);
    expect(result.current.handleSearch).not.toBeUndefined();
    expect(result.current.handlePreviousSearchClicked).not.toBeUndefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleSearch("Test query");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handlePreviousSearchClicked is called", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handlePreviousSearchClicked("Test query");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs form cache", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleSearch("Test query");
    });

    const spyGetGifsByQuerySpy = vi.spyOn(gifsActions, "getGifsByQuery");

    await act(async () => {
      await result.current.handlePreviousSearchClicked("Test query");
    });

    expect(spyGetGifsByQuerySpy).not.toHaveBeenCalled();
  });

  test("should return no more than 8 previous searches", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleSearch("Test query1");
    });
    await act(async () => {
      await result.current.handleSearch("Test query2");
    });
    await act(async () => {
      await result.current.handleSearch("Test query3");
    });
    await act(async () => {
      await result.current.handleSearch("Test query4");
    });
    await act(async () => {
      await result.current.handleSearch("Test query5");
    });
    await act(async () => {
      await result.current.handleSearch("Test query6");
    });
    await act(async () => {
      await result.current.handleSearch("Test query7");
    });

    const previousSearches = result.current.previousSearches;
    expect(previousSearches.length).toBe(6);
    expect(previousSearches).toStrictEqual([
      "test query7",
      "test query6",
      "test query5",
      "test query4",
      "test query3",
      "test query2",
    ]);
  });
});
