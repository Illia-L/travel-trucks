import { useEffect, useRef } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectAllProducts,
  selectFilter,
  selectHasNextPage,
  selectIsLoading,
} from '../../redux/products/selectors';
import css from './CatalogPage.module.css';
import { loadProducts } from '../../redux/products/operations';
import Button from '../../components/ui/Button/Button';
import { incrementPage, setFilter } from '../../redux/products/slice';
import { useLocation } from 'react-router';
import type { Filter } from '../../types/global';
import { PulseLoader } from 'react-spinners';

function CatalogPage() {
  const isLoading = useAppSelector(selectIsLoading);
  const products = useAppSelector(selectAllProducts);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const filter = useAppSelector(selectFilter);
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const isInitialRender = useRef(true);
  const scrollAnchorRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isInitialRender.current) return;

    const filterFromQueryString = Object.fromEntries(
      new URLSearchParams(search)
    ) as Partial<Filter>;

    const isFilterDue = (
      Object.keys(filterFromQueryString) as (keyof Filter)[]
    ).every(key => filter[key] === filterFromQueryString[key]);

    if (!isFilterDue) dispatch(setFilter({ ...filterFromQueryString }));

    dispatch(loadProducts());

    isInitialRender.current = false;
  }, [filter, search, isInitialRender, dispatch]);

  const getScrollToPosition = () => {
    if (scrollAnchorRef.current) {
      const button = scrollAnchorRef.current;
      const rect = button.getBoundingClientRect();
      const scrollToPos = rect.top + window.scrollY - 50;

      return scrollToPos;
    }
  };

  const scrollToPos = (pos: number) => {
    setTimeout(() => {
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }, 100);
  };

  const handleLoadMore = async () => {
    dispatch(incrementPage());
    const positionToScrollTo = getScrollToPosition();
    await dispatch(loadProducts());

    if (!positionToScrollTo) return;

    scrollToPos(positionToScrollTo);
  };

  return (
    <>
      <title>Campers - Browse & Filter | Travel Trucks</title>

      <meta
        name='description'
        content='Explore our camper catalogue. Filter by location, transmission, beds, AC, kitchen, shower and more. Compare specs, photos and pricing.'
      />

      <div className='container'>
        <div className={css.row}>
          <Sidebar isLoading={isLoading} />
          <div className={css.products}>
            {!!products.length && <ProductList products={products} />}
            {!products.length && isLoading && (
              <PulseLoader
                size={12}
                margin={5}
                speedMultiplier={0.7}
                color='#9599A1'
                className={css.loader}
              />
            )}
            {!products.length && !isLoading && (
              <p className={css.notFound}>No campers found</p>
            )}
            {hasNextPage && (
              <>
                <a ref={scrollAnchorRef}></a>

                <Button
                  className={css.loadMore}
                  variant='outline'
                  isLoading={isLoading}
                  onClick={handleLoadMore}
                >
                  Load more
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogPage;
