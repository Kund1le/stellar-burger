import { expect, test, describe } from '@jest/globals';
import { initialState, orderReducer, orderThunk } from '../slices/orderSlice';

describe('Проверка reducers компонента', () => {
  const orders = [
    {
      _id: '1',
      ingredients: ['bun', 'main'],
      status: 'done',
      name: 'testBurger001',
      createdAt: '10:10',
      updatedAt: '10:14',
      number: 1
    },
    {
      _id: '2',
      ingredients: ['bun', 'main', 'sauce'],
      status: 'done',
      name: 'testBurger002',
      createdAt: '14:15',
      updatedAt: '14:17',
      number: 2
    }
  ];

  test('Проверка статуса Выполнено', () => {
    const fulfilled = {
      type: orderThunk.fulfilled.type,
      payload: { orders: orders }
    };
    const orderState = {
      ...initialState,
      order: orders,
      loading: false,
      error: null
    };

    const newState = orderReducer(initialState, fulfilled);

    expect(newState).toStrictEqual(orderState);
  });
});
