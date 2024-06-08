import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from '../slices/constructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { newOrderReducer } from '../slices/newOrderSlice';
import { orderReducer } from '../slices/orderSlice';
import { userReducer } from '../slices/userSlice';

export const rootReducer = combineReducers({
  constructorBurger: constructorReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  newOrder: newOrderReducer,
  order: orderReducer,
  user: userReducer
});
