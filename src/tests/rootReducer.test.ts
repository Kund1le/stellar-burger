import { expect, test, describe } from '@jest/globals';
import { rootReducer } from '../services/rootReducer';
import { initialState as constructorReducer } from '../slices/constructorSlice';
import { initialState as feedReducer } from '../slices/feedSlice';
import { initialState as ingredientsReducer } from '../slices/ingredientsSlice';
import { initialState as newOrderReducer } from '../slices/newOrderSlice';
import { initialState as orderReducer } from '../slices/orderSlice';
import { initialState as userReducer } from '../slices/userSlice';

const testState = {
  constructorBurger: constructorReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  newOrder: newOrderReducer,
  order: orderReducer,
  user: userReducer
};

describe('Проверка настройки rootReducer', () => {
  test('Проверка добавления ингредиента', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toStrictEqual(testState);
  });
});
