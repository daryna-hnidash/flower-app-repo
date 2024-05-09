import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartItemCard } from '../../components/CartItemCard';
import { CartTotal } from '../../components/CartTotal';
import "./CartPage.scss";

export function CartPage() {
  const cartItems = useAppSelector(state => state.cartItems)

  return (
    <div className="cart-page">
      <div className="cart-page__top">
        <h2 className="cart-page__title">
          Order summary
        </h2>
        <Breadcrumbs />
      </div>
      <div className="cart-page__content">
        {!cartItems.length
          ? (<h2 className="cart-page__title">
            There is no products in your cart yet...
          </h2>)
          : (
            <>
              <div className="cart-page__items">
                {cartItems.map(item => (
                  <React.Fragment key={item.id}>
                    <CartItemCard cartItem={item} />
                  </React.Fragment>
                ))}
              </div>
              <CartTotal />
            </>
          )}
      </div>
    </div>
  )
}
