import { setCookie } from '../../src/utils/cookie';

describe('Проверка открытия ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('Проверка открытия модалки', () => {
    cy.get(
      '[data-testid="643d69a5c3f7b9001cfa093d"] > .J2V21wcp5ddf6wQCcqXv'
    ).click();
    cy.get('[data-testid="modal"]').contains('Флюоресцентная булка R2-D3');
  });

  it('Проверка закрытия модалки', () => {
    cy.get(
      '[data-testid="643d69a5c3f7b9001cfa093d"] > .J2V21wcp5ddf6wQCcqXv'
    ).click();
    cy.get('[data-testid="modal"]').contains('Флюоресцентная булка R2-D3');
    cy.get('[data-testid="modalClose"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});

describe('Проверка добавления ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('Проверка добавления игредиента', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0946"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="bunTop"]').contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get(
      '[data-testid="ingredient 643d69a5c3f7b9001cfa0946"] > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).contains('Хрустящие минеральные кольца');
    cy.get('[data-testid="bunBottom"]').contains(
      'Флюоресцентная булка R2-D3 (низ)'
    );
  });
});

describe('Проверка создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    setCookie(
      'accessToken',
      'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjM0OTdkOTdlZGUwMDAxZDA2ZjY1YSIsImlhdCI6MTcxODQ2OTY0OSwiZXhwIjoxNzE4NDcwODQ5fQ.doIX5IcyCoe_k4cOfKAirieVIj2i23Vl9DDNgWJGpBU'
    );

    localStorage.setItem(
      'refreshToken',
      '9e0149dfd79ac89198ee78459bfa9716bb2b34d51354e34ee6096cea4c08242e02df048c381a70aa'
    );

    cy.visit('http://localhost:4000/');
  });

  it('Проверка создания заказа', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa093f"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0942"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('.button').contains('Оформить заказ').click();
    cy.get('[data-testid="orderNumber"]').should('have.text', '774711');
    cy.get('[data-testid="modalClose"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
    cy.get('[data-testid="bunTop"]').contains('Выберите булки');
    cy.get('[data-testid="ingredient"]').contains('Выберите начинку');
    cy.get('[data-testid="bunBottom"]').contains('Выберите булки');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
