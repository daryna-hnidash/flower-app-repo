import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { globalContext } from '../../helpers/globalContext';
import "./Logo.scss";

export default function Logo() {
  const { isHomePage } = useContext(globalContext);

  return (
    <div className={classNames(
      'logo',
      { 'logo--white': isHomePage })}
    >
      <Link
        to="home"
        className={classNames(
          'logo__title',
          { 'logo__title--white': isHomePage })}
      >
        LilyL0ve
      </Link>
    </div>
  )
}
