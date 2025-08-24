import { useEffect, useState } from 'react';
import RatingLocationBLock from '../../components/ui/RatingLocationBLock/RatingLocationBLock';
import type { Product } from '../../types/global';
import css from './ProductPage.module.css';
import { Outlet, useLocation, useParams } from 'react-router';
import { fetchProductById } from '../../utils/api';
import { formatPrice } from '../../utils/helpers';
import clsx from 'clsx';
import BookingForm from '../../components/BookingForm/BookingForm';
import TabsControls from '../../components/TabsControls/TabsControls';
import NotFound from '../../components/ui/NotFound/NotFound';
import Gallery from '../../components/Gallery/Gallery';

function ProductPage() {
  const [product, setProduct] = useState<Product | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const { id } = params;
  const { pathname } = useLocation();

  const isReviewsPage = pathname.split('/').at(-1) === 'reviews';

  useEffect(() => {
    if (id === undefined) return setProduct(undefined);

    const getProduct = async () => {
      try {
        setIsLoading(true);
        const product = await fetchProductById(id);

        setProduct(product);
      } catch {
        setProduct(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (product === null) return null;

  if (product === undefined)
    return (
      <NotFound
        title='Camper not found'
        message='The camper you are looking for does not exist or was removed. Find another one in Catalog.'
        buttonText='Browse catalog'
      />
    );

  return (
    <>
      <title>
        {isReviewsPage
          ? `Reviews — ${product.name} | Travel Trucks`
          : `${product.name} — Specs & Details | Travel Trucks`}
      </title>

      <meta
        name='description'
        content={
          isReviewsPage
            ? `Read traveler reviews and ratings for ${product.name}: comfort, equipment, service and overall experience`
            : `See full specs, amenities, photos and pricing for ${product.name}. Check pickup location, choose suitable date and book it online.`
        }
      />

      <div className={css.page}>
        <div className='container'>
          {isLoading && 'Loading...'}

          <h1 className='text-h2'>{product.name}</h1>
          <RatingLocationBLock product={product} />
          <p className={clsx('text-h2', css.price)}>
            {formatPrice(product.price)}
          </p>

          <Gallery
            gallery={product.gallery}
            productName={product.name}
          />

          {/* <ul className={css.imageList}>
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
          </ul> */}

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
    </>
  );
}

export default ProductPage;
