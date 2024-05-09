import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import "./CartTotal.scss";

export const CartTotal = () => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  const cartItems = useAppSelector(state => state.cartItems)

  const totalAmount = cartItems
    .map(item => item.price * item.amount)
    .reduce((sum, i) => sum + i, 0);

  const totalDiscount = cartItems
    .map(item => (item.price * item.discount / 100) * item.amount)
    .reduce((sum, i) => sum + i, 0);

  return (
    <div className="cart-total">
      <h3 className="cart-total__title">Total</h3>
      <div className="cart-total__content">
        <ul className="cart-total__items-list">
          {cartItems.map(item => (
            <li className="cart-total__li" key={item.id}>
              <p className="cart-total__item-title">{item.name}</p>
              <span className="cart-total__price">
                {(item.price * item.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="cart-total__separator"></div>
        <ul className="cart-total__description">
          <li className="cart-total__li">
            Delivery<span className="cart-total__delivery">Free</span>
          </li>
          <li className="cart-total__li">
            Sale<span className="cart-total__price">${totalDiscount.toFixed(2)}</span>
          </li>
          <li className="cart-total__li">
            Total<span className="cart-total__price">${totalAmount.toFixed(2)}</span>
          </li>
        </ul>
        {isCartPage && (
          <div className="cart-total__btn">
            <Link to="check-out" className="button">Check out</Link>
          </div>
        )}
      </div>
    </div>
  )
}
