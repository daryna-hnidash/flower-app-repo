import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as cartItemsActions } from '../../features/cartItemsSlice';
import { globalContext } from '../../helpers/globalContext';
import { CartItem, Product } from '../../helpers/types';
import { Modal } from '../Modal';

type Props = {
  isSmall?: boolean,
  amount?: number,
  product: Product,
  text?: boolean,
  icon?: boolean,
}

export const CartButton: React.FC<Props> = ({ amount = 1, product, isSmall, text, icon }) => {
  const user = useAppSelector(state => state.user.user);
  const { setIsModalOpen } = useContext(globalContext);
  const cart = useAppSelector<CartItem[]>(state => state.cartItems);

  const [isAddedToCart, setIsAddedToCart] = useState(cart?.some(item => item.id === product.id) || false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsAddedToCart(cart?.some(item => item.id === product.id) || false)
  }, [cart?.length])

  function addToCartHandle() {
    if (!user?.email) {
      setIsModalOpen(true);
      return;
    }

    isAddedToCart
      ? dispatch(cartItemsActions.remove(product.id))
      : dispatch(cartItemsActions.add({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        amount: amount,
        coverImage: product.coverImage,
        product_name_Id: product.product_name_Id,
      }));
  }

  return (
    <>
      <Modal />
      <button
        className={classNames(
          "button ",
          {
            "button--active": !icon && isAddedToCart,
            "button--cart": icon,
            "button--cart--not-active": icon && !isAddedToCart,
            "button--cart--small": icon && isSmall,
          }
        )}
        onClick={addToCartHandle}
      >
        {text && (
          isAddedToCart
            ? 'Added to cart'
            : 'Add to cart'
        )}
      </button>
    </>
  )
}
