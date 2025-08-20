import { useEffect, useRef, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectAllProducts,
  selectFilter,
  selectHasNextPage,
} from '../../redux/products/selectors';
import css from './CatalogPage.module.css';
import { loadProducts } from '../../redux/products/operations';
import Button from '../../components/ui/Button/Button';
import { incrementPage, setFilter } from '../../redux/products/slice';
import { useLocation } from 'react-router';
import type { Filter } from '../../types/global';

function CatalogPage() {
  const [isLoading, setIsloading] = useState(false);
  const products = useAppSelector(selectAllProducts);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const filter = useAppSelector(selectFilter);
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const isInitialRender = useRef(true);

  const getProducts = async () => {
    try {
      setIsloading(true);
      await dispatch(loadProducts());
    } catch {
      console.log('There was an error fetching products');
      // todo show toast message on error
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (!isInitialRender.current) return;

    const filterFromQueryString = Object.fromEntries(
      new URLSearchParams(search)
    ) as Partial<Filter>;

    const isFilterDue = (
      Object.keys(filterFromQueryString) as (keyof Filter)[]
    ).every(key => filter[key] === filterFromQueryString[key]);

    if (!isFilterDue) dispatch(setFilter({ ...filterFromQueryString }));

    getProducts();

    isInitialRender.current = false;
  }, [filter, search, isInitialRender]);

  const handleLoadMore = () => {
    dispatch(incrementPage());

    getProducts();
  };

  return (
    <div className='container'>
      <div className={css.row}>
        <Sidebar />

        <div className={css.products}>
          {products.length ? (
            <ProductList products={products} />
          ) : (
            <p>No campers found</p>
          )}

          {hasNextPage && (
            <Button
              className={css.loadMore}
              variant='outline'
              isLoading={isLoading}
              onClick={handleLoadMore}
            >
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
