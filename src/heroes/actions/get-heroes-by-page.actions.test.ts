import { describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-page.actions";
import AxiosMockAdapter from 'axios-mock-adapter';
import { heroApi } from "../api/hero.api";
import { beforeEach } from "node:test";

const BASE_URL = import.meta.env.VITE_API_URL;

describe('get-heroes-by-page.actions', () => {

  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test('should return default heroes', async () => {
    heroesApiMock.onGet('/').reply(200, {
      total: 10,
      pages: 2,
      heroes: [
        {
          image: '1.jpg'
        },
        {
          image: '2.jpg'
        }
      ]
    });
    const response = await getHeroesByPageAction(1);

    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        {
          image: `${BASE_URL}/images/1.jpg`
        },
        {
          image: `${BASE_URL}/images/2.jpg`
        }
      ]
    });
  });

  test('should return correct heroes when page isNaN', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: []
    };
    heroesApiMock.resetHistory();
    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('abc' as unknown as number);

    const [request] = heroesApiMock.history;
    const { params } = request;

    expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' });

  });


  test('should return correct heroes when page isNaN', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: []
    };
    heroesApiMock.resetHistory();
    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('abc' as unknown as number);

    const [request] = heroesApiMock.history;
    const { params } = request;

    expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' });

  });
  test('should call api with string params', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: []
    };
    heroesApiMock.resetHistory();
    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('5' as unknown as number);

    const [request] = heroesApiMock.history;
    console.log(request);
    const { params } = request;

    expect(params).toStrictEqual({ limit: 6, offset: 24, category: 'all' });

  });


  test('should use the correct params', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: []
    };
    heroesApiMock.resetHistory();
    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction(2, 10, 'all');

    const [request] = heroesApiMock.history;
    console.log(request);
    const { params } = request;

    expect(params).toStrictEqual({ limit: 10, offset: 10, category: 'all' });

  });
});

