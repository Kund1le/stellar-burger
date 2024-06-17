import { setCookie } from '../../src/utils/cookie';

const testURL = 'http://localhost:4000/';
const ingredientSelector = '[data-testid="643d69a5c3f7b9001cfa093d"] > .J2V21wcp5ddf6wQCcqXv';
const modalSelector = '[data-testid="modal"]';
const modalCloseSelector = '[data-testid="modalClose"]';
const commonButtonSelector = '[data-testid="643d69a5c3f7b9001cfa093d"] > .common_button';
const bunTopSelector = '[data-testid="bunTop"]';
const bunBottomSelector = '[data-testid="bunBottom"]';

describe('Проверка открытия ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testURL);
  });

  it('Проверка открытия модалки', () => {
    cy.get(ingredientSelector).click();
    cy.get(modalSelector).contains('Флюоресцентная булка R2-D3');
  });

  it('Проверка закрытия модалки', () => {
    cy.get(ingredientSelector).click();
    cy.get(modalSelector).contains('Флюоресцентная булка R2-D3');
    cy.get(modalCloseSelector).click();
    cy.get(modalSelector).should('not.exist');
  });
});

describe('Проверка добавления ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testURL);
  });

  it('Проверка добавления игредиента', () => {
    cy.get(commonButtonSelector)
      .contains('Добавить')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0946"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get(bunTopSelector).contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get(
      '[data-testid="ingredient 643d69a5c3f7b9001cfa0946"] > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).contains('Хрустящие минеральные кольца');
    cy.get(bunBottomSelector).contains(
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
      'testAccessToken'
    );

    localStorage.setItem(
      'refreshToken',
      'testRefreshToken'
    );

    cy.visit(testURL);
  });

  it('Проверка создания заказа', () => {
    cy.get(commonButtonSelector)
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
    cy.get(modalCloseSelector).click();
    cy.get(modalSelector).should('not.exist');
    cy.get(bunTopSelector).contains('Выберите булки');
    cy.get('[data-testid="ingredient"]').contains('Выберите начинку');
    cy.get(bunBottomSelector).contains('Выберите булки');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});


/**На "Можно лучше" обратила внимание, но хочу в спокойном темпе без дедлайнов разобраться в теме. Спасибо большое за ссылки!*/