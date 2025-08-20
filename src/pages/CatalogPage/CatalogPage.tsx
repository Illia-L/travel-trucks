import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectAllProducts,
  selectHasNextPage,
} from '../../redux/products/selectors';
import css from './CatalogPage.module.css';
import { loadProducts } from '../../redux/products/operations';
import Button from '../../components/ui/Button/Button';
import { incrementPage } from '../../redux/products/slice';

function CatalogPage() {
  const [isLoading, setIsloading] = useState(false);
  const products = useAppSelector(selectAllProducts);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const dispatch = useAppDispatch();

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
    getProducts();
  }, []);

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
