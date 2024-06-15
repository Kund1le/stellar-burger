import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  userReducer,
  registerThunk,
  loginThunk,
  logoutThunk,
  userUpdateThunk,
  userGetThunk
} from '../slices/userSlice';

describe('Проверка actions пользователя', () => {
  const userTest = {
    user: {
      email: 'test@mail.ru',
      name: 'userTest'
    },
    auth: false,
    loading: false,
    error: null
  };
  const errorTest = {
    message: 'error'
  };

  const newState = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  describe('Проверка extraReducers регистрации', () => {
    test('Проверка статуса Ожидание', () => {
      const pending = {
        ...initialState,
        auth: false,
        loading: true,
        error: null
      };

      const action = {
        type: registerThunk.pending.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Проверка статуса Отклонено', () => {
      const rejected = {
        ...initialState,
        auth: false,
        loading: false,
        error: 'error'
      };

      const action = {
        type: registerThunk.rejected.type,
        error: errorTest
      };

      expect(newState(action)).toStrictEqual(rejected);
    });

    test('Проверка статуса Выполнено', () => {
      const fulfilled = {
        ...initialState,
        auth: true,
        error: null,
        user: {
          email: 'test@mail.ru',
          name: 'userTest'
        }
      };

      const action = {
        type: registerThunk.fulfilled.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });
  });

  describe('Проверка extraReducers userGetThunk', () => {
    test('Проверка статуса Ожидание', () => {
      const pending = {
        ...initialState,
        auth: false,
        loading: true,
        error: null
      };

      const action = {
        type: userGetThunk.pending.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Проверка статуса Отклонено', () => {
      const rejected = {
        ...initialState,
        auth: false,
        loading: false,
        error: 'error'
      };

      const action = {
        type: userGetThunk.rejected.type,
        error: errorTest
      };

      expect(newState(action)).toStrictEqual(rejected);
    });

    test('Проверка статуса Выполнено', () => {
      const fulfilled = {
        ...initialState,
        auth: true,
        error: null,
        user: {
          email: 'test@mail.ru',
          name: 'userTest'
        }
      };

      const action = {
        type: userGetThunk.fulfilled.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });
  });

  describe('Проверка extraReducers авторизации', () => {
    test('Проверка статуса Ожидание', () => {
      const pending = {
        ...initialState,
        error: null,
        loading: true
      };

      const action = {
        type: loginThunk.pending.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Проверка статуса Отклонено', () => {
      const rejected = {
        ...initialState,
        error: 'error'
      };

      const action = {
        type: loginThunk.rejected.type,
        error: errorTest
      };

      expect(newState(action)).toStrictEqual(rejected);
    });

    test('Проверка статуса Выполнено', () => {
      const fulfilled = {
        ...initialState,
        auth: true,
        error: null,
        user: {
          email: 'test@mail.ru',
          name: 'userTest'
        }
      };

      const action = {
        type: loginThunk.fulfilled.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });
  });

  describe('Проверка extraReducers выхода', () => {
    test('Проверка статуса Выполнено', () => {
      const action = {
        type: logoutThunk.fulfilled.type,
        payload: undefined
      };

      expect(newState(action)).toStrictEqual(initialState);
    });
  });

  describe('Проверка extraReducers userUpdateThunk', () => {
    test('Проверка статуса Ожидание', () => {
      const pending = {
        ...initialState,
        error: null,
        loading: true
      };

      const action = {
        type: userUpdateThunk.pending.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Проверка статуса Отклонено', () => {
      const rejected = {
        ...initialState,
        error: 'error'
      };

      const action = {
        type: userUpdateThunk.rejected.type,
        error: errorTest
      };

      expect(newState(action)).toStrictEqual(rejected);
    });

    test('Проверка статуса Выполнено', () => {
      const fulfilled = {
        ...initialState,
        error: null,
        loading: false,
        user: {
          email: 'test@mail.ru',
          name: 'userTest'
        }
      };

      const action = {
        type: userUpdateThunk.fulfilled.type,
        payload: userTest
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });
  });
});
