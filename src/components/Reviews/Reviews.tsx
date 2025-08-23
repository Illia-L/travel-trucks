import { Rating } from 'react-simple-star-rating';
import type { Product } from '../../types/global';
import css from './Reviews.module.css';
import Avatar from 'react-avatar';
import clsx from 'clsx';
import { useOutletContext } from 'react-router';

// interface ReviewsProps {
//   reviews: ProductReviewItem[];
// }

function Reviews() {
  const product: Product = useOutletContext();
  const reviews = product.reviews;

  return (
    <ul className={css.list}>
      {reviews.map((review, i) => (
        <li key={i}>
          <div className={css.header}>
            <Avatar
              name={review.reviewer_name}
              size='60'
              maxInitials={1}
              round
              color='var(--color-badges)'
              fgColor='var(--color-button)'
              className='text-h2'
            />
            <div className={css.nameRatingBox}>
              <p className='text-body2'>{review.reviewer_name}</p>
              <Rating
                initialValue={review.reviewer_rating}
                readonly
                size={16}
                fillColor='var(--color-rating)'
                emptyColor='var(--color-badges)'
              />
            </div>
          </div>
          <p className={clsx('text-body', css.comment)}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
