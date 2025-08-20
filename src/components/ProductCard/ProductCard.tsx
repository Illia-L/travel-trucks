import clsx from 'clsx';
import AppLink from '../ui/AppLink/AppLink';
import BadgeList from '../ui/BadgeList/BadgeList';
import Icon from '../ui/Icon/Icon';
import css from './ProductCard.module.css';
import type { Product } from '../../types/global';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectFavouriteProducts } from '../../redux/products/selectors';
import { toggleFavouriteProduct } from '../../redux/products/slice';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const favouriteProducts = useAppSelector(selectFavouriteProducts);

  const isFavourite = favouriteProducts.includes(product.id);

  return (
    <div className={css.card}>
      <div className={css.imageContainer}>
        <img
          className={css.image}
          src={product.gallery[0].thumb}
          width={292}
          height={320}
          alt={product.name}
        />
      </div>

      <div className={css.content}>
        <div>
          <div className={css.titleRow}>
            <h3 className='text-h2'>{product.name}</h3>

            <div className={css.priceBox}>
              <p className='text-h2'>€{product.price}</p>
              {/* todo Make price float with point */}

              <button
                className={css.buttonFavourite}
                aria-label='add to favourite'
                onClick={() => dispatch(toggleFavouriteProduct(product.id))}
              >
                {/* todo Enlarge button clickable area */}
                <Icon
                  id='heart'
                  width={26}
                  height={24}
                  className={clsx(isFavourite && css.favourite)}
                />
              </button>
            </div>
          </div>

          <div className={clsx('text-body', css.ratingLocationRow)}>
            <div className={css.reviews}>
              <Icon
                id='star'
                width={16}
                height={16}
              />

              <span className='text-body-underline'>
                {`${product.rating}(${product.reviews.length} Reviews)`}
              </span>
            </div>

            <div className={css.location}>
              <Icon
                id='map'
                width={16}
                height={16}
              />
              {product.location}
            </div>
          </div>
        </div>

        <p className={clsx('text-body', css.description)}>
          {product.description}
        </p>
        {/* todo Make description cut with elipsis */}

        <div className={css.badgesBox}>
          <BadgeList product={product} />
        </div>

        <AppLink
          to={`/products/${product.id}`}
          className={css.showMore}
        >
          Show more
        </AppLink>
      </div>
    </div>
  );
}

export default ProductCard;
