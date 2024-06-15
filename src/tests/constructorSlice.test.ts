import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  constructorReducer,
  addIngredients,
  removeIngredients,
  moveItemDown,
  moveItemUp
} from '../slices/constructorSlice';

const ingredients = [
  {
    _id: 'ID1',
    __v: 1,
    id: 'testID001',
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
    id: 'testID002',
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
    id: 'testID003',
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

const newIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  __v: 0,
  id: 'testID004',
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  name: 'Соус Spicy-X',
  type: 'sauce',
  calories: 30,
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  price: 90
};

describe('Проверка reducers burgerSlices', () => {
  const constructor = {
    ...initialState,
    items: {
      bun: ingredients[0],
      ingredients: ingredients.slice(1)
    }
  };

  test('Проверка добавления ингредиента', () => {
    const newState = constructorReducer(
      constructor,
      addIngredients(newIngredient)
    );

    const { items } = newState;
    const { ingredients } = items;

    const expectedIngredients = [
      ...ingredients.slice(1),
      { ...newIngredient, id: expect.any(String) }
    ];

    expect(ingredients).toEqual(expectedIngredients);
  });

  test('Проверка удаления ингредиента', () => {
    const newState = constructorReducer(
      constructor,
      removeIngredients({ id: 'testID002' })
    );

    const { items } = newState;
    const { ingredients } = items;

    expect(ingredients).toEqual([
      ingredients[2]
    ]);
  });

  test('Первая проверка изменений в бургере', () => {
    const newState = constructorReducer(
      constructor,
      moveItemUp(1)
    );

    const { items } = newState;
    const { ingredients } = items;

    expect(ingredients).toEqual([
      ingredients[2],
      ingredients[1]
    ]);
  });

  test('Вторая проверка изменений в бургере', () => {
    const newState = constructorReducer(
      constructor,
      moveItemDown(0)
    );

    const { items } = newState;
    const { ingredients } = items;

    expect(ingredients).toEqual([
      ingredients[2],
      ingredients[1]
    ]);
  });
});
