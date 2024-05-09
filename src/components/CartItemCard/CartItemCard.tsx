import React, { useState } from 'react';
import "./CartItem.scss";
import { Link } from 'react-router-dom';
import { CartItem } from '../../helpers/types';
import { useAppDispatch } from '../../app/hooks';
import { actions as cartItemActions } from '../../features/cartItemsSlice';

type Props = {
  cartItem: CartItem,
}


export const CartItemCard: React.FC<Props> = ({ cartItem }) => {
  const [amount, setAmount] = useState(cartItem.amount);
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useAppDispatch();

  const changeQuantityHandler = (value: number) => {
    dispatch(cartItemActions.changeItem({
      ...cartItem,
      amount: cartItem.amount + value
    }))
    setAmount(amount + value);
  };

  const removeHandler = () => {
    dispatch(cartItemActions.remove(cartItem.id))
    setIsDeleted(true)
  };

  const oldPrice = (cartItem.price + (cartItem.price * cartItem.discount / 100));

  return (
    <>
      {!isDeleted && (

        <article className="cart-item">
          <>
            <div className="cart-item__img-container">
              <img
                src={cartItem.coverImage}
                alt={cartItem.name}
                className="cart-item__img"
              />
            </div>
            <div className="cart-item__info">
              <div className="cart-item__top">
                <Link
                  to={`/catalog/${cartItem.product_name_Id}`}
                  className="cart-item__link"
                  state={{ id: cartItem.id }}
                >
                  <h3 className="cart-item__title">
                    {cartItem.name}
                  </h3>
                </Link>
                <div className="cart-item__price" data-price="price">
                  {`$${(cartItem.price * amount).toFixed(2)}`}

                  {oldPrice !== cartItem.price && (
                    <div className="cart-item__old-price">
                      {`$${(oldPrice * amount).toFixed(2)}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="cart-item__bottom">
                <div className="cart-item__quantity">
                  Quantity
                  <div className="cart-item__buttons">
                    <button
                      className='cart-item__min-btn'
                      onClick={() => changeQuantityHandler(-1)}
                      disabled={cartItem.amount === 1}
                    >
                      -
                    </button>
                    {amount}
                    <button
                      className='cart-item__plus-btn'
                      onClick={() => changeQuantityHandler(1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  aria-label="Remove item"
                  className="cart-item__remove-btn"
                  onClick={removeHandler}
                ></button>
              </div>
            </div>
          </>
        </article>
      )}
    </>
  )
}
