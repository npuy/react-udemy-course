import { describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { getHeroesByPageAction } from "./get-heroes-by-page.actions";
import { heroApi } from "../api/hero.api";
import { beforeEach } from "node:test";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("getHeroesByPageAction", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test("should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 20,
      pages: 2,
      heroes: [
        {
          image: "1.jpg",
        },
        {
          image: "2.jpg",
        },
      ],
    });

    const response = await getHeroesByPageAction(1);

    expect(response).toStrictEqual({
      total: 20,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.jpg` },
        { image: `${BASE_URL}/images/2.jpg` },
      ],
    });
  });

  test("should return correct heroes when page is NaN", async () => {
    const responseObject = {
      total: 20,
      pages: 2,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction("asd" as unknown as number);

    const params = heroesApiMock.history.get[0].params;

    expect(params).toBeDefined();
    expect(params).toStrictEqual({ limit: 6, offset: 0, category: "all" });
  });

  test("should return correct heroes when page is string number", async () => {
    const responseObject = {
      total: 20,
      pages: 2,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction("5" as unknown as number);

    const params = heroesApiMock.history.get[0].params;

    expect(params).toBeDefined();
    expect(params).toStrictEqual({ limit: 6, offset: 24, category: "all" });
  });

  test("should call the api with correct params", async () => {
    const responseObject = {
      total: 20,
      pages: 2,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction(2, 4, "heroes");

    const params = heroesApiMock.history.get[0].params;

    expect(params).toBeDefined();
    expect(params).toStrictEqual({ limit: 4, offset: 4, category: "heroes" });
  });
});
