import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface ConstructorState {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

export const initialState: ConstructorState = {
  items: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    constructorSelector: (state) => state
  },
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.items.bun = action.payload;
      } else if (
        action.payload.type === 'main' ||
        action.payload.type === 'sauce'
      ) {
        state.items.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },
    removeIngredients: (state, action) => {
      state.items.ingredients = state.items.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearBurger: (state) => {
      state.items.bun = null;
      state.items.ingredients = [];
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.items.ingredients.length - 1) {
        const temp = state.items.ingredients[index];
        state.items.ingredients[index] = state.items.ingredients[index + 1];
        state.items.ingredients[index + 1] = temp;
      }
    },
    moveItemUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.items.ingredients[index];
        state.items.ingredients[index] = state.items.ingredients[index - 1];
        state.items.ingredients[index - 1] = temp;
      }
    }
  }
});

export const { constructorSelector } = constructorSlice.selectors;
export const {
  addIngredients,
  removeIngredients,
  clearBurger,
  moveItemDown,
  moveItemUp
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
