import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link
          to={'/'}
          className={clsx(
            location.pathname == '/'
              ? [styles.link_active, styles.link]
              : styles.link
          )}
        >
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </Link>
        <Link
          to={'/feed'}
          className={clsx(
            location.pathname == '/feed'
              ? [styles.link_active, styles.link]
              : styles.link
          )}
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Link to={'/'}>
          <Logo className='' />
        </Link>
      </div>
      <Link
        to={'/profile'}
        className={clsx(
          location.pathname == '/profile'
            ? [styles.link_active, styles.link]
            : styles.link
        )}
      >
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </Link>
    </nav>
  </header>
);
