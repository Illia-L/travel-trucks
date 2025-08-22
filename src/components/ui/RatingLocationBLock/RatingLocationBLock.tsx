import clsx from 'clsx';
import type { Product } from '../../../types/global';
import Icon from '../Icon/Icon';
import css from './RatingLocationBLock.module.css';

interface RatingLocationBLockProps {
  product: Product;
}

function RatingLocationBLock({ product }: RatingLocationBLockProps) {
  return (
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
  );
}

export default RatingLocationBLock;
