import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearBurger,
  constructorSelector
} from '../../slices/constructorSlice';
import {
  clearOrder,
  newOrderThunk,
  newOrderSelector
} from '../../slices/newOrderSlice';
import { authSelector } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const constructorItems = useSelector(constructorSelector).items;
  const orderRequest = useSelector(newOrderSelector).loading;
  const orderModalData = useSelector(newOrderSelector).order;
  const auth = useSelector(authSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || !auth) {
      nav('/login');
    } else {
      const order = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(newOrderThunk(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearBurger());
    nav('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
