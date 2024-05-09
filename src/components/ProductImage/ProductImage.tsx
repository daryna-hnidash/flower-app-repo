import classNames from 'classnames'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/favoritesSlice';
import { Product } from '../../helpers/types';

type Props = {
  isSmall?: boolean,
  product: Product,
}

export const ProductImage: React.FC<Props> = ({ isSmall, product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector<Product[]>(state => state.favorites);


  const isAddedToFavorites = favorites.some(currProduct => currProduct.id === product.id);

  const addToFavoritesHandle = () => {
    isAddedToFavorites
      ? dispatch(actions.remove(product.id))
      : dispatch(actions.add(product));
  }
  return (
    <div
      className={classNames(
        'product-card__img-container',
        { 'product-card__img-container--small': isSmall }
      )}
    >
      <img
        src={product.coverImage}
        alt={product.name} className="product-card__img"
      />

      <button
        className={classNames(
          'product-card__fav-btn',
          { 'product-card__fav-btn--active': isAddedToFavorites },
        )}
        onClick={addToFavoritesHandle}
      ></button>
    </div>
  )
}
