import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  feedReducer,
  feedThunk,
  ordersThunk
} from '../slices/feedSlice';

describe('Проверка reducers feedsSlices', () => {
  const feed = {
    orders: [
      {
        _id: 'burger001',
        ingredients: ['bun', 'main', 'sauce'],
        status: 'done',
        name: 'testName1',
        createdAt: '10:00',
        updatedAt: '10:10',
        number: 1
      },
      {
        _id: 'burger002',
        ingredients: ['bun', 'main', 'main', 'sauce'],
        status: 'done',
        name: 'testName2',
        createdAt: '10:11',
        updatedAt: '10:21',
        number: 2
      }
    ],
    total: 2,
    totalToday: 2
  };

  test('feedThunk Проверка статуса Ожидание', () => {
    const pending = {
      ...initialState,
      loading: true,
      error: null
    };

    const action = {
      type: feedThunk.pending.type
    };

    const newState = feedReducer(initialState, action);

    expect(newState).toStrictEqual(pending);
  });

  test('feedThunk Проверка статуса Отклонено', () => {
    const error = 'Ошибка';
    const rejected = {
      ...initialState,
      loading: false,
      error
    };

    const action = {
      type: feedThunk.rejected.type,
      error: { message: error }
    };

    const newState = feedReducer(initialState, action);

    expect(newState).toStrictEqual(rejected);
  });

  test('feedThunk Проверка статуса Выполнено', () => {
    const fulfilled = {
      ...initialState,
      orders: feed.orders,
      total: feed.total,
      totalToday: feed.totalToday,
      loading: false,
      error: null
    };

    const action = {
      type: feedThunk.fulfilled.type,
      payload: {
        orders: feed.orders,
        total: feed.total,
        totalToday: feed.totalToday
      }
    };

    const newState = feedReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });

  test('ordersThunk Проверка статуса Ожидание', () => {
    const pending = {
      ...initialState,
      loading: true,
      error: null
    };

    const action = {
      type: ordersThunk.pending.type
    };

    const newState = feedReducer(initialState, action);

    expect(newState).toStrictEqual(pending);
  });

  test('ordersThunk Проверка статуса Отклонено', () => {
    const error = 'Ошибка';
    const rejected = {
      ...initialState,
      loading: false,
      error
    };

    const action = {
      type: ordersThunk.rejected.type,
      error: { message: error }
    };

    const newState = feedReducer(initialState, action);

    expect(newState).toStrictEqual(rejected);
  });

  test('ordersThunk Проверка статуса Выполнено', () => {
    const fulfilled = {
      ...initialState,
      orders: feed.orders,
      loading: false,
      error: null
    };

    const action = {
      type: ordersThunk.fulfilled.type,
      payload: feed.orders
    };

    const newState = feedReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });
});
