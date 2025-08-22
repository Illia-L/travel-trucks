import { useEffect, useState } from 'react';
import RatingLocationBLock from '../../components/ui/RatingLocationBLock/RatingLocationBLock';
import type { Product } from '../../types/global';
import css from './ProductPage.module.css';
import { Outlet, useParams } from 'react-router';
import { fetchProductById } from '../../utils/api';
import { formatPrice } from '../../utils/helpers';
import clsx from 'clsx';
import BookingForm from '../../components/BookingForm/BookingForm';
import TabsControls from '../../components/TabsControls/TabsControls';

function ProductPage() {
  const [product, setProduct] = useState<Product | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id === undefined) return setProduct(undefined);

    const getProduct = async () => {
      try {
        setIsLoading(true);
        const product = await fetchProductById(id);

        setProduct(product);
      } catch {
        console.log('Fetching product error');
        // todo show toast error message
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;

  if (product === null) return null;

  if (product === undefined) return <p>Page not found</p>;
  // todo NotFoundPage

  return (
    <div className={css.page}>
      <div className='container'>
        <h1 className='text-h2'>{product.name}</h1>

        <RatingLocationBLock product={product} />

        <p className={clsx('text-h2', css.price)}>
          {formatPrice(product.price)}
        </p>

        <ul className={css.imageList}>
          {product.gallery.map((imageObj, i) => (
            <li
              className={css.imageItem}
              key={i}
            >
              <img
                className={css.image}
                src={imageObj.thumb}
                alt={product.name}
                height={317}
                width={292}
              />
            </li>
          ))}
        </ul>
        {/* todo Image gallery */}

        <p className={css.desc}>{product.description}</p>

        <TabsControls />

        <div className={css.tabsBox}>
          <div className={css.outletBox}>
            <Outlet context={product} />
          </div>

          <div className={css.formBox}>
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
