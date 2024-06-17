import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  ingredientsReducer,
  ingredientsThunk
} from '../slices/ingredientsSlice';

describe('Проверка reducers ingredientsSlices', () => {
  const ingredients = [
    {
      _id: 'testID001',
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
      _id: 'testID002',
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
      _id: 'testID003',
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
    }
  ];

  test('Проверка статуса Ожидание', () => {
    const pending = {
      ...initialState,
      loading: true,
      error: null,
    };

    const action = {
      type: ingredientsThunk.pending.type,
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState).toStrictEqual(pending);
  });

  test('Проверка статуса Отклонено', () => {
    const testError = 'Ошибка';

    const rejected = {
      ...initialState,
      error: testError,
      loading: false
    };

    const action = {
      type: ingredientsThunk.rejected.type,
      error: { message: testError }
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState).toStrictEqual(rejected);
  });

  test('Проверка статуса Выполнено', () => {
    const fulfilled = {
      ...initialState,
      ingredients: ingredients,
      loading: false
    };

    const action = {
      type: ingredientsThunk.fulfilled.type,
      payload: ingredients
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });
});
