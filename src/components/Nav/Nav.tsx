import classNames from 'classnames';
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { globalContext } from '../../helpers/globalContext';

import "./Nav.scss";

type Props = {
  isFooter?: boolean,
}

export const Nav: React.FC<Props> = ({ isFooter }) => {
  const { isHomePage } = useContext(globalContext);

  return (
    <nav className="nav nav--footer">
      <ul className={classNames(
        "nav__list",
        {
          "nav__list--white": isHomePage || isFooter,
          "nav__list--footer": isFooter,
        }
      )}>
        <li className="nav__item">
          <NavLink
            to="home"
            className={({ isActive }) => classNames(
              'nav__link',
              {
                'nav__link--active': isActive,
                'nav__link--footer': isFooter,
                'nav__link--active--white': isHomePage,
              },
            )}
            onClick={() => window.scrollTo(0, 0)}
          >
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="catalog" className={({ isActive }) => classNames(
            'nav__link',
            {
              'nav__link--active': isActive,
              'nav__link--footer': isFooter,
            },
          )}>Catalog</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="about-us" className={({ isActive }) => classNames(
            'nav__link',
            {
              'nav__link--active': isActive,
              'nav__link--footer': isFooter,
            },
          )}>About us</NavLink>
        </li>
      </ul>
    </nav>
  )
}
