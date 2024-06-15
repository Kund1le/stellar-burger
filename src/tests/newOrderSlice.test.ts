import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  newOrderThunk,
  newOrderReducer
} from '../slices/newOrderSlice';

describe('Проверка reducers newOrderSlice', () => {
  const newOrder = {
    order: [
      {
        _id: 'ID1',
        __v: 1,
        image: '1',
        image_large: '1',
        image_mobile: '1',
        name: 'testBun',
        type: 'bun',
        calories: 123,
        proteins: 5,
        fat: 11,
        carbohydrates: 12,
        price: 567
      },
      {
        _id: 'ID2',
        __v: 2,
        image: '2',
        image_large: '2',
        image_mobile: '2',
        name: 'testMain',
        type: 'main',
        calories: 254,
        proteins: 23,
        fat: 15,
        carbohydrates: 6,
        price: 324
      },
      {
        _id: 'ID3',
        __v: 3,
        image: '3',
        image_large: '3',
        image_mobile: '3',
        name: 'testSauce',
        type: 'sauce',
        calories: 354,
        proteins: 12,
        fat: 45,
        carbohydrates: 13,
        price: 212
      },
      {
        _id: 'ID4',
        __v: 4,
        image: '4',
        image_large: '4',
        image_mobile: '4',
        name: 'testBun2',
        type: 'bun',
        calories: 123,
        proteins: 5,
        fat: 11,
        carbohydrates: 12,
        price: 567
      }
    ]
  };

  const newState = (action: { type: string; payload?: {} }) =>
    newOrderReducer(initialState, action);

  test('Проверка статуса Ожидание', () => {
    const pending = {
      ...initialState,
      loading: true,
      error: null
    };

    const action = {
      type: newOrderThunk.pending.type
    };

    expect(newState(action)).toStrictEqual(pending);
  });

  test('Проверка статуса Отклонено', () => {
    const testError = {
      error: 'Ошибка'
    };

    const rejected = {
      ...initialState,
      loading: false,
      error: testError.error
    };

    const action = {
      type: newOrderThunk.rejected.type,
      error: { message: testError.error }
    };

    expect(newState(action)).toStrictEqual(rejected);
  });

  test('Проверка статуса Выполнено', () => {
    const fulfilled = {
      ...initialState,
      order: newOrder.order,
      loading: false,
      error: null
    };

    const action = {
      type: newOrderThunk.fulfilled.type,
      payload: newOrder
    };

    expect(newState(action)).toStrictEqual(fulfilled);
  });
});
