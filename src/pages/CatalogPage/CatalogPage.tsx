import React, { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { globalContext } from '../../helpers/globalContext';

import "./CatalogPage.scss";

import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { colorsArr, Product, productTypesArr, seasonsArr, sizesArr } from '../../helpers/types';
import { useSearchParams } from 'react-router-dom';
import { init } from '../../features/allProductsSlice';


export enum SortByPriceParams {
  None = '',
  Cheapest = '&sort=price',
  Expensive = '&sort=price,DESC',
}

export const ITEMS_PER_PAGE = 9;

export function CatalogPage() {
  const { isLoading, hasError } = useAppSelector(state => state.products);
  const products = useAppSelector(state => state.products.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);
  const color = searchParams.get('color') || "";
  const type = searchParams.get('type') || "";
  const price = searchParams.get('price') || "";
  const size = searchParams.get('size') || "";
  const season = searchParams.get('season') || "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    searchParams.set('page', '1');
  }, [searchParams])
  const { query } = useContext(globalContext);

  useEffect(() => {
    dispatch(init());
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const setSearchWith = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value.toString());
    setSearchParams(params);
  };

  function sort(filteredProducts: Product[]) {
    let newProducts: Product[] = [...filteredProducts];

    if (color) {
      newProducts = newProducts.filter(product => product.colors?.includes(color))
    }
    if (type) {
      newProducts = newProducts.filter(product => product.type === type)
    }
    if (price) {
      newProducts = newProducts.sort((a, b) => {
        if (price === "Cheapest") {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
    }
    if (size) {
      newProducts = newProducts.filter(product => product.size === size)
    }
    if (season) {
      newProducts = newProducts.filter(product => product.season?.includes(season))
    }

    return newProducts;
  }

  const filteredByQuery = [...products]
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.contains?.some(title => title.includes(query.toLowerCase())));

  const visibleProducts = sort(filteredByQuery);

  return (
    <div className="catalog-page">
      <div className="catalog-page__top">
        <h2 className="catalog-page__title">Catalog</h2>
        <Breadcrumbs />
      </div>
      <div className="catalog-page__content">
        <div className="catalog-page__filtres">
          <Select
            label="Color"
            properties={colorsArr}
            searchName="color"
            setSearchWith={setSearchWith}
          />
          <Select
            label="Type"
            properties={productTypesArr}
            searchName="type"
            setSearchWith={setSearchWith}
          />
          <Select
            label="Price"
            searchName="price"
            properties={['Cheapest', 'Expensive']}
            setSearchWith={setSearchWith}
          />
          <Select
            label="Size"
            properties={sizesArr}
            searchName="size"
            setSearchWith={setSearchWith}
          />
          <Select
            label="Season"
            properties={seasonsArr}
            searchName="season"
            setSearchWith={setSearchWith}
          />
        </div>

        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <p>Something went wrong...</p>
        )}

        {!isLoading && !hasError && visibleProducts.length > 0 && (
          <>
            <div className="catalog-page__catalog">
              {visibleProducts.slice((ITEMS_PER_PAGE * currentPage - ITEMS_PER_PAGE), ITEMS_PER_PAGE * currentPage).map(currProduct => (
                <React.Fragment key={currProduct.id} >
                  <ProductCard product={currProduct} />
                </React.Fragment>
              ))}
            </div>

            <Pagination currentPage={currentPage} setSearchWith={setSearchWith} productsAmount={visibleProducts.length} />
          </>)}

        {!isLoading && !hasError && visibleProducts.length === 0 && (
          <p>There is no products with this params...</p>
        )}
      </div>
    </div>
  )
}
